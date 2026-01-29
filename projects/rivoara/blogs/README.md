# Blog Content System

Three sites, three voices, one source (TikTok trends reports).

```
blogs/
├── workflows/
│   └── blog-pipeline.md      ← Full pipeline documentation
├── lebensgunst/
│   ├── BLUEPRINT.md
│   ├── voice-guide.md
│   ├── blog-post-guide.md
│   ├── briefings/            ← Ideation output (detailed briefs)
│   └── drafts/               ← Draft output (full posts)
├── rivoara/
│   ├── BLUEPRINT.md
│   ├── briefings/
│   └── drafts/
└── duschfilter/
    ├── BLUEPRINT.md
    ├── briefings/
    └── drafts/
```

## Workflow

See [/root/clawd/workflows/blog-pipeline.md](/root/clawd/workflows/blog-pipeline.md) for full documentation.

```
Trends Report → Ideation Cron → Briefings → Draft Cron → Drafts
```

1. **TikTok trends cron** scouts and saves report
2. **Ideation cron** generates ideas, scores, selects S-tier, creates briefings
3. **Draft cron** takes briefings, creates full drafts following BLUEPRINT.md
4. **Manual review** before publish

## Site Comparison

| Site | Voice | Compliance | Goal |
|------|-------|------------|------|
| lebensgunst.de | Editorial, pushy | Flexible | Warm up audience to shower filters |
| rivoara.com | Premium, conservative | Strict (German law) | Brand authority, safe claims |
| duschfilter.com | Direct, SEO-focused | Moderate | Capture intent traffic |

## Status

- [x] Folder structure created
- [x] lebensgunst BLUEPRINT.md defined
- [ ] rivoara BLUEPRINT.md (pending)
- [ ] duschfilter BLUEPRINT.md (pending)
- [ ] Cron jobs configured
