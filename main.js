var N=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var lt=Object.getOwnPropertyNames,F=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,ct=Object.prototype.propertyIsEnumerable;var R=(e,s,t)=>s in e?N(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,D=(e,s)=>{for(var t in s||(s={}))B.call(s,t)&&R(e,t,s[t]);if(F)for(var t of F(s))ct.call(s,t)&&R(e,t,s[t]);return e};var dt=(e,s)=>{for(var t in s)N(e,t,{get:s[t],enumerable:!0})},ut=(e,s,t,n)=>{if(s&&typeof s=="object"||typeof s=="function")for(let i of lt(s))!B.call(e,i)&&i!==t&&N(e,i,{get:()=>s[i],enumerable:!(n=at(s,i))||n.enumerable});return e};var pt=e=>ut(N({},"__esModule",{value:!0}),e);var c=(e,s,t)=>new Promise((n,i)=>{var r=l=>{try{o(t.next(l))}catch(g){i(g)}},a=l=>{try{o(t.throw(l))}catch(g){i(g)}},o=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,a);o((t=t.apply(e,s)).next())});var xt={};dt(xt,{default:()=>_});module.exports=pt(xt);var d=require("obsidian");var u=require("obsidian");var W={defaultSermonPalette:"tpt-palette-midnight",defaultWorkbookPalette:"tpt-palette-parchment",defaultStudyPalette:"tpt-palette-standard",defaultHeadingFont:"tpt-heading-georgia",defaultBodyFont:"tpt-font-system",defaultSermonLayout:"tpt-mode-study",defaultWorkbookLayout:"tpt-mode-study",defaultStudyLayout:"tpt-mode-study",defaultSpeaker:"Ed Rangel",defaultAuthor:"Ed Rangel",defaultLocation:"Waupaca Church of Christ",defaultBibleVersion:"NASB 1995",insertDateInFrontmatter:!0,preserveCleanMarkdown:!0,blankLinePreservesList:!0,continueFromLastNumber:!1},A=class extends u.PluginSettingTab{constructor(t,n){super(t,n);this.plugin=n}display(){let{containerEl:t}=this;t.empty(),t.createEl("h2",{text:"The Preacher's Tool \u2014 Settings"}),t.createEl("p",{text:"Identity, typography, and list intelligence settings.",cls:"tpt-settings-description"}),t.createEl("h3",{text:"Identity",cls:"tpt-settings-heading"}),new u.Setting(t).setName("Default Speaker").setDesc("Used in sermon frontmatter.").addText(n=>n.setPlaceholder("Ed Rangel").setValue(this.plugin.settings.defaultSpeaker).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultSpeaker=i,yield this.plugin.saveSettings()}))),new u.Setting(t).setName("Default Author").setDesc("Used in study and workbook frontmatter.").addText(n=>n.setPlaceholder("Ed Rangel").setValue(this.plugin.settings.defaultAuthor).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultAuthor=i,yield this.plugin.saveSettings()}))),new u.Setting(t).setName("Default Location").setDesc("Used in sermon and teaching frontmatter.").addText(n=>n.setPlaceholder("Waupaca Church of Christ").setValue(this.plugin.settings.defaultLocation).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultLocation=i,yield this.plugin.saveSettings()}))),new u.Setting(t).setName("Default Bible Version").setDesc("Used as a frontmatter field.").addText(n=>n.setPlaceholder("NASB 1995").setValue(this.plugin.settings.defaultBibleVersion).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultBibleVersion=i,yield this.plugin.saveSettings()}))),t.createEl("h3",{text:"Default Palettes",cls:"tpt-settings-heading"}),new u.Setting(t).setName("Sermon Default Palette").addDropdown(n=>n.addOption("tpt-palette-standard","Standard \u2014 Navy Gold").addOption("tpt-palette-midnight","Night Watch \u2014 Midnight Amber").addOption("tpt-palette-parchment","Scroll Ink \u2014 Parchment").addOption("tpt-palette-burgundy","Calvary Stone \u2014 Burgundy").setValue(this.plugin.settings.defaultSermonPalette).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultSermonPalette=i,yield this.plugin.saveSettings()}))),new u.Setting(t).setName("Workbook Default Palette").addDropdown(n=>n.addOption("tpt-palette-parchment","Scroll Ink \u2014 Parchment").addOption("tpt-palette-standard","Standard \u2014 Navy Gold").addOption("tpt-palette-olivepress","Olive Press \u2014 Linen").addOption("tpt-palette-sepia","Scribe's Lamp \u2014 Sepia").setValue(this.plugin.settings.defaultWorkbookPalette).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultWorkbookPalette=i,yield this.plugin.saveSettings()}))),new u.Setting(t).setName("Study Default Palette").addDropdown(n=>n.addOption("tpt-palette-standard","Standard \u2014 Navy Gold").addOption("tpt-palette-parchment","Scroll Ink \u2014 Parchment").addOption("tpt-palette-sepia","Scribe's Lamp \u2014 Sepia").setValue(this.plugin.settings.defaultStudyPalette).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultStudyPalette=i,yield this.plugin.saveSettings()}))),t.createEl("h3",{text:"Typography",cls:"tpt-settings-heading"}),new u.Setting(t).setName("Default Heading Font").addDropdown(n=>n.addOption("tpt-heading-georgia","Georgia").addOption("tpt-heading-times","Times New Roman").addOption("tpt-heading-garamond","Garamond").addOption("tpt-heading-lexicon","Lexicon").addOption("tpt-heading-minion","Minion Pro").addOption("tpt-heading-match-body","Match Body Font").setValue(this.plugin.settings.defaultHeadingFont).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultHeadingFont=i,yield this.plugin.saveSettings()}))),new u.Setting(t).setName("Default Body Font").addDropdown(n=>n.addOption("tpt-font-system","System Default").addOption("tpt-font-serif","Serif (Georgia/Times)").addOption("tpt-font-sans","Sans-Serif").addOption("tpt-font-classic","Classic (Palatino)").addOption("tpt-font-lexicon","Lexicon").addOption("tpt-font-minion","Minion Pro").setValue(this.plugin.settings.defaultBodyFont).onChange(i=>c(this,null,function*(){this.plugin.settings.defaultBodyFont=i,yield this.plugin.saveSettings()}))),t.createEl("h3",{text:"List Intelligence",cls:"tpt-settings-heading"}),new u.Setting(t).setName("Blank Line Preserves List").setDesc("When ON: one blank line keeps numbering continuous. When OFF: blank lines break the sequence.").addToggle(n=>n.setValue(this.plugin.settings.blankLinePreservesList).onChange(i=>c(this,null,function*(){this.plugin.settings.blankLinePreservesList=i,yield this.plugin.saveSettings(),this.plugin.applyNumberingSettings()}))),new u.Setting(t).setName("Continue From Last Number").setDesc("When ON: numbering continues from the last visible number even across section breaks. OFF by default.").addToggle(n=>n.setValue(this.plugin.settings.continueFromLastNumber).onChange(i=>c(this,null,function*(){this.plugin.settings.continueFromLastNumber=i,yield this.plugin.saveSettings(),this.plugin.applyNumberingSettings()}))),new u.Setting(t).setDesc("List Intelligence gives you Ctrl+Click context-menu control over numbering: Continue, Restart at 1, Restart at..., and Renumber Selection.").setName("About List Intelligence"),t.createEl("h3",{text:"Output Behavior",cls:"tpt-settings-heading"}),new u.Setting(t).setName("Preserve Clean Markdown").setDesc("Keep output clean for Obsidian, Pandoc, DOCX, PDF, and web publishing.").addToggle(n=>n.setValue(this.plugin.settings.preserveCleanMarkdown).onChange(i=>c(this,null,function*(){this.plugin.settings.preserveCleanMarkdown=i,yield this.plugin.saveSettings()}))),new u.Setting(t).setName("Insert Date in Frontmatter").setDesc("Automatically insert today's date when creating new notes.").addToggle(n=>n.setValue(this.plugin.settings.insertDateInFrontmatter).onChange(i=>c(this,null,function*(){this.plugin.settings.insertDateInFrontmatter=i,yield this.plugin.saveSettings()})))}};var C=require("obsidian");var $=[{name:"I",format:e=>mt(e).toUpperCase()+"."},{name:"A",format:e=>U(e).toUpperCase()+"."},{name:"1",format:e=>e.toString()+"."},{name:"a",format:e=>U(e).toLowerCase()+"."},{name:"1r",format:e=>e.toString()+"."}];function mt(e){let s=[[1e3,"m"],[900,"cm"],[500,"d"],[400,"cd"],[100,"c"],[90,"xc"],[50,"l"],[40,"xl"],[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]],t="";for(let[n,i]of s)for(;e>=n;)t+=i,e-=n;return t}function U(e){let s="abcdefghijklmnopqrstuvwxyz",t="",n=e-1;for(;n>=0;)t=s[n%26]+t,n=Math.floor(n/26)-1;return t}var G=2;function gt(e){let s=e.match(/^(\s*)/);return s?s[1].length:0}function ft(e,s){let t=s.replace(".","").toLowerCase();return/^[ivxlcdm]+$/.test(t)?0:/[A-Z]/.test(t)?1:/^\d+$/.test(t)?2:/[a-z]/.test(t)?3:0}function ht(e,s){let t=gt(e),n=e.trim();if(!n)return null;let i=n.match(/^(([IVXivx]|[A-Z]|[a-z]|\d+)\.)\s*(.*)$/);if(i){let a=i[1],o=i[3],l=Math.floor(t/G),g=ft(0,a);return{line:s,content:o,indent:t,level:l,originalNumber:bt(a),isOutline:!0,patternIndex:g}}let r=n.match(/^(\d+)\.\s+(.*)$/);return r?{line:s,content:r[2],indent:t,level:0,originalNumber:parseInt(r[1],10),isOutline:!1,patternIndex:2}:null}function bt(e){let s=e.replace(".","").toLowerCase();if(/^[ivxlcdm]+$/.test(s)){let n={i:1,v:5,x:10,l:50,c:100,d:500,m:1e3},i=0;for(let r=0;r<s.length;r++){let a=n[s[r]]||0,o=n[s[r+1]]||0;i+=a<o?-a:a}return i}if(/^[a-z]$/.test(s))return s.charCodeAt(0)-96;let t=parseInt(s,10);return isNaN(t)?1:t}function yt(e){let s=[],t=e.lastLine()+1;for(let n=0;n<t;n++){let i=e.getLine(n),r=ht(i,n);r&&s.push(r)}return s}function O(e,s,t){let n=yt(e);if(n.length===0)return[];let i=-1;for(let o=n.length-1;o>=0;o--)if(n[o].line<=s){i=o;break}if(i===-1)return[];let r=[n[i]],a=t?1:2;for(let o=i+1;o<n.length&&!(n[o].line-n[o-1].line>a);o++)r.push(n[o]);for(let o=i-1;o>=0&&!(n[o+1].line-n[o].line>a);o--)r.unshift(n[o]);return r}function T(e,s,t){let n=e%$.length;return $[n].format(s)+" "+t}function w(e,s,t){if(e.length===0)return t;let n=e.filter(r=>r.level===s);return n.length===0?t:n[n.length-1].originalNumber+1}function P(e){return Math.floor(e/G)}var k=null;function Y(e,s){k&&(k(),k=null);let t=(n,i)=>{if(i!=="context-menu")return;let r=e.workspace.getActiveViewOfType(C.MarkdownView);if(!r)return;let a=r.editor,o=a.getCursor(),l=a.getLine(o.line);if(!(/^\s*([IVXivx]|[A-Z]|[a-z]|\d+)\./.test(l.trim())||/^\s*\d+\.\s/.test(l.trim()))&&i!=="context-menu")return;let h=O(a,o.line,s),x=h.find(f=>f.line===o.line),S=x?x.level:0,L=w(h,S,1),V=n.addItem(f=>f.setTitle("Numbering").setIcon("list").setSection("list"));n.addItem(f=>f.setTitle(`Continue (next: ${L})`).setSection("list").onClick(()=>St(a,h,S,o.line))),n.addItem(f=>f.setTitle("Restart at 1").setSection("list").onClick(()=>K(a,h,S,o.line,1))),n.addItem(f=>f.setSection("list").setTitle("Restart at...").onClick(()=>c(this,null,function*(){let M=yield kt("Restart numbering at:",String(L));if(M){let E=parseInt(M,10);!isNaN(E)&&E>0&&K(a,h,S,o.line,E)}}))),n.addItem(f=>f.setSection("list").setTitle("Renumber Selection").onClick(()=>Tt(a)))};return e.workspace.on("editor-menu",t),k=()=>{let n=e.workspace.evt;n!=null&&n.offContext&&n.off("editor-menu",t),k=null},k}function St(e,s,t,n){let i=s.find(a=>a.line===n);if(!i)return;let r=w(s,t,1);H(e,n,i.indent,t,r,i.content)}function K(e,s,t,n,i){let r=s.find(a=>a.line===n);r&&H(e,n,r.indent,t,i,r.content)}function Tt(e){if(!e.getSelection().trim()){new C.Notice("Select one or more lines first.");return}let t=e.getCursor("from"),n=e.getCursor("to"),i=Math.min(t.line,n.line),r=Math.max(t.line,n.line),a=1,o=[];for(let l=i;l<=r;l++){let g=e.getLine(l),h=g.trim();if(!h){o.push(g);continue}let x=g.match(/^(\s*)/),S=x?x[1]:"",L=P(S.length),V=h.replace(/^([IVXivx]|[A-Z]|[a-z]|\d+)\.\s*/,""),f=S+T(L,a,V);o.push(f),a++}if(e.setLine(i,o.join(`
`)),r>i)for(let l=r;l>=i+1;l--)e.replaceRange("",{line:l,ch:0},{line:l,ch:e.getLine(l).length});new C.Notice(`Renumbered ${a-1} items.`)}function H(e,s,t,n,i,r){let o=" ".repeat(t)+T(n,i,r);e.setLine(s,o)}function kt(e,s){return new Promise(t=>{let n=prompt(e,s);t(n)})}var y=require("obsidian"),p={center:"tpt-titles-center",left:"tpt-titles-left",right:"tpt-titles-right"},m={center:"tpt-headings-center",left:"tpt-headings-left",right:"tpt-headings-right"};function I(e){var t;let s=e.workspace.getActiveViewOfType(y.MarkdownView);return(t=s==null?void 0:s.file)!=null?t:null}function z(e){var r;let s=I(e);if(!s)return{titles:null,headings:null};let t=(r=e.metadataCache.getFileCache(s))==null?void 0:r.frontmatter;if(!t||!t.cssclasses)return{titles:null,headings:null};let n=Array.isArray(t.cssclasses)?t.cssclasses:[t.cssclasses].filter(Boolean),i={titles:null,headings:null};for(let a in p)if(n.includes(p[a])){i.titles=a;break}for(let a in m)if(n.includes(m[a])){i.headings=a;break}return i}function v(e,s,t){let n=I(e);if(!n){new y.Notice("No active note.");return}e.fileManager.processFrontMatter(n,i=>{let r=i.cssclasses;if(!r)r=[s];else if(Array.isArray(r))r=r.filter(a=>!t.includes(a)),r.push(s),r=Array.from(new Set(r));else if(typeof r=="string"){if(t.includes(r))return;r=[r,s]}i.cssclasses=r}),new y.Notice(`${s} applied.`)}function Q(e,s){s({id:"tpt-format-title-center",name:"TPT Format \u2014 Center Title",callback:()=>{let t=z(e),n=[p.center,p.left,p.right];if(t.titles!=="center")v(e,p.center,n);else{let i=I(e);if(!i)return;e.fileManager.processFrontMatter(i,r=>{let a=r.cssclasses;Array.isArray(a)&&(r.cssclasses=a.filter(o=>!p.center.includes(o)))}),new y.Notice("Title alignment reset.")}}}),s({id:"tpt-format-title-left",name:"TPT Format \u2014 Left Title",callback:()=>{let t=[p.center,p.left,p.right];v(e,p.left,t)}}),s({id:"tpt-format-title-right",name:"TPT Format \u2014 Right Title",callback:()=>{let t=[p.center,p.left,p.right];v(e,p.right,t)}}),s({id:"tpt-format-headings-center",name:"TPT Format \u2014 Center Headings",callback:()=>{let t=z(e),n=[m.center,m.left,m.right];if(t.headings!=="center")v(e,m.center,n);else{let i=I(e);if(!i)return;e.fileManager.processFrontMatter(i,r=>{let a=r.cssclasses;Array.isArray(a)&&(r.cssclasses=a.filter(o=>!m.center.includes(o)))}),new y.Notice("Heading alignment reset.")}}}),s({id:"tpt-format-headings-left",name:"TPT Format \u2014 Left Headings",callback:()=>{let t=[m.center,m.left,m.right];v(e,m.left,t)}}),s({id:"tpt-format-headings-right",name:"TPT Format \u2014 Right Headings",callback:()=>{let t=[m.center,m.left,m.right];v(e,m.right,t)}}),s({id:"tpt-format-reset-alignment",name:"TPT Format \u2014 Reset Alignment",callback:()=>{let t=I(e);if(!t){new y.Notice("No active note.");return}e.fileManager.processFrontMatter(t,n=>{let i=n.cssclasses;Array.isArray(i)&&(i=i.filter(r=>![...Object.values(p),...Object.values(m)].includes(r))),n.cssclasses=i}),new y.Notice("All alignment settings cleared.")}})}var vt=`
/* \u2500\u2500\u2500 CALLOUT BOXES IN LIVE PREVIEW \u2500\u2500\u2500 */
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

/* \u2500\u2500\u2500 PAGE BREAK VISUAL \u2500\u2500\u2500 */
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

/* \u2500\u2500\u2500 CSSCLASS STATUS BAR PIllS \u2500\u2500\u2500 */
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

/* \u2500\u2500\u2500 FRONTMATTER TOGGLE (minimal) \u2500\u2500\u2500 */
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
`;function X(){let e="tpt-wysiwyg-styles";if(document.getElementById(e))return;let s=document.createElement("style");s.id=e,s.textContent=vt,document.head.appendChild(s)}function j(){let e=document.getElementById("tpt-wysiwyg-styles");e&&e.remove()}function b(){return new Date().toISOString().slice(0,10)}function q(e){return`---
title:
date: ${b()}
series:
text:
speaker: ${e.defaultSpeaker}
location: ${e.defaultLocation}
bibleversion: ${e.defaultBibleVersion}
type: sermon
status: draft
cssclasses:
  - tpt-sermon
  - tpt-sermon-live
  - tpt-mode-preaching
  - ${e.defaultSermonPalette}
  - tpt-heading-georgia
  - tpt-font-system
  - tpt-scripture-bar
  - tpt-print-sermon
---

# Title

**Text:**
**Thesis:**

---

## Pulpit Outline

### I.

### II.

### III.

---

## Conclusion

**Summary:**

---

## Invitation Drive

---

## Word Study

| Word | Original | Meaning | Use in Text |
|------|----------|---------|-------------|
|      |          |         |             |

---

## Cross-References

| Text | Connection |
|------|------------|
|      |            |
`}function Z(e){return`---
title:
date: ${b()}
series:
text:
speaker: ${e.defaultSpeaker}
location: ${e.defaultLocation}
bibleversion: ${e.defaultBibleVersion}
type: sermon
status: draft
cssclasses:
  - tpt-sermon
  - tpt-sermon-manuscript
  - tpt-mode-manuscript
  - ${e.defaultSermonPalette}
  - tpt-heading-georgia
  - tpt-font-serif
  - tpt-print-sermon
---

# Title

**Text:** | **Series:** | **Date:**

---

## Introduction

*(Opening illustration or hook)*

**Thesis:**

---

## Body

### I. First Point

> [!scripture]
> **Text:**
> *Version:*

*(Exposition)*

*(Application)*

---

### II. Second Point

> [!scripture]
> **Text:**
> *Version:*

*(Exposition)*

*(Application)*

---

### III. Third Point

> [!scripture]
> **Text:**
> *Version:*

*(Exposition)*

*(Application)*

---

## Conclusion

**Summary Statement:**

**Call to Action:**

---

## Invitation Drive

*(Final appeal)*

---

## Word Study

| Word | Original | Meaning | Use in Text |
|------|----------|---------|-------------|
|      |          |         |             |

---

## Cross-References

| Text | Connection |
|------|------------|
|      |            |
`}function J(e){return`---
title:
date: ${b()}
series:
text:
speaker: ${e.defaultSpeaker}
location: ${e.defaultLocation}
bibleversion: ${e.defaultBibleVersion}
type: sermon
status: draft
cssclasses:
  - tpt-sermon
  - tpt-sermon-short
  - tpt-mode-study
  - ${e.defaultSermonPalette}
  - tpt-heading-georgia
  - tpt-font-system
  - tpt-print-sermon
---

# Title

**Text:** **Thesis:**

---

## Outline

1.
2.
3.

---

## Key Verse

> [!scripture]
> **Text:**

---

## Application

---

## Invitation
`}function tt(e){return`---
title:
date: ${b()}
series:
text:
author: ${e.defaultAuthor}
bibleversion: ${e.defaultBibleVersion}
type: workbook-module
status: draft
cssclasses:
  - tpt-workbook
  - tpt-workbook-module
  - tpt-mode-study
  - ${e.defaultWorkbookPalette}
  - tpt-heading-georgia
  - tpt-font-serif
  - tpt-print-workbook
---

# Workbook Module Title

**Series:** | **Lesson:**
**Key Truth:**

---

## Scripture Text

> [!scripture]
> **Text:**
> *Version:*

---

## Lesson Content

---

## Word Study

| Word | Meaning | Importance |
|------|---------|------------|
|      |         |            |

---

## Study Questions

1.
2.
3.
4.
5.

---

## Fill in the Blank

1. ______ is ______.
2. ______ means ______.
3. ______ requires ______.

---

## Journal - Action Step

*What does this truth require of me?*

---

## Discussion Questions

1.
2.
3.
`}function et(e){return`---
title:
date: ${b()}
series:
author: ${e.defaultAuthor}
bibleversion: ${e.defaultBibleVersion}
type: study-guide
status: draft
cssclasses:
  - tpt-workbook
  - tpt-workbook-printable
  - tpt-mode-handout
  - ${e.defaultStudyPalette}
  - tpt-print-workbook
  - tpt-export-pdf-workbook
---

# Study Guide Title

**Series:** | **Lesson:** | **Date:**

---

## Key Scripture

> [!scripture]
> **Text:**

---

## Key Truth

> [!keytruth]

---

## Outline

1.
2.
3.

---

## Study Questions

1.
2.
3.
4.
5.

---

## Fill in the Blank

1. ______ is ______.
2. ______ means ______.

---

## Application

*What must I believe, obey, or practice?*

---

## For Further Study

| Text | Theme |
|------|-------|
|      |       |
`}function nt(e){return`---
title:
date: ${b()}
text:
author: ${e.defaultAuthor}
bibleversion: ${e.defaultBibleVersion}
type: inductive-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-inductive
  - tpt-mode-study
  - ${e.defaultStudyPalette}
  - tpt-scripture-study
  - tpt-print-study
---

# Inductive Study - Title

**Text:** | **Version:**

---

## Observation
*What does the text say?*

1.
2.
3.

---

## Interpretation
*What does the text mean?*

1.
2.
3.

---

## Application
*What must I believe, obey, correct, or practice?*

1.
2.
3.

---

## Key Words

| Word | Meaning | Importance |
|------|---------|------------|
|      |         |            |

---

## Cross-References

| Text | Connection |
|------|------------|
|      |            |

---

## Discussion Questions

1.
2.
3.
`}function it(e){return`---
title:
date: ${b()}
text:
author: ${e.defaultAuthor}
bibleversion: ${e.defaultBibleVersion}
type: verse-by-verse-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-versebyverse
  - tpt-mode-study
  - ${e.defaultStudyPalette}
  - tpt-scripture-bar
  - tpt-print-study
---

# Verse-by-Verse Study - Title

**Text:** | **Version:**

---

## Verse Analysis

> [!scripture]
> **v.1:**

*Notes:*

---

> [!scripture]
> **v.2:**

*Notes:*

---

## Word Studies

| Word | Original | Meaning | Use in Context |
|------|----------|---------|----------------|
|      |          |         |                |

---

## Discussion Questions

1.
2.
3.
`}function st(e){return`---
title:
date: ${b()}
author: ${e.defaultAuthor}
bibleversion: ${e.defaultBibleVersion}
type: topical-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-topical
  - tpt-mode-study
  - ${e.defaultStudyPalette}
  - tpt-scripture-study
  - tpt-print-study
---

# Topical Study - Title

**Topic:**

---

## Key Texts

| Text | Contribution |
|------|--------------|
|      |              |

---

## Biblical Claims

1.
2.
3.

---

## Common Misuses / Errors

1.
2.
3.

---

## Discussion Questions

1.
2.
3.
`}function rt(e){return`---
title:
date: ${b()}
text:
author: ${e.defaultAuthor}
bibleversion: ${e.defaultBibleVersion}
type: expository-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-expository
  - tpt-mode-study
  - ${e.defaultStudyPalette}
  - tpt-scripture-manuscript
  - tpt-print-study
---

# Expository Study - Title

**Text:** | **Version:**

---

## Passage

> [!scripture]
> *(Paste full passage here)*

---

## Context

*(Historical, literary, grammatical)*

---

## Exposition

*(Section by section commentary)*

---

## Theological Significance

---

## Application

1.
2.
3.

---

## Discussion Questions

1.
2.
3.
`}function ot(e){return`---
title:
date: ${b()}
author: ${e.defaultAuthor}
bibleversion: ${e.defaultBibleVersion}
type: doctrinal-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-doctrinal
  - tpt-mode-study
  - ${e.defaultStudyPalette}
  - tpt-scripture-study
  - tpt-wordstudy-academic
  - tpt-print-study
---

# Doctrinal Study - Title

**Doctrine:**

---

## Primary Texts

| Text | Teaching |
|------|----------|
|      |          |

---

## Word Study

| Word | Original | Meaning | Doctrinal Importance |
|------|----------|---------|----------------------|
|      |          |         |                      |

---

## Scripture Comparison

| Text | Claim | Application |
|------|-------|-------------|
|      |       |             |

---

## Biblical Claims

1.
2.
3.

---

## Discussion Questions

1.
2.
3.
`}var _=class extends d.Plugin{constructor(){super(...arguments);this.numberingCleanup=null}onload(){return c(this,null,function*(){yield this.loadSettings(),this.addSettingTab(new A(this.app,this)),this.applyNumberingSettings(),Q(this.app,t=>this.addCommand(t)),X(),this.addCommand({id:"tpt-sermon-live-preaching",name:"TPT Sermon \u2014 New Live Preaching Outline",callback:()=>{this.openNote(q(this.settings)),new d.Notice("Live Preaching Outline created.")}}),this.addCommand({id:"tpt-sermon-manuscript",name:"TPT Sermon \u2014 New Full Manuscript",callback:()=>{this.openNote(Z(this.settings)),new d.Notice("Full Sermon Manuscript created.")}}),this.addCommand({id:"tpt-sermon-short-outline",name:"TPT Sermon \u2014 New Short Sermon Outline",callback:()=>{this.openNote(J(this.settings)),new d.Notice("Short Sermon Outline created.")}}),this.addCommand({id:"tpt-workbook-module",name:"TPT Workbook \u2014 New Module",callback:()=>{this.openNote(tt(this.settings)),new d.Notice("Workbook Module created.")}}),this.addCommand({id:"tpt-workbook-study-guide",name:"TPT Workbook \u2014 New Two-Page Study Guide",callback:()=>{this.openNote(et(this.settings)),new d.Notice("Two-Page Study Guide created.")}}),this.addCommand({id:"tpt-study-inductive",name:"TPT Study \u2014 New Inductive Study",callback:()=>{this.openNote(nt(this.settings)),new d.Notice("Inductive Study created.")}}),this.addCommand({id:"tpt-study-versebyverse",name:"TPT Study \u2014 New Verse-by-Verse Study",callback:()=>{this.openNote(it(this.settings)),new d.Notice("Verse-by-Verse Study created.")}}),this.addCommand({id:"tpt-study-topical",name:"TPT Study \u2014 New Topical Study",callback:()=>{this.openNote(st(this.settings)),new d.Notice("Topical Study created.")}}),this.addCommand({id:"tpt-study-expository",name:"TPT Study \u2014 New Expository Study",callback:()=>{this.openNote(rt(this.settings)),new d.Notice("Expository Study created.")}}),this.addCommand({id:"tpt-study-doctrinal",name:"TPT Study \u2014 New Doctrinal Study",callback:()=>{this.openNote(ot(this.settings)),new d.Notice("Doctrinal Study created.")}}),this.addCommand({id:"tpt-insert-scripture",name:"TPT Sermon \u2014 Insert Scripture Block",editorCallback:t=>{t.replaceSelection(`> [!scripture]
> **Text:** 
> *Version:*

`)}}),this.addCommand({id:"tpt-insert-word-study",name:"TPT Sermon \u2014 Insert Word Study Box",editorCallback:t=>{t.replaceSelection(`| Word | Original | Meaning | Use in Text |
|------|----------|---------|-------------|
| | | | |

`)}}),this.addCommand({id:"tpt-insert-invitation",name:"TPT Sermon \u2014 Insert Invitation Drive",editorCallback:t=>{t.replaceSelection(`## Conclusion

**Summary Statement:**

**Call to Action:**

**Invitation Drive:**

> *...*`)}}),this.addCommand({id:"tpt-insert-keypoint",name:"TPT Sermon \u2014 Insert Key Point Block",editorCallback:t=>{t.replaceSelection(`> [!keypoint]
> **Main Point:**

`)}}),this.addCommand({id:"tpt-insert-illustration",name:"TPT Sermon \u2014 Insert Illustration Block",editorCallback:t=>{t.replaceSelection(`> [!illustration]
> **Story/Illustration:**

`)}}),this.addCommand({id:"tpt-insert-cross-reference",name:"TPT Sermon \u2014 Insert Cross-Reference Box",editorCallback:t=>{t.replaceSelection(`| Text | Connection |
|------|------------|
| | |
| | |

`)}}),this.addCommand({id:"tpt-print-sermon-profile",name:"TPT Export \u2014 Apply Sermon Print Profile",callback:()=>this.applyProfile(["tpt-sermon","tpt-print-sermon","tpt-export-pdf-sermon"])}),this.addCommand({id:"tpt-print-study-profile",name:"TPT Export \u2014 Apply Study Guide Print Profile",callback:()=>this.applyProfile(["tpt-study","tpt-print-study","tpt-export-pdf-study"])}),this.addCommand({id:"tpt-print-workbook-profile",name:"TPT Export \u2014 Apply Workbook Print Profile",callback:()=>this.applyProfile(["tpt-workbook","tpt-print-workbook","tpt-export-pdf-workbook"])}),this.addCommand({id:"tpt-print-friendly",name:"TPT Export \u2014 Apply Print-Friendly Mode",callback:()=>this.applyProfile(["tpt-print-minimal"])}),this.addCommand({id:"tpt-print-bw",name:"TPT Export \u2014 Apply Black & White Print Mode",callback:()=>this.applyProfile(["tpt-print-bw"])}),this.addCommand({id:"tpt-insert-page-break",name:"TPT Export \u2014 Insert Page Break",editorCallback:t=>{t.replaceSelection(`
<div class="page-break"></div>
`)}}),this.addCommand({id:"tpt-number-continue",name:"TPT Numbering \u2014 Continue Sequence",editorCallback:()=>{var l,g,h;let t=this.app.workspace.getActiveViewOfType(d.MarkdownView);if(!t)return;let n=O(t.editor,t.editor.getCursor().line,this.settings.blankLinePreservesList),i=P((h=(g=(l=t.editor.getLine(t.editor.getCursor().line).match(/^(\s*)/))==null?void 0:l[1])==null?void 0:g.length)!=null?h:0),r=w(n,i,1),o=t.editor.getLine(t.editor.getCursor().line).match(/^(\s*)([IVXivx]|[A-Z]|[a-z]|\d+)\.\s*(.*)$/);o&&t.editor.setLine(t.editor.getCursor().line,o[1]+T(i,r,o[3]))}}),this.addCommand({id:"tpt-number-restart-1",name:"TPT Numbering \u2014 Restart at 1",editorCallback:()=>{let t=this.app.workspace.getActiveViewOfType(d.MarkdownView);if(!t)return;let i=t.editor.getLine(t.editor.getCursor().line).match(/^(\s*)([IVXivx]|[A-Z]|[a-z]|\d+)\.\s*(.*)$/);if(i){let r=P(i[1].length);t.editor.setLine(t.editor.getCursor().line,i[1]+T(r,1,i[3]))}}}),this.addCommand({id:"tpt-insert-page-break",name:"TPT Export \u2014 Insert Page Break",editorCallback:t=>{t.replaceSelection(`
<div class="page-break"></div>
`)}}),this.addCommand({id:"tpt-insert-lesson-section",name:"TPT Workbook \u2014 Insert Lesson Section",editorCallback:t=>{t.replaceSelection(`## Lesson Title

**Key Truth:**

**Scripture:**

---

`)}}),this.addCommand({id:"tpt-insert-key-truth",name:"TPT Workbook \u2014 Insert Key Truth Block",editorCallback:t=>{t.replaceSelection(`> [!keytruth]
> **Key Truth:**

`)}}),this.addCommand({id:"tpt-insert-oia-block",name:"TPT Study \u2014 Insert Observation/Interpretation/Application",editorCallback:t=>{t.replaceSelection(`### Observation
*What does the text say?*
1.
2.
3.

### Interpretation
*What does the text mean?*
1.
2.
3.

### Application
*What must I believe, obey, correct, or practice?*
1.
2.
3.

`)}}),this.addCommand({id:"tpt-insert-discussion-questions",name:"TPT Study \u2014 Insert Discussion Questions",editorCallback:t=>{t.replaceSelection(`### Discussion Questions

1.
2.
3.

`)}}),this.addCommand({id:"tpt-insert-page-break",name:"TPT Export \u2014 Insert Page Break",editorCallback:t=>{t.replaceSelection(`
<div class="page-break"></div>
`)}}),console.log("The Preacher's Tool v2.0 loaded.")})}onunload(){j(),console.log("The Preacher's Tool unloaded.")}loadSettings(){return c(this,null,function*(){let t=yield this.loadData();this.settings=D(D({},W),t)})}saveSettings(){return c(this,null,function*(){yield this.saveData(this.settings)})}applyNumberingSettings(){this.numberingCleanup&&this.numberingCleanup(),this.numberingCleanup=Y(this.app,this.settings.blankLinePreservesList)}openNote(t){let n=this.app.workspace.getActiveViewOfType(d.MarkdownView);n&&n.editor.setValue(t)}applyProfile(t){return c(this,null,function*(){let n=this.app.workspace.getActiveFile();if(!n){new d.Notice("No active file.");return}yield this.app.fileManager.processFrontMatter(n,i=>{var o;let r=(o=i.cssclasses)!=null?o:[],a=Array.isArray(r)?[...r]:[r].filter(Boolean);for(let l of t)a.includes(l)||a.push(l);i.cssclasses=a}),new d.Notice(t.join(", ")+" applied.")})}};0&&(module.exports={});
