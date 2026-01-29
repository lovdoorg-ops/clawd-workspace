# Blog Content System

Three sites, three voices, one source (TikTok trends reports).

```
blogs/
├── lebensgunst/     ← Pushy wellness editorial (start here)
├── rivoara/         ← Conservative, German-law compliant
└── duschfilter/     ← Direct SEO, comparison content
```

## Workflow

1. **Trends report** comes in from TikTok cron
2. **Each site's cron** picks up the report
3. **Generates blog research/draft** following site's BLUEPRINT.md
4. **Stores in site folder** for review

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
