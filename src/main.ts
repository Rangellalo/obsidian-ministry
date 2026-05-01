import { Plugin, Notice, MarkdownView, TFile } from "obsidian";
import { TPTSettings, DEFAULT_SETTINGS, TPTSettingTab } from "./settings";
import { registerNumberingMenu } from "./numberingCommands";
import { registerTitleAlignmentCommands } from "./alignmentCommands";
import { injectWysiwygStyles, removeWysiwygStyles } from "./wysiwygStyles";
import { getCurrentListScope, detectLevelFromIndent, formatOutlineItem, nextNumberInScope } from "./listEngine";
import {
  SERMON_LIVE_PREACHING, SERMON_MANUSCRIPT, SERMON_SHORT_OUTLINE,
  WORKBOOK_MODULE, WORKBOOK_STUDY_GUIDE,
  STUDY_INDUCTIVE, STUDY_VERSE_BY_VERSE, STUDY_TOPICAL, STUDY_EXPOSITORY, STUDY_DOCTRINAL,
} from "./templates";

export default class ThePreachersToolPlugin extends Plugin {
  settings: TPTSettings;
  private numberingCleanup: (() => void) | null = null;

  async onload(): Promise<void> {
    await this.loadSettings();
    this.addSettingTab(new TPTSettingTab(this.app, this));

    // Numbering context menu
    this.applyNumberingSettings();

    // Alignment commands
    registerTitleAlignmentCommands(this.app, (cmd) => this.addCommand(cmd));

    // WYSIWYG styles
    injectWysiwygStyles();

    // ─── SERMON TEMPLATES ───
    this.addCommand({
      id: "tpt-sermon-live-preaching",
      name: "TPT Sermon — New Live Preaching Outline",
      callback: () => {
        this.openNote(SERMON_LIVE_PREACHING(this.settings));
        new Notice("Live Preaching Outline created.");
      },
    });

    this.addCommand({
      id: "tpt-sermon-manuscript",
      name: "TPT Sermon — New Full Manuscript",
      callback: () => {
        this.openNote(SERMON_MANUSCRIPT(this.settings));
        new Notice("Full Sermon Manuscript created.");
      },
    });

    this.addCommand({
      id: "tpt-sermon-short-outline",
      name: "TPT Sermon — New Short Sermon Outline",
      callback: () => {
        this.openNote(SERMON_SHORT_OUTLINE(this.settings));
        new Notice("Short Sermon Outline created.");
      },
    });

    // ─── WORKBOOK TEMPLATES ───
    this.addCommand({
      id: "tpt-workbook-module",
      name: "TPT Workbook — New Module",
      callback: () => {
        this.openNote(WORKBOOK_MODULE(this.settings));
        new Notice("Workbook Module created.");
      },
    });

    this.addCommand({
      id: "tpt-workbook-study-guide",
      name: "TPT Workbook — New Two-Page Study Guide",
      callback: () => {
        this.openNote(WORKBOOK_STUDY_GUIDE(this.settings));
        new Notice("Two-Page Study Guide created.");
      },
    });

    // ─── STUDY TEMPLATES ───
    this.addCommand({
      id: "tpt-study-inductive",
      name: "TPT Study — New Inductive Study",
      callback: () => {
        this.openNote(STUDY_INDUCTIVE(this.settings));
        new Notice("Inductive Study created.");
      },
    });

    this.addCommand({
      id: "tpt-study-versebyverse",
      name: "TPT Study — New Verse-by-Verse Study",
      callback: () => {
        this.openNote(STUDY_VERSE_BY_VERSE(this.settings));
        new Notice("Verse-by-Verse Study created.");
      },
    });

    this.addCommand({
      id: "tpt-study-topical",
      name: "TPT Study — New Topical Study",
      callback: () => {
        this.openNote(STUDY_TOPICAL(this.settings));
        new Notice("Topical Study created.");
      },
    });

    this.addCommand({
      id: "tpt-study-expository",
      name: "TPT Study — New Expository Study",
      callback: () => {
        this.openNote(STUDY_EXPOSITORY(this.settings));
        new Notice("Expository Study created.");
      },
    });

    this.addCommand({
      id: "tpt-study-doctrinal",
      name: "TPT Study — New Doctrinal Study",
      callback: () => {
        this.openNote(STUDY_DOCTRINAL(this.settings));
        new Notice("Doctrinal Study created.");
      },
    });

    // ─── INSERT BLOCKS ───
    this.addCommand({
      id: "tpt-insert-scripture",
      name: "TPT Sermon — Insert Scripture Block",
      editorCallback: (ed) => {
        ed.replaceSelection("> [!scripture]\n> **Text:** \n> *Version:*\n\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-word-study",
      name: "TPT Sermon — Insert Word Study Box",
      editorCallback: (ed) => {
        ed.replaceSelection("| Word | Original | Meaning | Use in Text |\n|------|----------|---------|-------------|\n| | | | |\n\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-invitation",
      name: "TPT Sermon — Insert Invitation Drive",
      editorCallback: (ed) => {
        ed.replaceSelection("## Conclusion\n\n**Summary Statement:**\n\n**Call to Action:**\n\n**Invitation Drive:**\n\n> *...*");
      },
    });

    this.addCommand({
      id: "tpt-insert-keypoint",
      name: "TPT Sermon — Insert Key Point Block",
      editorCallback: (ed) => {
        ed.replaceSelection("> [!keypoint]\n> **Main Point:**\n\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-illustration",
      name: "TPT Sermon — Insert Illustration Block",
      editorCallback: (ed) => {
        ed.replaceSelection("> [!illustration]\n> **Story/Illustration:**\n\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-cross-reference",
      name: "TPT Sermon — Insert Cross-Reference Box",
      editorCallback: (ed) => {
        ed.replaceSelection("| Text | Connection |\n|------|------------|\n| | |\n| | |\n\n");
      },
    });

    // ─── PRINT PROFILES ───
    this.addCommand({
      id: "tpt-print-sermon-profile",
      name: "TPT Export — Apply Sermon Print Profile",
      callback: () => this.applyProfile(["tpt-sermon", "tpt-print-sermon", "tpt-export-pdf-sermon"]),
    });

    this.addCommand({
      id: "tpt-print-study-profile",
      name: "TPT Export — Apply Study Guide Print Profile",
      callback: () => this.applyProfile(["tpt-study", "tpt-print-study", "tpt-export-pdf-study"]),
    });

    this.addCommand({
      id: "tpt-print-workbook-profile",
      name: "TPT Export — Apply Workbook Print Profile",
      callback: () => this.applyProfile(["tpt-workbook", "tpt-print-workbook", "tpt-export-pdf-workbook"]),
    });

    this.addCommand({
      id: "tpt-print-friendly",
      name: "TPT Export — Apply Print-Friendly Mode",
      callback: () => this.applyProfile(["tpt-print-minimal"]),
    });

    this.addCommand({
      id: "tpt-print-bw",
      name: "TPT Export — Apply Black & White Print Mode",
      callback: () => this.applyProfile(["tpt-print-bw"]),
    });

    this.addCommand({
      id: "tpt-insert-page-break",
      name: "TPT Export — Insert Page Break",
      editorCallback: (ed) => {
        ed.replaceSelection("\n<div class=\"page-break\"></div>\n");
      },
    });

    // ─── NUMBERING COMMANDS ───
    this.addCommand({
      id: "tpt-number-continue",
      name: "TPT Numbering — Continue Sequence",
      editorCallback: () => {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;
        const scope = getCurrentListScope(view.editor, view.editor.getCursor().line, this.settings.blankLinePreservesList);
        const level = detectLevelFromIndent(view.editor.getLine(view.editor.getCursor().line).match(/^(\s*)/)?.[1]?.length ?? 0);
        const next = nextNumberInScope(scope, level, 1);
        const line = view.editor.getLine(view.editor.getCursor().line);
        const match = line.match(/^(\s*)([IVXivx]|[A-Z]|[a-z]|\d+)\.\s*(.*)$/);
        if (match) {
          view.editor.setLine(view.editor.getCursor().line, match[1] + formatOutlineItem(level, next, match[3]));
        }
      },
    });

    this.addCommand({
      id: "tpt-number-restart-1",
      name: "TPT Numbering — Restart at 1",
      editorCallback: () => {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;
        const line = view.editor.getLine(view.editor.getCursor().line);
        const match = line.match(/^(\s*)([IVXivx]|[A-Z]|[a-z]|\d+)\.\s*(.*)$/);
        if (match) {
          const level = detectLevelFromIndent(match[1].length);
          view.editor.setLine(view.editor.getCursor().line, match[1] + formatOutlineItem(level, 1, match[3]));
        }
      },
    });

    this.addCommand({
      id: "tpt-insert-page-break",
      name: "TPT Export — Insert Page Break",
      editorCallback: (ed) => {
        ed.replaceSelection("\n<div class=\"page-break\"></div>\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-lesson-section",
      name: "TPT Workbook — Insert Lesson Section",
      editorCallback: (ed) => {
        ed.replaceSelection("## Lesson Title\n\n**Key Truth:**\n\n**Scripture:**\n\n---\n\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-key-truth",
      name: "TPT Workbook — Insert Key Truth Block",
      editorCallback: (ed) => {
        ed.replaceSelection("> [!keytruth]\n> **Key Truth:**\n\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-oia-block",
      name: "TPT Study — Insert Observation/Interpretation/Application",
      editorCallback: (ed) => {
        ed.replaceSelection("### Observation\n*What does the text say?*\n1.\n2.\n3.\n\n### Interpretation\n*What does the text mean?*\n1.\n2.\n3.\n\n### Application\n*What must I believe, obey, correct, or practice?*\n1.\n2.\n3.\n\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-discussion-questions",
      name: "TPT Study — Insert Discussion Questions",
      editorCallback: (ed) => {
        ed.replaceSelection("### Discussion Questions\n\n1.\n2.\n3.\n\n");
      },
    });

    this.addCommand({
      id: "tpt-insert-page-break",
      name: "TPT Export — Insert Page Break",
      editorCallback: (ed) => {
        ed.replaceSelection("\n<div class=\"page-break\"></div>\n");
      },
    });

    console.log("The Preacher's Tool v2.0 loaded.");
  }

  onunload(): void {
    removeWysiwygStyles();
    console.log("The Preacher's Tool unloaded.");
  }

  async loadSettings(): Promise<void> {
    const data = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, ...data };
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  applyNumberingSettings(): void {
    if (this.numberingCleanup) this.numberingCleanup();
    this.numberingCleanup = registerNumberingMenu(this.app, this.settings.blankLinePreservesList);
  }

  openNote(content: string): void {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (view) {
      view.editor.setValue(content);
    }
  }

  async applyProfile(classes: string[]): Promise<void> {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new Notice("No active file.");
      return;
    }
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      const exist = fm.cssclasses ?? [];
      const arr = Array.isArray(exist) ? [...exist] : [exist].filter(Boolean);
      for (const c of classes) {
        if (!arr.includes(c)) arr.push(c);
      }
      fm.cssclasses = arr;
    });
    new Notice(classes.join(", ") + " applied.");
  }
}
