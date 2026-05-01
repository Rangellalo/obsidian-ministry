import { App, PluginSettingTab, Setting } from "obsidian";
import ThePreachersToolPlugin from "./main";

export interface TPTSettings {
  // Identity
  defaultSpeaker: string;
  defaultAuthor: string;
  defaultLocation: string;
  defaultBibleVersion: string;

  // Palettes
  defaultSermonPalette: string;
  defaultWorkbookPalette: string;
  defaultStudyPalette: string;

  // Typography
  defaultHeadingFont: string;
  defaultBodyFont: string;

  // Layout
  defaultSermonLayout: string;
  defaultWorkbookLayout: string;
  defaultStudyLayout: string;

  // V2.0 — List Intelligence
  blankLinePreservesList: boolean;
  continueFromLastNumber: boolean;

  // V2.0 — Behavior
  insertDateInFrontmatter: boolean;
  preserveCleanMarkdown: boolean;
}

export const DEFAULT_SETTINGS: TPTSettings = {
  defaultSermonPalette: "tpt-palette-midnight",
  defaultWorkbookPalette: "tpt-palette-parchment",
  defaultStudyPalette: "tpt-palette-standard",
  defaultHeadingFont: "tpt-heading-georgia",
  defaultBodyFont: "tpt-font-system",
  defaultSermonLayout: "tpt-mode-study",
  defaultWorkbookLayout: "tpt-mode-study",
  defaultStudyLayout: "tpt-mode-study",
  defaultSpeaker: "Ed Rangel",
  defaultAuthor: "Ed Rangel",
  defaultLocation: "Waupaca Church of Christ",
  defaultBibleVersion: "NASB 1995",
  insertDateInFrontmatter: true,
  preserveCleanMarkdown: true,
  // V2.0 defaults
  blankLinePreservesList: true,
  continueFromLastNumber: false,
};

export class TPTSettingTab extends PluginSettingTab {
  plugin: ThePreachersToolPlugin;

