#!/usr/bin/env node
/**
 * VNC Browser Helper
 * Connects to the VNC Chrome instance on port 9222
 * Usage: node vnc-browser.js <action> [args...]
 * 
 * Actions:
 *   tabs                     - List open tabs
 *   navigate <url>           - Navigate current tab to URL
 *   screenshot [file]        - Take screenshot (default: /tmp/screenshot.png)
 *   snapshot                 - Get page content as text
 *   click <selector>         - Click element
 *   type <selector> <text>   - Type text into element
 *   eval <code>              - Evaluate JS in page
 */

const puppeteer = require('/usr/lib/node_modules/puppeteer-core');

const CDP_URL = 'http://127.0.0.1:9222';

async function connect() {
  return await puppeteer.connect({
    browserURL: CDP_URL,
    defaultViewport: null
  });
}

async function getActivePage(browser) {
  const pages = await browser.pages();
  // Return first non-extension page
  for (const page of pages) {
    const url = page.url();
    if (!url.startsWith('chrome-extension://') && !url.startsWith('devtools://')) {
      return page;
    }
  }
  return pages[0];
}

async function listTabs() {
  const browser = await connect();
  const pages = await browser.pages();
  const tabs = [];
  for (const page of pages) {
    tabs.push({
      url: page.url(),
      title: await page.title()
    });
  }
  console.log(JSON.stringify(tabs, null, 2));
  browser.disconnect();
}

async function navigate(url) {
  const browser = await connect();
  const page = await getActivePage(browser);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  console.log(JSON.stringify({ ok: true, url: page.url(), title: await page.title() }));
  browser.disconnect();
}

async function screenshot(file = '/tmp/screenshot.png') {
  const browser = await connect();
  const page = await getActivePage(browser);
  await page.screenshot({ path: file, fullPage: false });
  console.log(JSON.stringify({ ok: true, file }));
  browser.disconnect();
}

async function snapshot() {
  const browser = await connect();
  const page = await getActivePage(browser);
  const content = await page.evaluate(() => document.body.innerText);
  console.log(content);
  browser.disconnect();
}

async function click(selector) {
  const browser = await connect();
  const page = await getActivePage(browser);
  await page.click(selector);
  console.log(JSON.stringify({ ok: true, clicked: selector }));
  browser.disconnect();
}

async function type(selector, text) {
  const browser = await connect();
  const page = await getActivePage(browser);
  await page.type(selector, text);
  console.log(JSON.stringify({ ok: true, typed: text, into: selector }));
  browser.disconnect();
}

async function evalCode(code) {
  const browser = await connect();
  const page = await getActivePage(browser);
  const result = await page.evaluate(code);
  console.log(JSON.stringify({ ok: true, result }));
  browser.disconnect();
}

// Main
const [,, action, ...args] = process.argv;

(async () => {
  try {
    switch (action) {
      case 'tabs':
        await listTabs();
        break;
      case 'navigate':
        await navigate(args[0]);
        break;
      case 'screenshot':
        await screenshot(args[0]);
        break;
      case 'snapshot':
        await snapshot();
        break;
      case 'click':
        await click(args[0]);
        break;
      case 'type':
        await type(args[0], args.slice(1).join(' '));
        break;
      case 'eval':
        await evalCode(args.join(' '));
        break;
      default:
        console.error('Unknown action:', action);
        console.error('Usage: vnc-browser.js <tabs|navigate|screenshot|snapshot|click|type|eval> [args...]');
        process.exit(1);
    }
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
})();
