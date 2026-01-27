# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

---

## Connected Services

| Service | CLI | Account | Status |
|---------|-----|---------|--------|
| **GitHub** | `gh` | C4T4 | ✅ Ready |
| **Railway** | `railway` | cata.waack@gmail.com | ✅ Ready |
| **Vercel** | `vercel` | c4t4 | ✅ Ready |
| **WhatsApp** | Clawdbot | +1 786 727 6503 | ✅ Linked |

### GitHub
- SSH key added: `~/.ssh/id_ed25519.pub`
- Can create repos, manage issues/PRs, use API
- Workspace repo: https://github.com/C4T4/clawd-workspace (private)

### Railway
- Deploy apps, databases, services
- `railway up` to deploy

### Vercel
- Static sites, Next.js, landing pages
- `vercel` to deploy, `vercel --prod` for production

### WhatsApp
- selfChatMode enabled — use self-chat as relay
- In groups: say "clawd" to trigger
- Owner: +17867276503

---

## SSH Keys
- `~/.ssh/id_ed25519` — ed25519 key for GitHub (clawd@clawdbot)

---

## Browser Sessions (via noVNC)

Logged-in accounts available in the remote browser:

| Service | Account | Purpose |
|---------|---------|---------|
| **Google** | lovdo.org@gmail.com | General / linked services |
| **Twitter/X** | lovdo.org@gmail.com | Social media |
| **TikTok** | @lovdo.org | New account (1 follower) |
| **WG-Gesucht** | cata.waack@gmail.com | Apartment search |
| **Instagram** | veddelholzer.com | Client management |

### WG-Gesucht Context
- Looking for apartment in **Vienna**
- Move-in date: **March 15 - April 1, 2026** (not earlier!)
- Must leave current place by April 1st
- Need a few days to travel from Brașov + organize

### Instagram (veddelholzer.com) Context
- Check DMs regularly
- Find people to collaborate with
- Offer: Send product packages in exchange for content
- Respond to inquiries

---

## noVNC (Remote Browser)

**Access:** SSH tunnel only (localhost:6090). Public access disabled.

```bash
# From local machine:
ssh -L 6090:127.0.0.1:6090 root@46.224.216.49
# Then open: http://localhost:6090/vnc.html
```

Credentials in 1Password, NOT here. Never store secrets in workspace files.

---

## Cron Jobs

See **cron-jobs.md** for full details.

| Job | Schedule | Target |
|-----|----------|--------|
| wg-gesucht-inbox | Every 3h | g-cata-dani |
| instagram-veddelholzer-daily | 10:00 UTC | g-cata-dani |
| tiktok-rivoara-warmup | 11:00 UTC | g-forelox-cult |
| wg-gesucht-search | 14:00 UTC | g-cata-dani |

### WhatsApp Groups
- **g-cata-dani:** `120363213979130244@g.us`
- **g-forelox-cult:** `120363422731792463@g.us`

---

## Notes

*Add camera names, SSH hosts, voice preferences, device nicknames here as needed.*
