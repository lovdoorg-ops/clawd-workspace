# Cron Jobs

Active scheduled tasks managed by Clawdbot. All task jobs run in **isolated sessions** — they don't touch main session context.

## Schedule (UTC)

| Schedule | Job | Session | Target Group |
|----------|-----|---------|--------------|
| Every 3h | wg-gesucht-inbox | isolated | g-cata-dani |
| 11:00 | tiktok-rivoara-warmup | isolated | g-forelox-cult |
| 14:00 | wg-gesucht-search | isolated | g-cata-dani |
| 15:00 | tiktok-rivoara-trends | isolated | g-forelox-cult |
| Various | valentines-nudge-* | main | Direct to Cata |

---

## Job Details

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
