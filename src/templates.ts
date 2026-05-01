import { TPTSettings } from "./settings";
function d() { return new Date().toISOString().slice(0, 10); }

export function SERMON_LIVE_PREACHING(s: TPTSettings): string { return `---
title:
date: ${d()}
series:
text:
speaker: ${s.defaultSpeaker}
location: ${s.defaultLocation}
bibleversion: ${s.defaultBibleVersion}
type: sermon
status: draft
cssclasses:
  - tpt-sermon
  - tpt-sermon-live
  - tpt-mode-preaching
  - ${s.defaultSermonPalette}
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
`; }
export function SERMON_MANUSCRIPT(s: TPTSettings): string { return `---
title:
date: ${d()}
series:
text:
speaker: ${s.defaultSpeaker}
location: ${s.defaultLocation}
bibleversion: ${s.defaultBibleVersion}
type: sermon
status: draft
cssclasses:
  - tpt-sermon
  - tpt-sermon-manuscript
  - tpt-mode-manuscript
  - ${s.defaultSermonPalette}
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
`; }
export function SERMON_SHORT_OUTLINE(s: TPTSettings): string { return `---
title:
date: ${d()}
series:
text:
speaker: ${s.defaultSpeaker}
location: ${s.defaultLocation}
bibleversion: ${s.defaultBibleVersion}
type: sermon
status: draft
cssclasses:
  - tpt-sermon
  - tpt-sermon-short
  - tpt-mode-study
  - ${s.defaultSermonPalette}
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
`; }
export function WORKBOOK_MODULE(s: TPTSettings): string { return `---
title:
date: ${d()}
series:
text:
author: ${s.defaultAuthor}
bibleversion: ${s.defaultBibleVersion}
type: workbook-module
status: draft
cssclasses:
  - tpt-workbook
  - tpt-workbook-module
  - tpt-mode-study
  - ${s.defaultWorkbookPalette}
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
`; }
export function WORKBOOK_STUDY_GUIDE(s: TPTSettings): string { return `---
title:
date: ${d()}
series:
author: ${s.defaultAuthor}
bibleversion: ${s.defaultBibleVersion}
type: study-guide
status: draft
cssclasses:
  - tpt-workbook
  - tpt-workbook-printable
  - tpt-mode-handout
  - ${s.defaultStudyPalette}
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
`; }
export function STUDY_INDUCTIVE(s: TPTSettings): string { return `---
title:
date: ${d()}
text:
author: ${s.defaultAuthor}
bibleversion: ${s.defaultBibleVersion}
type: inductive-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-inductive
  - tpt-mode-study
  - ${s.defaultStudyPalette}
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
`; }
export function STUDY_VERSE_BY_VERSE(s: TPTSettings): string { return `---
title:
date: ${d()}
text:
author: ${s.defaultAuthor}
bibleversion: ${s.defaultBibleVersion}
type: verse-by-verse-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-versebyverse
  - tpt-mode-study
  - ${s.defaultStudyPalette}
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
`; }
export function STUDY_TOPICAL(s: TPTSettings): string { return `---
title:
date: ${d()}
author: ${s.defaultAuthor}
bibleversion: ${s.defaultBibleVersion}
type: topical-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-topical
  - tpt-mode-study
  - ${s.defaultStudyPalette}
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
`; }
export function STUDY_EXPOSITORY(s: TPTSettings): string { return `---
title:
date: ${d()}
text:
author: ${s.defaultAuthor}
bibleversion: ${s.defaultBibleVersion}
type: expository-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-expository
  - tpt-mode-study
  - ${s.defaultStudyPalette}
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
`; }
export function STUDY_DOCTRINAL(s: TPTSettings): string { return `---
title:
date: ${d()}
author: ${s.defaultAuthor}
bibleversion: ${s.defaultBibleVersion}
type: doctrinal-study
status: draft
cssclasses:
  - tpt-study
  - tpt-study-doctrinal
  - tpt-mode-study
  - ${s.defaultStudyPalette}
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
`; }
