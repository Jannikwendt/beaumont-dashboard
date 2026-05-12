import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const OUT = path.resolve(process.cwd(), "docs/images");
fs.mkdirSync(OUT, { recursive: true });

const BASE_URL = process.env.SCREENSHOT_URL ?? "http://localhost:3000";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto(BASE_URL);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2800);

  // 01 — Hero / overview
  await page.screenshot({ path: `${OUT}/01-overview.png`, fullPage: false });

  // 02 — Allocation section
  await page.locator("#allocation").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/02-allocation.png`, fullPage: false });

  // 03 — Real-estate deviation modal
  await page.locator('button:has-text("+7.8")').first().click();
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${OUT}/03-deviation-modal.png`, fullPage: false });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);

  // 04 — Decision Journal with the rejected decision expanded
  await page.locator("#governance").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.locator('button:has-text("REJECTED 1-4")').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/04-decision-gps.png`, fullPage: false });

  // 05 — Pictet custody side panel (aria-label is more reliable than visible text)
  await page.locator("#overview").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator('button[aria-label="Open Pictet custodian detail"]').click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/05-custody-panel.png`, fullPage: false });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);

  // 06 — Command palette
  await page.keyboard.press("Control+K");
  await page.waitForTimeout(350);
  await page.keyboard.type("btc", { delay: 50 });
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}/06-command-palette.png`, fullPage: false });

  // 07 — Wide hero banner (1600x700) for the top of the README
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  await page.setViewportSize({ width: 1600, height: 700 });
  await page.goto(BASE_URL);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2800);
  await page.screenshot({ path: `${OUT}/00-hero-banner.png`, fullPage: false });

  await browser.close();
  console.log("✓ 7 screenshots written to docs/images/");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
