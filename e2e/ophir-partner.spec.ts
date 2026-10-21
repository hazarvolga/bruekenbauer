import { expect, test } from "@playwright/test";

const chromeExecutablePath = process.env.PLAYWRIGHT_CHROME_EXECUTABLE;
if (chromeExecutablePath) {
  test.use({ launchOptions: { executablePath: chromeExecutablePath } });
}

test("shows OPHIR as a technology partner with the supplied description", async ({ page }) => {
  await page.goto("/partners");

  const heading = page.getByRole("heading", { level: 2, name: "OPHIR", exact: true });
  const card = heading.locator("xpath=ancestor::div[contains(@class, 'reticle-corners')][1]");

  await expect(card).toBeVisible();
  await expect(card.getByText("Technology Partner", { exact: true })).toBeVisible();
  await expect(card).toContainText(
    "OPHIR is a 3D and CGI studio that produces technical visual content, including 3D explainer animations, renders, motion graphics and interactive or immersive experiences, for technology companies, with a particular focus on hard-tech sectors such as semiconductors, photonics, quantum technologies, space, aerospace and energy."
  );

  const logo = card.getByRole("img", { name: "OPHIR logo" });
  await expect(logo).toBeVisible();
  await logo.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
    )
    .toBe(true);

  const logoSource = new URL((await logo.getAttribute("src"))!, page.url());
  expect(logoSource.pathname).toBe("/_next/image");
  expect(logoSource.searchParams.get("url")).toBe("/images/partners/ophir.jpeg");
});
