# Cron Jobs

Active scheduled tasks managed by Clawdbot. All task jobs run in **isolated sessions** — they don't touch main session context.

## Schedule (UTC)

| Schedule | Job | Session | Target Group |
|----------|-----|---------|--------------|
| 00:05 | daily-memory-init | isolated | — |
| Every 3h | wg-gesucht-inbox | isolated | g-cata-dani |
| 11:00 | tiktok-rivoara-warmup | isolated | g-forelox-cult |
| 14:00 | wg-gesucht-search | isolated | g-cata-dani |
| 15:00 | tiktok-rivoara-trends | isolated | g-forelox-cult |
| 16:00 | lebensgunst-blog-ideation | isolated | — |
| 17:00 | lebensgunst-blog-draft | isolated | — |
| Various | valentines-nudge-* | main | Direct to Cata |

---

## Job Details

### daily-memory-init
- **ID:** `4d123f89-1907-4f20-8402-4bc506b41472`
- **Schedule:** `5 0 * * *` (00:05 UTC daily)
- **Session:** isolated
- **Task:** Create `/root/clawd/memory/YYYY-MM-DD.md` if it doesn't exist. Ensures I always have a memory file for the day.

### wg-gesucht-inbox
- **ID:** `07898ab0-1155-4942-aef1-779c1be5802d`
- **Schedule:** `0 */3 * * *` (every 3 hours)
- **Session:** isolated
- **Target:** WhatsApp group g-cata-dani (`120363213979130244@g.us`)
- **Task:** Check WG-Gesucht INBOX + UPDATE POST. Use browser (port 9222).

  **Sub-tasks:**
  1. **CHECK INBOX:** Go to https://www.wg-gesucht.de/nachrichten.html - check for new messages. Before reporting, read /root/clawd/projects/wg-gesucht/history.json. Only report NEW/unread messages.
  2. **BUMP POST:** Go to my active listing and click 'Gesuch aktualisieren' to push it back to top of search results.

  Context: Vienna apartment, move-in March 15 - April 1, 2026.

### tiktok-rivoara-warmup
- **ID:** `c1faf666-5c3e-4cd0-864f-de1b801ed2e5`
- **Schedule:** `0 11 * * *` (11:00 UTC daily)
- **Session:** isolated
- **Target:** WhatsApp group g-forelox-cult (`120363422731792463@g.us`)
- **Task:** TikTok session for Rivoara (Germany). Use browser (port 9222).

  **Sub-tasks:**
  1. **WARMUP:** Scroll For You page 10-15 min, watch videos fully, like good content, follow 1-2 German beauty creators
  2. **SCOUT TRENDS:** Find viral formats, hooks, sounds for Rivoara content
  3. **SCOUT INFLUENCERS:** Look for product seeding candidates (500-5k followers ideal, German/DACH preferred)

  For promising candidates, add to `/root/clawd/projects/rivoara/influencer-prospects.md`

### wg-gesucht-search
- **ID:** `6fe85261-ace4-434a-8590-166dc025f7e3`
- **Schedule:** `0 14 * * *` (14:00 UTC daily)
- **Session:** isolated
- **Target:** WhatsApp group g-cata-dani (`120363213979130244@g.us`)
- **Task:** SEARCH for new apartments on WG-Gesucht Vienna. Use browser (port 9222) to search Zwischenmiete listings. Only report NEW listings matching March 15 - April 1, 2026 move-in.

### tiktok-rivoara-trends
- **ID:** `854a9b29-d0dd-4ac2-9830-bda9fafa0f45`
- **Schedule:** `0 15 * * *` (15:00 UTC daily)
- **Session:** isolated
- **Target:** WhatsApp group g-forelox-cult (`120363422731792463@g.us`)
- **Browser:** profile "clawd" (port 9222)
- **Approach:** Systems thinking — map causal loops between symptoms (hair damage, skin issues, product frustration, relocation) and water quality. Hunt for **nuanced connections** and **subtle desires** in comments, not direct shower filter content.
- **Output:** Max 2 trends/day. Only report genuine creative opportunities with real Rivoara angles. Send NOTHING if no nuanced connection found.

### lebensgunst-blog-ideation
- **ID:** `7bb5b4ba-7adb-4145-8177-38fb69e01924`
- **Schedule:** `0 16 * * *` (16:00 UTC daily)
- **Session:** isolated
- **Target:** — (internal processing, no WhatsApp)
- **Task:** Generate blog post ideas from TikTok trends for lebensgunst.de

  **Process:**
  1. List all trend reports in `/root/clawd/projects/rivoara/trend-reports/`
  2. Compare against `state.json processedTrends` to find unprocessed
  3. Generate 3-5 blog post ideas with hijack angle
  4. Score each (S/A/B tier) and select top S-tier
  5. Create detailed briefing following `/root/clawd/workflows/blog-pipeline.md`
  6. Save to `briefings/`, update `state.json`, git commit & push

  **State:** `/root/clawd/projects/rivoara/blogs/lebensgunst/state.json`

### lebensgunst-blog-draft
- **ID:** `03d4a46e-19db-4574-a6f4-071a28ca26e5`
- **Schedule:** `0 17 * * *` (17:00 UTC daily)
- **Session:** isolated
- **Target:** — (internal processing, no WhatsApp)
- **Task:** Create full blog draft from briefing for lebensgunst.de

  **Process:**
  1. Find briefings with status `ready-for-draft` in `state.json`
  2. Read briefing + source trend report
  3. Read all guides in `/root/clawd/projects/rivoara/blogs/lebensgunst/`
  4. Generate full draft following guides exactly
  5. Save to `drafts/`, update `state.json` status to `drafted`, git commit & push

  **Guides:** BLUEPRINT.md, voice-guide.md, blog-post-guide.md

### Valentine's Nudges
- **Session:** main (personal reminders)
- **Schedule:** Jan 28, Jan 31, Feb 3, Feb 7, Feb 10, Feb 12
- **Task:** Remind Cata to book Valentine's Day dinner for Your Amazonic Queen

---

## WhatsApp Groups

| Alias | JID | Purpose |
|-------|-----|---------|
| g-cata-dani | `120363213979130244@g.us` | Cata + Dani (apartment search) |
| g-forelox-cult | `120363422731792463@g.us` | Forelox team (Rivoara TikTok) |

---

## Notes

- All task jobs use **isolated sessions** — fresh context each run, no main session pollution
- Browser on port 9222 (noVNC Chrome instance)
- History tracking in `projects/<project>/history.json`
- To manually trigger: `clawdbot cron run <jobId> --force`
