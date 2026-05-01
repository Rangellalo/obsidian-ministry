// Styles injected into the document by the plugin
// These enhance Live Preview without requiring the full theme

export const WYSIWYG_CSS = `
/* ─── CALLOUT BOXES IN LIVE PREVIEW ─── */
.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="scripture"],
.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="keypoint"],
.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="keytruth"],
.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="illustration"],
.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="invitation"] {
  border-radius: 6px;
  padding: 0.75em 1em;
  margin: 0.75em 0;
  font-size: 0.95em;
  line-height: 1.6;
}

.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="scripture"] {
  background: var(--background-secondary);
  border-left: 4px solid var(--text-accent);
}

.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="keypoint"],
.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="keytruth"] {
  background: var(--background-secondary);
  border-left: 4px solid var(--interactive-accent);
  font-weight: 500;
}

.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="illustration"] {
  background: var(--background-secondary);
  border-left: 4px solid var(--text-muted);
  font-style: italic;
}

.markdown-source-view.mod-cm6 .cm-content .cm-embed-block[data-callout="invitation"] {
  background: var(--background-secondary);
  border: 1px solid var(--interactive-accent);
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
}

/* ─── PAGE BREAK VISUAL ─── */
.markdown-source-view.mod-cm6 .cm-content .cm-embed-block.cm-embed-preview:has(div.page-break),
.markdown-preview-view div.page-break {
  border-top: 2px dashed var(--background-modifier-border);
  margin: 1em 0;
  padding-top: 1em;
}

.markdown-source-view.mod-cm6 .cm-content .cm-embed-block.cm-embed-preview div.page-break::before {
  content: "PAGE BREAK";
  display: block;
  font-size: 0.7em;
  font-weight: 700;
  color: var(--text-faint);
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ─── CSSCLASS STATUS BAR PIllS ─── */
.tpt-cssclass-bar {
  position: fixed;
  bottom: 44px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-width: 280px;
  pointer-events: none;
}

.tpt-cssclass-pill {
  background: var(--background-secondary);
  border: 1px solid var(--background-modifier-border);
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 0.72em;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.02em;
  pointer-events: auto;
  cursor: pointer;
}

.tpt-cssclass-pill:hover {
  background: var(--interactive-accent);
  color: var(--text-on-accent);
}

/* ─── FRONTMATTER TOGGLE (minimal) ─── */
.tpt-frontmatter-toggle {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 10000;
}

.tpt-frontmatter-toggle button {
  font-size: 0.7em;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--background-modifier-border);
  background: var(--background-secondary);
  color: var(--text-muted);
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s;
}

.tpt-frontmatter-toggle button:hover {
  opacity: 1;
}
`;

export function injectWysiwygStyles(): void {
  const id = "tpt-wysiwyg-styles";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = WYSIWYG_CSS;
  document.head.appendChild(style);
}

export function removeWysiwygStyles(): void {
  const el = document.getElementById("tpt-wysiwyg-styles");
  if (el) el.remove();
}
