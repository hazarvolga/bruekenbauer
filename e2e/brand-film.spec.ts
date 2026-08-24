import { expect, test } from "@playwright/test";

const chromeExecutablePath = process.env.PLAYWRIGHT_CHROME_EXECUTABLE;
if (chromeExecutablePath) {
  test.use({ launchOptions: { executablePath: chromeExecutablePath } });
}

test.describe("Homepage — brand film", () => {
  test("shows a poster-first film and starts playback on user request", async ({ page }) => {
    const mediaRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("brueckenbauer-brand-film.mp4")) {
        mediaRequests.push(request.url());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const film = page.getByRole("region", { name: "Brand film" });
    await expect(film).toBeVisible();

    const player = film.locator("[data-film-state]");
    const video = film.locator("video");
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute("preload", "none");
    await expect(video).toHaveAttribute("playsinline", "");
    await expect(video).toHaveAttribute(
      "poster",
      "/images/video/brueckenbauer-brand-film-poster.jpg"
    );
    await expect(video.locator('source[type="video/mp4"]')).toHaveAttribute(
      "src",
      "/videos/brueckenbauer-brand-film.mp4"
    );

    const initialPlaybackState = await video.evaluate((element) => {
      const media = element as HTMLVideoElement;
      return { autoplay: media.autoplay, paused: media.paused };
    });
    expect(initialPlaybackState).toEqual({ autoplay: false, paused: true });
    expect(mediaRequests).toHaveLength(0);

    const playButton = film.getByRole("button", { name: "Play brand film" });
    await playButton.focus();
    const focusStyle = await playButton.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
    });
    expect(focusStyle).toEqual({ outlineStyle: "solid", outlineWidth: "1px" });

    await playButton.click();
    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
      .toBe(false);
    expect(mediaRequests.length).toBeGreaterThan(0);

    await video.dispatchEvent("waiting");
    await expect(player).toHaveAttribute("data-film-state", "loading");
    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.controls))
      .toBe(true);

    await video.dispatchEvent("playing");
    await expect(player).toHaveAttribute("data-film-state", "playing");
  });
});
