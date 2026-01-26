# Cron Jobs

Active scheduled tasks managed by Clawdbot.

## Daily Schedule (UTC)

| Time | Job | Target Group | Description |
|------|-----|--------------|-------------|
| 09:00 | wg-gesucht-inbox | g-cata-dani | Check WG-Gesucht messages |
| 10:00 | instagram-veddelholzer-daily | g-cata-dani | Check Instagram DMs |
| 11:00 | tiktok-rivoara-warmup | g-forelox-cult | TikTok warmup + influencer scouting |
| 14:00 | wg-gesucht-search | g-cata-dani | Search new Vienna apartments |

---

## Job Details

### wg-gesucht-inbox
- **ID:** `07898ab0-1155-4942-aef1-779c1be5802d`
- **Schedule:** `0 9 * * *` (09:00 UTC daily)
- **Target:** WhatsApp group g-cata-dani (`120363213979130244@g.us`)
- **Task:** Check WG-Gesucht INBOX for new messages. Use browser (port 9222) to check https://www.wg-gesucht.de/nachrichten.html. Before reporting, read /root/clawd/projects/wg-gesucht/history.json to see what's already been sent. Only report NEW/unread messages. After checking, update history.json with seen message IDs. Context: Vienna apartment, move-in March 15 - April 1, 2026.

### instagram-veddelholzer-daily
- **ID:** `941d4433-1885-45da-84e9-016dc5c286e1`
- **Schedule:** `0 10 * * *` (10:00 UTC daily)
- **Target:** WhatsApp group g-cata-dani (`120363213979130244@g.us`)
- **Task:** Check Instagram DMs for veddelholzer.com. Use browser (port 9222) to check https://www.instagram.com/direct/inbox/. Before reporting, read /root/clawd/projects/instagram-veddelholzer/history.json - only report NEW messages/requests. Look for collaboration inquiries, people interested in product packages for content. After checking, update history.json with seen conversation IDs.

### tiktok-rivoara-warmup
- **ID:** `c1faf666-5c3e-4cd0-864f-de1b801ed2e5`
- **Schedule:** `0 11 * * *` (11:00 UTC daily)
- **Target:** WhatsApp group g-forelox-cult (`120363422731792463@g.us`)
- **Task:** TikTok session for Rivoara (Germany). Use browser (port 9222) to open https://www.tiktok.com. Scroll For You page for 10-15 minutes focusing on GERMAN beauty/skincare content.

  **Sub-tasks:**
  1. **WARMUP:** Watch videos fully, like good content, follow 1-2 German beauty creators
  2. **SCOUT TRENDS:** Find viral formats, hooks, trends for Rivoara content (shower filters, skincare, hair care)
  3. **SCOUT INFLUENCERS:** Look for product seeding candidates:
     - Aesthetic young women with GOOD HAIR AND SKIN
     - Beauty-focused content (skincare, haircare, routines, GRWM)
     - Quality content potential (matters more than followers)
     - **SMALLER ACCOUNTS PREFERRED (500-5k ideal)** — more likely to accept free product
     - 5k+ often expect money, skip unless exceptional
     - German/DACH preferred

  For promising candidates, add to `/root/clawd/projects/rivoara/influencer-prospects.md`

  Target keywords: German beauty, skincare, Duschfilter, Hautpflege, Haarpflege, GRWM, self-care, bathroom routine.

### wg-gesucht-search
- **ID:** `6fe85261-ace4-434a-8590-166dc025f7e3`
- **Schedule:** `0 14 * * *` (14:00 UTC daily)
- **Target:** WhatsApp group g-cata-dani (`120363213979130244@g.us`)
- **Task:** SEARCH for new apartments on WG-Gesucht Vienna. Use browser (port 9222) to search https://www.wg-gesucht.de/wohnungen-in-Wien.96.2.1.0.html (Zwischenmiete). Before reporting, read /root/clawd/projects/wg-gesucht/history.json - only report NEW listings not in seenListings. Check availability dates match March 15 - April 1, 2026. After checking, update history.json with new listing IDs.

---

## WhatsApp Groups

| Alias | JID | Members |
|-------|-----|---------|
| g-cata-dani | `120363213979130244@g.us` | Cata + Dani |
| g-forelox-cult | `120363422731792463@g.us` | Forelox team (Rivoara) |

---

## Notes

- All jobs use browser on port 9222 (noVNC Chrome instance)
- History tracking in `projects/<project>/history.json`
- Jobs wake via `next-heartbeat` mode
- To manually trigger: use `cron run` with job ID
