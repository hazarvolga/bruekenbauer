import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", title: "BRUECKENBAUER GMBH" },
  { path: "/intro", title: "BRUECKENBAUER" },
  { path: "/products", title: "BRUECKENBAUER" },
  { path: "/power-management/igbt", title: "BRUECKENBAUER" },
  { path: "/power-management/sic", title: "BRUECKENBAUER" },
  { path: "/power-management/mosfet", title: "BRUECKENBAUER" },
  { path: "/power-management/converters", title: "BRUECKENBAUER" },
  { path: "/search", title: "BRUECKENBAUER" },
  { path: "/rfq", title: "BRUECKENBAUER" },
  { path: "/industries", title: "BRUECKENBAUER" },
  { path: "/industries/hvac", title: "BRUECKENBAUER" },
  { path: "/oem-supply", title: "BRUECKENBAUER" },
  { path: "/logistics", title: "BRUECKENBAUER" },
  { path: "/compliance", title: "BRUECKENBAUER" },
  { path: "/documents", title: "BRUECKENBAUER" },
  { path: "/contact", title: "BRUECKENBAUER" },
  { path: "/about", title: "BRUECKENBAUER" },
];

test.describe("Smoke — all routes return 200 and have correct title", () => {
  for (const { path, title } of routes) {
    test(`${path}`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(new RegExp(title, "i"));
      // No JS errors in console
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      await page.waitForLoadState("networkidle");
      expect(errors).toHaveLength(0);
    });
  }
});

test.describe("Core Web Vitals — homepage", () => {
  test("no layout shift above threshold on homepage", async ({ page }) => {
    await page.goto("/");
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
              clsValue += (entry as PerformanceEntry & { value: number }).value;
            }
          }
          resolve(clsValue);
        }).observe({ type: "layout-shift", buffered: true });
        setTimeout(() => resolve(clsValue), 3000);
      });
    });
    expect(cls).toBeLessThan(0.1);
  });
});

test.describe("Accessibility — homepage", () => {
  test("has a main landmark", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main, [role='main']").first()).toBeVisible();
  });

  test("focus-visible outline on first interactive element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus-visible");
    await expect(focused).toHaveCount(1);
  });
});
