import { expect, test } from "@playwright/test";

const titlePattern = /brüeckenbauer/i;

const routes = [
  "/",
  "/de",
  "/fr",
  "/intro",
  "/de/intro",
  "/fr/intro",
  "/products",
  "/de/products",
  "/fr/products",
  "/products/power-management",
  "/de/products/power-management",
  "/fr/products/power-management",
  "/product/chip-ntc-thermistors",
  "/de/product/chip-ntc-thermistors",
  "/fr/product/chip-ntc-thermistors",
  "/power-management/igbt",
  "/de/power-management/igbt",
  "/fr/power-management/igbt",
  "/industries",
  "/de/industries",
  "/fr/industries",
  "/industries/aerospace-and-defense",
  "/de/industries/aerospace-and-defense",
  "/fr/industries/aerospace-and-defense",
  "/search",
  "/de/search",
  "/fr/search",
  "/rfq",
  "/de/rfq",
  "/fr/rfq",
  "/oem-supply",
  "/logistics",
  "/compliance",
  "/documents",
  "/contact",
  "/about",
];

test.describe("Smoke — localized routes return 200 and brand title", () => {
  for (const path of routes) {
    test(path, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));

      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(titlePattern);
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
