import { App, Editor, Menu, Notice, MarkdownView, Scope } from "obsidian";
import {
  getCurrentListScope,
  formatOutlineItem,
  formatDecimalItem,
  nextNumberInScope,
  scanListItems,
  ListItem,
  detectLevelFromIndent,
} from "./listEngine";

// ========== CONTEXT MENU INJECTION ==========

let menuCleanup: (() => void) | null = null;

export function registerNumberingMenu(
  app: App,
  blankLineBreaks: boolean
): () => void {
  // Unregister any existing first
  if (menuCleanup) {
    menuCleanup();
    menuCleanup = null;
  }

  const handler = (menu: Menu, source: string) => {
    if (source !== "context-menu") return;
    const view = app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return;
    const editor = view.editor;

    // Only show if cursor is in a list
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    const isListItem = /^\s*([IVXivx]|[A-Z]|[a-z]|\d+)\./
      .test(line.trim()) || /^\s*\d+\.\s/.test(line.trim());

    if (!isListItem && source !== "context-menu") return;

    const scope = getCurrentListScope(editor, cursor.line, blankLineBreaks);
    const currentItem = scope.find((i) => i.line === cursor.line);
    const level = currentItem ? currentItem.level : 0;
    const nextNum = nextNumberInScope(scope, level, 1);

    // Numbering submenu
    const numberSection = menu.addItem((item) =>
      item
        .setTitle("Numbering")
        .setIcon("list")
        .setSection("list")
    );

    menu.addItem((item) =>
      item
        .setTitle(`Continue (next: ${nextNum})`)
        .setSection("list")
        .onClick(() => doContinue(editor, scope, level, cursor.line))
    );

    menu.addItem((item) =>
      item
        .setTitle("Restart at 1")
        .setSection("list")
        .onClick(() => doRestartAt(editor, scope, level, cursor.line, 1))
    );

    menu.addItem((item) =>
      item
        .setSection("list")
        .setTitle("Restart at...")
        .onClick(async () => {
          const input = await promptNumber("Restart numbering at:", String(nextNum));
          if (input) {
            const start = parseInt(input, 10);
            if (!isNaN(start) && start > 0) {
              doRestartAt(editor, scope, level, cursor.line, start);
            }
          }
        })
    );

    menu.addItem((item) =>
      item
        .setSection("list")
        .setTitle("Renumber Selection")
        .onClick(() => doRenumberSelection(editor))
    );
  };

  app.workspace.on("editor-menu" as never, handler);
  menuCleanup = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events = (app.workspace as any).evt;
    if (events?.offContext) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      events.off("editor-menu", handler);
    }
    menuCleanup = null;
  };

  return menuCleanup;
}

// ========== ACTIONS ==========

function doContinue(
  editor: Editor,
  scope: ListItem[],
  level: number,
  cursorLine: number
) {
  const item = scope.find((i) => i.line === cursorLine);
  if (!item) return;
  const next = nextNumberInScope(scope, level, 1);
  replaceCurrentNumber(editor, cursorLine, item.indent, level, next, item.content);
}

function doRestartAt(
  editor: Editor,
  scope: ListItem[],
  level: number,
  cursorLine: number,
  start: number
) {
  const item = scope.find((i) => i.line === cursorLine);
  if (!item) return;
  replaceCurrentNumber(editor, cursorLine, item.indent, level, start, item.content);
}

function doRenumberSelection(editor: Editor) {
  const selection = editor.getSelection();
  if (!selection.trim()) {
    new Notice("Select one or more lines first.");
    return;
  }

  const from = editor.getCursor("from");
  const to = editor.getCursor("to");
  const start = Math.min(from.line, to.line);
  const end = Math.max(from.line, to.line);

  let counter = 1;
  const output: string[] = [];

  for (let i = start; i <= end; i++) {
    const line = editor.getLine(i);
    const trimmed = line.trim();
    if (!trimmed) {
      output.push(line);
      continue;
    }

    // Preserve indentation
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : "";
    const level = detectLevelFromIndent(indent.length);

    // Strip old number, keep content
    const content = trimmed.replace(/^([IVXivx]|[A-Z]|[a-z]|\d+)\.\s*/, "");

    const newLine = indent + formatOutlineItem(level, counter, content);
    output.push(newLine);
    counter++;
  }

  editor.setLine(start, output.join("\n"));
  if (end > start) {
    for (let i = end; i >= start + 1; i--) {
      editor.replaceRange("", { line: i, ch: 0 }, { line: i, ch: editor.getLine(i).length });
    }
  }

  new Notice(`Renumbered ${counter - 1} items.`);
}

function replaceCurrentNumber(
  editor: Editor,
  lineNum: number,
  indent: number,
  level: number,
  number: number,
  content: string
) {
  const spaces = " ".repeat(indent);
  const newLine = spaces + formatOutlineItem(level, number, content);
  editor.setLine(lineNum, newLine);
}

// ========== PROMPT ==========

function promptNumber(message: string, defaultValue: string): Promise<string | null> {
  return new Promise((resolve) => {
    // Create inline prompt using MarkdownView's built-in notice
    const input = prompt(message, defaultValue);
    resolve(input);
  });
}
