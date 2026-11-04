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

test("shows the OPHIR description in the selected partner-page language", async ({ page }) => {
  const localizedDescriptions = [
    {
      route: "/de/partners",
      description:
        "OPHIR ist ein 3D- und CGI-Studio, das technische visuelle Inhalte für Technologieunternehmen produziert, darunter 3D-Erkläranimationen, Renderings, Motion Graphics sowie interaktive oder immersive Erlebnisse. Ein besonderer Schwerpunkt liegt auf Technologiebereichen wie Halbleitern, Photonik, Quantentechnologien, Weltraum, Luft- und Raumfahrt sowie Energie.",
    },
    {
      route: "/fr/partners",
      description:
        "OPHIR est un studio 3D et CGI qui produit des contenus visuels techniques pour les entreprises technologiques, notamment des animations explicatives en 3D, des rendus, du motion design ainsi que des expériences interactives ou immersives. Le studio se concentre particulièrement sur les technologies de pointe, comme les semi-conducteurs, la photonique, les technologies quantiques, le spatial, l’aérospatiale et l’énergie.",
    },
  ];

  for (const { route, description } of localizedDescriptions) {
    await page.goto(route);

    const heading = page.getByRole("heading", { level: 2, name: "OPHIR", exact: true });
    const card = heading.locator("xpath=ancestor::div[contains(@class, 'reticle-corners')][1]");

    await expect(card).toBeVisible();
    await expect(card).toContainText(description);
    await expect(card).not.toContainText(
      "OPHIR is a 3D and CGI studio that produces technical visual content"
    );
  }
});
