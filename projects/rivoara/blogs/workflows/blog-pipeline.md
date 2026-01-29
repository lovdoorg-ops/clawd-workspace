# Blog Content Pipeline

> Automated workflow: TikTok trends → Blog post drafts

---

## Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  TRENDS REPORT  │────▶│  CRON 1:        │────▶│  CRON 2:        │
│  (TikTok scout) │     │  Ideation       │     │  Draft          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                        │
                               ▼                        ▼
                        briefings/               drafts/
```

---

## Stage 1: Ideation Cron

**Input:** TikTok trends report (`trend-reports/YYYY-MM-DD.md`)

**Process:**
1. Read trends report
2. Generate multiple blog post ideas
3. Score each idea (S/A/B tier)
4. Select top 1-2 S-tier ideas
5. Create detailed briefing for each

**Output:** Briefing file in `briefings/` folder

### Scoring Criteria

| Criteria | Weight | Description |
|----------|--------|-------------|
| Search potential | High | Will people Google this? |
| Emotional pain | High | Frustration = engagement |
| Water connection | High | Natural fit, not forced |
| Hijack value | Medium | Expensive product = motivated buyer |
| Competition | Medium | Can we rank for this? |
| Trending momentum | Medium | TikTok engagement signals |

### Idea Brief Format (internal)

```markdown
## [Title Idea]

**Hijack:** [Product/trend]
**Keywords:** primary, secondary, long-tail
**Hook:** "Du hast..." [opening]
**Water angle:** [Connection]
**Score:** S / A / B
**Why:** [Reasoning]
```

---

## Stage 2: Briefing Output

The selected S-tier idea becomes a detailed briefing.

### Briefing Format

```markdown
# Blog Briefing: [Title]

**Generated:** YYYY-MM-DD
**Site:** lebensgunst.de | rivoara.com | duschfilter.com
**Status:** ready-for-draft
**Source trend:** [link to trend report]

---

## Core Concept

**Hijack target:** [Product/trend being hijacked]
**Water angle:** [How hard water connects - must be natural, not forced]
**Target reader:** [Who they are, what they're feeling, what they've tried]
**Search intent:** [What they're Googling, why]

---

## SEO

**Primary keyword:** [main target]
**Secondary keywords:** [3-5 related terms]
**Long-tail opportunities:** [question-based queries]
**Competitor content:** [what exists, how we're different]

---

## Hook

[Opening 2-3 sentences, ready to use. Must follow voice guide.]

Example:
> Du hast es getan. 500 Euro. Der [Product]. Und trotzdem: [Problem].

---

## Outline

1. **[Section title]**
   - Key point
   - Key point
   
2. **[Section title]**
   - Key point
   - Key point

[... 8-12 sections following BLUEPRINT.md structure]

---

## Key Points to Hit

- [ ] [Specific fact/statistic with number]
- [ ] [Emotional beat to include]
- [ ] [Product/brand to mention by name]
- [ ] [Water hardness data point]
- [ ] [Comparison or analogy]

---

## Examples & Analogies

- [Specific analogy to use]
- [Before/after comparison]
- [Relatable scenario]

---

## Internal Links

- [Related lebensgunst post to link]
- [Other cluster content]

---

## Differentiators

What makes this post unique vs existing content:
- [Unique angle 1]
- [Unique angle 2]
- [Different examples than other posts]

---

## Why S-Tier

[Detailed reasoning for why this idea was selected]

- Search volume signal: [evidence]
- Pain level: [evidence from comments/trends]
- Conversion potential: [why they'll want a filter]
```

---

## Stage 3: Draft Cron

**Input:** Briefing file from `briefings/` with `status: ready-for-draft`

**Process:**
1. Read briefing
2. Read site's BLUEPRINT.md for voice/structure rules
3. Generate full draft following all guidelines
4. Run pre-publish checklist
5. Save to `drafts/`

**Output:** Complete draft in `drafts/YYYY-MM-DD-[slug].md`

### Draft Output Format

```markdown
# [Title]

**Source briefing:** [link]
**Generated:** YYYY-MM-DD
**Status:** draft | review | approved
**Word count:** [X]

---

[Full article content following BLUEPRINT.md]

---

## Pre-Publish Checklist

- [ ] Keine `–` im Text (nur `-`)
- [ ] TL;DR nach Intro vorhanden
- [ ] Inhaltsverzeichnis vorhanden
- [ ] FAQ-Section vorhanden
- [ ] Duschfilter prominent positioniert
- [ ] "Wann zum Arzt" Section vorhanden
- [ ] Interne Links gesetzt
- [ ] Kurze Sätze durchgehend
- [ ] "Du" statt "man"

---

## SEO Meta

**Title tag:** [max 60 chars]
**Meta description:** [max 155 chars]
**Slug:** [url-friendly]
```

---

## Folder Structure

```
blogs/
├── workflows/
│   └── blog-pipeline.md      ← this file
├── lebensgunst/
│   ├── BLUEPRINT.md
│   ├── voice-guide.md
│   ├── blog-post-guide.md
│   ├── briefings/            ← Stage 2 output
│   └── drafts/               ← Stage 3 output
├── rivoara/
│   ├── BLUEPRINT.md
│   ├── briefings/
│   └── drafts/
└── duschfilter/
    ├── BLUEPRINT.md
    ├── briefings/
    └── drafts/
```

---

## Cron Schedule (proposed)

| Cron | Schedule | Description |
|------|----------|-------------|
| TikTok trends | Daily 15:00 UTC | Scout trends, save report |
| Ideation | Daily 16:00 UTC | Process trends → briefings |
| Draft | On-demand / Daily 17:00 UTC | Briefings → drafts |

---

## Status Flow

```
trend-report → [ideation cron] → briefing (ready-for-draft)
                                      ↓
                               [draft cron]
                                      ↓
                               draft (review)
                                      ↓
                               [manual review]
                                      ↓
                               draft (approved) → publish
```

---

## Notes

- Start with lebensgunst only
- Add rivoara/duschfilter once lebensgunst pipeline is stable
- Each site reads its own BLUEPRINT.md for voice/rules
- Briefings are the quality gate - detailed briefing = good draft
