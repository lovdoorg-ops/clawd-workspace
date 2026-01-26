# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

---

## Connected Services

| Service | CLI | Account | Status |
|---------|-----|---------|--------|
| **GitHub** | `gh` | C4T4 | ✅ Ready |
| **Railway** | `railway` | cata.waack@gmail.com | ✅ Ready |
| **Vercel** | `vercel` | c4t4 | ✅ Ready |

### GitHub
- SSH key added: `~/.ssh/id_ed25519.pub`
- Can create repos, manage issues/PRs, use API

### Railway
- Deploy apps, databases, services
- `railway up` to deploy

### Vercel
- Static sites, Next.js, landing pages
- `vercel` to deploy, `vercel --prod` for production

---

## SSH Keys
- `~/.ssh/id_ed25519` — ed25519 key for GitHub (clawd@clawdbot)

---

## Browser Sessions (via noVNC)

Logged-in accounts available in the remote browser:

| Service | Account | Purpose |
|---------|---------|---------|
| **WG-Gesucht** | (logged in) | Apartment search |
| **Instagram** | veddelholzer.com | Client management |
| **Twitter/X** | (logged in) | Social media |
| **TikTok** | rivoara | Beauty/skincare brand warmup |

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

Access the server's browser GUI remotely.

- **URL:** https://remote.waack.dev/vnc.html (preferred)
- **Fallback:** http://46.224.216.49:6090/vnc.html
- **Username:** clawd
- **Password:** C+G/jnLJGTVe1+xV

**Start/restart:**
```bash
/root/start-novnc.sh
DISPLAY=:99 google-chrome --no-sandbox https://example.com &
```

---

## Cron Jobs

| Job | Schedule | Task |
|-----|----------|------|
| wg-gesucht-inbox | 09:00 UTC | Check WG-Gesucht messages → WhatsApp |
| instagram-veddelholzer-daily | 10:00 UTC | Check Instagram DMs → WhatsApp |
| tiktok-rivoara-warmup | 11:00 UTC | Scroll & engage with beauty content (silent) |
| wg-gesucht-search | 14:00 UTC | Search new Vienna apartments → WhatsApp |

---

## Notes

*Add camera names, SSH hosts, voice preferences, device nicknames here as needed.*
