import { expect, test } from "@playwright/test";

const chromeExecutablePath = process.env.PLAYWRIGHT_CHROME_EXECUTABLE;
if (chromeExecutablePath) {
  test.use({ launchOptions: { executablePath: chromeExecutablePath } });
}

test("shows CLAF Power with its optimized logo and approved partner description", async ({
  page,
}) => {
  await page.goto("/partners");

  const heading = page.getByRole("heading", { level: 2, name: "CLAF Power", exact: true });
  const card = heading.locator("xpath=ancestor::div[contains(@class, 'reticle-corners')][1]");

  await expect(card).toBeVisible();
  await expect(card).toContainText(
    "CLAF Power is a global manufacturer of industrial-grade AC/DC and DC/DC power supplies, known for high efficiency, reliability, and broad application across industrial, medical, and energy sectors."
  );

  const logo = card.getByRole("img", { name: "CLAF Power logo" });
  await expect(logo).toBeVisible();
  await expect
    .poll(() =>
      logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
    )
    .toBe(true);

  const logoSource = new URL((await logo.getAttribute("src"))!, page.url());
  expect(logoSource.pathname).toBe("/_next/image");
  expect(logoSource.searchParams.get("url")).toBe("/images/partners/claf-power.jpeg");
});
