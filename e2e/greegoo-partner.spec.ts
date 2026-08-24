import { expect, test } from "@playwright/test";

const chromeExecutablePath = process.env.PLAYWRIGHT_CHROME_EXECUTABLE;
if (chromeExecutablePath) {
  test.use({ launchOptions: { executablePath: chromeExecutablePath } });
}

test.describe("Partners — Greegoo", () => {
  test("shows Greegoo with an optimized logo and source-backed English description", async ({
    page,
  }) => {
    await page.goto("/partners");

    const heading = page.getByRole("heading", { level: 2, name: "Greegoo", exact: true });
    const card = heading.locator("xpath=ancestor::div[contains(@class, 'reticle-corners')][1]");

    await expect(card).toBeVisible();

    const logo = card.getByRole("img", { name: "Greegoo logo" });
    await expect(logo).toBeVisible();
    await expect
      .poll(() =>
        logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
      )
      .toBe(true);

    const optimizedLogoSource = await logo.getAttribute("src");
    expect(optimizedLogoSource).not.toBeNull();

    const optimizedLogoUrl = new URL(optimizedLogoSource!, page.url());
    expect(optimizedLogoUrl.pathname).toBe("/_next/image");
    expect(optimizedLogoUrl.searchParams.get("url")).toBe("/images/partners/greegoo.jpeg");

    await expect(card).toContainText(/power semiconductors/i);
    await expect(card).toContainText(/solid-state relays/i);
    await expect(card).toContainText(/vacuum contactors/i);
  });
});
