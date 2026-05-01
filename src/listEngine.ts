import { Editor } from "obsidian";

// ========== CLASSIC OUTLINE PATTERN ENGINE ==========

const OUTLINE_PATTERNS = [
  {
    name: "I",
    format: (n: number) => toRoman(n).toUpperCase() + ".",
  },
  {
    name: "A",
    format: (n: number) => toLetter(n).toUpperCase() + ".",
  },
  {
    name: "1",
    format: (n: number) => n.toString() + ".",
  },
  {
    name: "a",
    format: (n: number) => toLetter(n).toLowerCase() + ".",
  },
  {
    name: "1r",
    format: (n: number) => n.toString() + ".",
  }, // Arabic repeats at level 5
];

// ========== UTILITIES ==========

function toRoman(n: number): string {
  const map: [number, string][] = [
    [1000, "m"], [900, "cm"], [500, "d"], [400, "cd"],
    [100, "c"], [90, "xc"], [50, "l"], [40, "xl"],
    [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"],
  ];
  let result = "";
  for (const [val, sym] of map) {
    while (n >= val) { result += sym; n -= val; }
  }
  return result;
}

function toLetter(n: number): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  let idx = n - 1;
  while (idx >= 0) {
    result = alphabet[idx % 26] + result;
    idx = Math.floor(idx / 26) - 1;
  }
  return result;
}

// ========== LIST ITEM PARSING ==========

export interface ListItem {
  line: number;
  content: string;
  indent: number;
  level: number;
  originalNumber: number;
  isOutline: boolean;
  patternIndex: number;
}

const INDENT_UNIT = 2;

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parsePatternIndex(number: number, pattern: string): number {
  const clean = pattern.replace(".", "").toLowerCase();
  // Roman: I, V, X, L, C, D, M
  if (/^[ivxlcdm]+$/.test(clean)) return 0;
  // Capital letter: A-Z
  if (/[A-Z]/.test(clean)) return 1;
  // Arabic number
  if (/^\d+$/.test(clean)) return 2;
  // Lowercase letter: a-z
  if (/[a-z]/.test(clean)) return 3;
  return 0;
}

function parseListItem(line: string, lineNumber: number): ListItem | null {
  const indent = getIndent(line);
  const content = line.trim();
  if (!content) return null;

  // Classic outline: I.  A.  1.  a.  ii.
  const outlineMatch = content.match(/^(([IVXivx]|[A-Z]|[a-z]|\d+)\.)\s*(.*)$/);

  if (outlineMatch) {
    const pattern = outlineMatch[1];
    const rest = outlineMatch[3];
    const indentLevel = Math.floor(indent / INDENT_UNIT);
    const patternIndex = parsePatternIndex(0, pattern);
    return {
      line: lineNumber,
      content: rest,
      indent,
      level: indentLevel,
      originalNumber: parsePatternValue(pattern),
      isOutline: true,
      patternIndex,
    };
  }

  // Decimal: 1. text
  const decimalMatch = content.match(/^(\d+)\.\s+(.*)$/);
  if (decimalMatch) {
    return {
      line: lineNumber,
      content: decimalMatch[2],
      indent,
      level: 0,
      originalNumber: parseInt(decimalMatch[1], 10),
      isOutline: false,
      patternIndex: 2,
    };
  }

  return null;
}

function parsePatternValue(pattern: string): number {
  const clean = pattern.replace(".", "").toLowerCase();
  // Roman
  if (/^[ivxlcdm]+$/.test(clean)) {
    const map: Record<string, number> = {
      i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000,
    };
    let total = 0;
    for (let i = 0; i < clean.length; i++) {
      const cur = map[clean[i]] || 0;
      const next = map[clean[i + 1]] || 0;
      total += (cur < next) ? -cur : cur;
    }
    return total;
  }
  // Letter
  if (/^[a-z]$/.test(clean)) {
    return clean.charCodeAt(0) - 96;
  }
  // Number
  const num = parseInt(clean, 10);
  return isNaN(num) ? 1 : num;
}

// ========== SCAN & SCOPE ==========

export function scanListItems(editor: Editor): ListItem[] {
  const items: ListItem[] = [];
  const lineCount = editor.lastLine() + 1;
  for (let i = 0; i < lineCount; i++) {
    const line = editor.getLine(i);
    const item = parseListItem(line, i);
    if (item) items.push(item);
  }
  return items;
}

export function getCurrentListScope(
  editor: Editor,
  cursorLine: number,
  blankLineBreaks: boolean
): ListItem[] {
  const allItems = scanListItems(editor);
  if (allItems.length === 0) return [];

  // Find anchor: nearest item at or above cursor
  let anchor = -1;
  for (let i = allItems.length - 1; i >= 0; i--) {
    if (allItems[i].line <= cursorLine) {
      anchor = i;
      break;
    }
  }
  if (anchor === -1) return [];

  const scope: ListItem[] = [allItems[anchor]];
  const gapThreshold = blankLineBreaks ? 1 : 2;

  // Forward
  for (let i = anchor + 1; i < allItems.length; i++) {
    const gap = allItems[i].line - allItems[i - 1].line;
    if (gap > gapThreshold) break;
    scope.push(allItems[i]);
  }

  // Backward
  for (let i = anchor - 1; i >= 0; i--) {
    const gap = allItems[i + 1].line - allItems[i].line;
    if (gap > gapThreshold) break;
    scope.unshift(allItems[i]);
  }

  return scope;
}

// ========== FORMAT HELPERS ==========

export function formatOutlineItem(level: number, number: number, text: string): string {
  const idx = level % OUTLINE_PATTERNS.length;
  const prefix = OUTLINE_PATTERNS[idx].format(number);
  return prefix + " " + text;
}

export function formatDecimalItem(number: number, text: string): string {
  return number.toString() + ". " + text;
}

export function currentLineText(editor: Editor): string {
  const cursor = editor.getCursor();
  return editor.getLine(cursor.line);
}

export function nextNumberInScope(
  scope: ListItem[],
  level: number,
  fromStart: number
): number {
  if (scope.length === 0) return fromStart;
  const sameLevel = scope.filter((i) => i.level === level);
  if (sameLevel.length === 0) return fromStart;
  const last = sameLevel[sameLevel.length - 1];
  return last.originalNumber + 1;
}

export function detectLevelFromIndent(indent: number): number {
  return Math.floor(indent / INDENT_UNIT);
}
