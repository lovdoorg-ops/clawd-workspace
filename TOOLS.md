# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

---

## Connected Services

| Service | CLI | Account | Status |
|---------|-----|---------|--------|
| **GitHub** | `gh` | lovdoorg-ops (Clawd's account) | ✅ Ready |
| **GitHub** | — | C4T4 (Cata, collaborator) | ✅ Invited |
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
| **GitHub** | lovdoorg-ops | Clawd's GitHub account |
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

See **cron-jobs.md** for full details. All task jobs run in **isolated sessions**.

| Job | Schedule | Session | Target |
|-----|----------|---------|--------|
| wg-gesucht-inbox | Every 3h | isolated | g-cata-dani |
| tiktok-rivoara-warmup | 11:00 UTC | isolated | g-forelox-cult |
| wg-gesucht-search | 14:00 UTC | isolated | g-cata-dani |
| tiktok-rivoara-trends | 15:00 UTC | isolated | g-forelox-cult |

### WhatsApp Groups
- **g-cata-dani:** `120363213979130244@g.us`
- **g-forelox-cult:** `120363422731792463@g.us`

---

## Browser Setup — IMPORTANT

**ONE browser only: `vnc` (noVNC Chrome)**

This is the shared browser between human and Clawd. All logged-in sessions live here.
- WG-Gesucht, TikTok, Instagram, Google, GitHub — everything.
- `vnc` is set as `defaultProfile` in config, so it's used automatically.
- **NEVER create or use other profiles** (no `clawd`, no `chrome`, nothing else).

**Config:** `~/.clawdbot/clawdbot.json`
```json
"browser": {
  "defaultProfile": "vnc",
  "profiles": {
    "vnc": {
      "cdpUrl": "http://[::1]:9222"
    }
  }
}
```

**If browser stops working:**
1. Is noVNC Chrome running? `ps aux | grep chrome-novnc`
2. Can we reach it? `curl -s 'http://[::1]:9222/json/list'`
3. Config still correct? Check `cdpUrl` is `http://[::1]:9222` (IPv6, not IPv4)

---

## Notes

*Add camera names, SSH hosts, voice preferences, device nicknames here as needed.*
