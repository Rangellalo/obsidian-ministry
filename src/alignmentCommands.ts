import { App, MarkdownView, Notice, TFile } from "obsidian";

// Frontmatter cssclass helpers
const TITLE_CLASSES = {
  center: "tpt-titles-center",
  left: "tpt-titles-left",
  right: "tpt-titles-right",
};

const HEADING_CLASSES = {
  center: "tpt-headings-center",
  left: "tpt-headings-left",
  right: "tpt-headings-right",
};

function getActiveFile(app: App): TFile | null {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  return view?.file ?? null;
}

interface CssClassState {
  titles: "center" | "left" | "right" | null;
  headings: "center" | "left" | "right" | null;
}

function readFrontmatterCssclasses(app: App): CssClassState {
  const file = getActiveFile(app);
  if (!file) return { titles: null, headings: null };
  const fm = app.metadataCache.getFileCache(file)?.frontmatter;
  if (!fm || !fm.cssclasses) return { titles: null, headings: null };
  const classes = Array.isArray(fm.cssclasses)
    ? fm.cssclasses
    : [fm.cssclasses].filter(Boolean);

  const state: CssClassState = { titles: null, headings: null };

  for (const key in TITLE_CLASSES) {
    if (classes.includes((TITLE_CLASSES as Record<string, string>)[key])) {
      state.titles = key as "center" | "left" | "right";
      break;
    }
  }
  for (const key in HEADING_CLASSES) {
    if (classes.includes((HEADING_CLASSES as Record<string, string>)[key])) {
      state.headings = key as "center" | "left" | "right";
      break;
    }
  }

  return state;
}

function applyCssclass(app: App, addClass: string, removeClasses: string[]): void {
  const file = getActiveFile(app);
  if (!file) {
    new Notice("No active note.");
    return;
  }
  app.fileManager.processFrontMatter(file, (fm) => {
    let classes = fm.cssclasses;
    if (!classes) {
      classes = [addClass];
    } else if (Array.isArray(classes)) {
      classes = classes.filter((c: string) => !removeClasses.includes(c));
      classes.push(addClass);
      classes = Array.from(new Set(classes));
    } else if (typeof classes === "string") {
      if (removeClasses.includes(classes)) return;
      classes = [classes, addClass];
    }
    fm.cssclasses = classes;
  });
  new Notice(`${addClass} applied.`);
}

// ========== TITLE COMMANDS ==========

export function registerTitleAlignmentCommands(
  app: App,
  addCommand: (cmd: {
    id: string;
    name: string;
    callback: () => void;
  }) => void
): void {
  addCommand({
    id: "tpt-format-title-center",
    name: "TPT Format — Center Title",
    callback: () => {
      const state = readFrontmatterCssclasses(app);
      const remove: string[] = [
        TITLE_CLASSES.center,
        TITLE_CLASSES.left,
        TITLE_CLASSES.right,
      ];
      if (state.titles !== "center") {
        applyCssclass(app, TITLE_CLASSES.center, remove);
      } else {
        // Toggle off
        const file = getActiveFile(app);
        if (!file) return;
        app.fileManager.processFrontMatter(file, (fm) => {
          let classes = fm.cssclasses;
          if (Array.isArray(classes)) {
            fm.cssclasses = classes.filter(
              (c: string) => !TITLE_CLASSES.center.includes(c)
            );
          }
        });
        new Notice("Title alignment reset.");
      }
    },
  });

  addCommand({
    id: "tpt-format-title-left",
    name: "TPT Format — Left Title",
    callback: () => {
      const remove: string[] = [
        TITLE_CLASSES.center,
        TITLE_CLASSES.left,
        TITLE_CLASSES.right,
      ];
      applyCssclass(app, TITLE_CLASSES.left, remove);
    },
  });

  addCommand({
    id: "tpt-format-title-right",
    name: "TPT Format — Right Title",
    callback: () => {
      const remove: string[] = [
        TITLE_CLASSES.center,
        TITLE_CLASSES.left,
        TITLE_CLASSES.right,
      ];
      applyCssclass(app, TITLE_CLASSES.right, remove);
    },
  });

  addCommand({
    id: "tpt-format-headings-center",
    name: "TPT Format — Center Headings",
    callback: () => {
      const state = readFrontmatterCssclasses(app);
      const remove: string[] = [
        HEADING_CLASSES.center,
        HEADING_CLASSES.left,
        HEADING_CLASSES.right,
      ];
      if (state.headings !== "center") {
        applyCssclass(app, HEADING_CLASSES.center, remove);
      } else {
        const file = getActiveFile(app);
        if (!file) return;
        app.fileManager.processFrontMatter(file, (fm) => {
          let classes = fm.cssclasses;
          if (Array.isArray(classes)) {
            fm.cssclasses = classes.filter(
              (c: string) => !HEADING_CLASSES.center.includes(c)
            );
          }
        });
        new Notice("Heading alignment reset.");
      }
    },
  });

  addCommand({
    id: "tpt-format-headings-left",
    name: "TPT Format — Left Headings",
    callback: () => {
      const remove: string[] = [
        HEADING_CLASSES.center,
        HEADING_CLASSES.left,
        HEADING_CLASSES.right,
      ];
      applyCssclass(app, HEADING_CLASSES.left, remove);
    },
  });

  addCommand({
    id: "tpt-format-headings-right",
    name: "TPT Format — Right Headings",
    callback: () => {
      const remove: string[] = [
        HEADING_CLASSES.center,
        HEADING_CLASSES.left,
        HEADING_CLASSES.right,
      ];
      applyCssclass(app, HEADING_CLASSES.right, remove);
    },
  });

  addCommand({
    id: "tpt-format-reset-alignment",
    name: "TPT Format — Reset Alignment",
    callback: () => {
      const file = getActiveFile(app);
      if (!file) {
        new Notice("No active note.");
        return;
      }
      app.fileManager.processFrontMatter(file, (fm) => {
        let classes = fm.cssclasses;
        if (Array.isArray(classes)) {
          classes = classes.filter(
            (c: string) =>
              ![
                ...Object.values(TITLE_CLASSES),
                ...Object.values(HEADING_CLASSES),
              ].includes(c)
          );
        }
        fm.cssclasses = classes;
      });
      new Notice("All alignment settings cleared.");
    },
  });
}