  constructor(app: App, plugin: ThePreachersToolPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", {
      text: "The Preacher's Tool — Settings",
    });

    containerEl.createEl("p", {
      text: "Identity, typography, and list intelligence settings.",
      cls: "tpt-settings-description",
    });

    // ─── IDENTITY ───
    containerEl.createEl("h3", { text: "Identity", cls: "tpt-settings-heading" });

    new Setting(containerEl)
      .setName("Default Speaker")
      .setDesc("Used in sermon frontmatter.")
      .addText((t) =>
        t
          .setPlaceholder("Ed Rangel")
          .setValue(this.plugin.settings.defaultSpeaker)
          .onChange(async (v) => {
            this.plugin.settings.defaultSpeaker = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Default Author")
      .setDesc("Used in study and workbook frontmatter.")
      .addText((t) =>
        t
          .setPlaceholder("Ed Rangel")
          .setValue(this.plugin.settings.defaultAuthor)
          .onChange(async (v) => {
            this.plugin.settings.defaultAuthor = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Default Location")
      .setDesc("Used in sermon and teaching frontmatter.")
      .addText((t) =>
        t
          .setPlaceholder("Waupaca Church of Christ")
          .setValue(this.plugin.settings.defaultLocation)
          .onChange(async (v) => {
            this.plugin.settings.defaultLocation = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Default Bible Version")
      .setDesc("Used as a frontmatter field.")
      .addText((t) =>
        t
          .setPlaceholder("NASB 1995")
          .setValue(this.plugin.settings.defaultBibleVersion)
          .onChange(async (v) => {
            this.plugin.settings.defaultBibleVersion = v;
            await this.plugin.saveSettings();
          })
      );

    // ─── PALETTES ───
    containerEl.createEl("h3", {
      text: "Default Palettes",
      cls: "tpt-settings-heading",
    });

    new Setting(containerEl)
      .setName("Sermon Default Palette")
      .addDropdown((d) =>
        d
          .addOption("tpt-palette-standard", "Standard — Navy Gold")
          .addOption("tpt-palette-midnight", "Night Watch — Midnight Amber")
          .addOption("tpt-palette-parchment", "Scroll Ink — Parchment")
          .addOption("tpt-palette-burgundy", "Calvary Stone — Burgundy")
          .setValue(this.plugin.settings.defaultSermonPalette)
          .onChange(async (v) => {
            this.plugin.settings.defaultSermonPalette = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Workbook Default Palette")
      .addDropdown((d) =>
        d
          .addOption("tpt-palette-parchment", "Scroll Ink — Parchment")
          .addOption("tpt-palette-standard", "Standard — Navy Gold")
          .addOption("tpt-palette-olivepress", "Olive Press — Linen")
          .addOption("tpt-palette-sepia", "Scribe's Lamp — Sepia")
          .setValue(this.plugin.settings.defaultWorkbookPalette)
          .onChange(async (v) => {
            this.plugin.settings.defaultWorkbookPalette = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Study Default Palette")
      .addDropdown((d) =>
        d
          .addOption("tpt-palette-standard", "Standard — Navy Gold")
          .addOption("tpt-palette-parchment", "Scroll Ink — Parchment")
          .addOption("tpt-palette-sepia", "Scribe's Lamp — Sepia")
          .setValue(this.plugin.settings.defaultStudyPalette)
          .onChange(async (v) => {
            this.plugin.settings.defaultStudyPalette = v;
            await this.plugin.saveSettings();
          })
      );

    // ─── TYPOGRAPHY ───
    containerEl.createEl("h3", {
      text: "Typography",
      cls: "tpt-settings-heading",
    });

    new Setting(containerEl)
      .setName("Default Heading Font")
      .addDropdown((d) =>
        d
          .addOption("tpt-heading-georgia", "Georgia")
          .addOption("tpt-heading-times", "Times New Roman")
          .addOption("tpt-heading-garamond", "Garamond")
          .addOption("tpt-heading-lexicon", "Lexicon")
          .addOption("tpt-heading-minion", "Minion Pro")
          .addOption("tpt-heading-match-body", "Match Body Font")
          .setValue(this.plugin.settings.defaultHeadingFont)
          .onChange(async (v) => {
            this.plugin.settings.defaultHeadingFont = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Default Body Font")
      .addDropdown((d) =>
        d
          .addOption("tpt-font-system", "System Default")
          .addOption("tpt-font-serif", "Serif (Georgia/Times)")
          .addOption("tpt-font-sans", "Sans-Serif")
          .addOption("tpt-font-classic", "Classic (Palatino)")
          .addOption("tpt-font-lexicon", "Lexicon")
          .addOption("tpt-font-minion", "Minion Pro")
          .setValue(this.plugin.settings.defaultBodyFont)
          .onChange(async (v) => {
            this.plugin.settings.defaultBodyFont = v;
            await this.plugin.saveSettings();
          })
      );

    // ─── V2.0 LIST INTELLIGENCE ───
    containerEl.createEl("h3", {
      text: "List Intelligence",
      cls: "tpt-settings-heading",
    });

    new Setting(containerEl)
      .setName("Blank Line Preserves List")
      .setDesc(
        "When ON: one blank line keeps numbering continuous. " +
          "When OFF: blank lines break the sequence."
      )
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.blankLinePreservesList)
          .onChange(async (v) => {
            this.plugin.settings.blankLinePreservesList = v;
            await this.plugin.saveSettings();
            this.plugin.applyNumberingSettings();
          })
      );

    new Setting(containerEl)
      .setName("Continue From Last Number")
      .setDesc(
        "When ON: numbering continues from the last visible number " +
          "even across section breaks. OFF by default."
      )
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.continueFromLastNumber)
          .onChange(async (v) => {
            this.plugin.settings.continueFromLastNumber = v;
            await this.plugin.saveSettings();
            this.plugin.applyNumberingSettings();
          })
      );

    new Setting(containerEl)
      .setDesc(
        "List Intelligence gives you Ctrl+Click context-menu control over " +
          "numbering: Continue, Restart at 1, Restart at..., and Renumber Selection."
      )
      .setName("About List Intelligence");

    // ─── OUTPUT ───
    containerEl.createEl("h3", {
      text: "Output Behavior",
      cls: "tpt-settings-heading",
    });

    new Setting(containerEl)
      .setName("Preserve Clean Markdown")
      .setDesc(
        "Keep output clean for Obsidian, Pandoc, DOCX, PDF, and web publishing."
      )
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.preserveCleanMarkdown)
          .onChange(async (v) => {
            this.plugin.settings.preserveCleanMarkdown = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Insert Date in Frontmatter")
      .setDesc(
        "Automatically insert today's date when creating new notes."
      )
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.insertDateInFrontmatter)
          .onChange(async (v) => {
            this.plugin.settings.insertDateInFrontmatter = v;
            await this.plugin.saveSettings();
          })
      );
  }
}
