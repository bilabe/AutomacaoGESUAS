import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import fs from "fs-extra";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

// Para ambos os cenários, mantenha o padrão DRY (Don't Repeat Yourself)
async function setupScenario(pickle: { name: string; id: string }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
    viewport: { width: 1920, height: 1080 },
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  const page = await context.newPage();
  pageFixture.page = page;
  pageFixture.logger = createLogger(options(scenarioName));
}

Before({ tags: "not @auth" }, async function ({ pickle }) {
  await setupScenario(pickle);
});
Before({ tags: "@auth" }, async function ({ pickle }) {
  await setupScenario(pickle);
});

After(async function ({ pickle, result }) {
  let videoPath: string | undefined;
  let img: Buffer | undefined;
  const path = `./test-results/trace/${pickle.id}.zip`;

  // Só executa se pageFixture.page estiver definido (boa prática)
  if (pageFixture.page) {
    if (result?.status === Status.PASSED) {
      img = await pageFixture.page.screenshot({
        path: `./test-results/screenshots/${pickle.name}.png`,
        type: "png",
      });
      videoPath = await pageFixture.page.video()?.path();
    }
    await context.tracing.stop({ path: path });
    await pageFixture.page.close();
  }
  await context.close();

  if (result?.status === Status.PASSED && img && videoPath) {
    await this.attach(img, "image/png");
    await this.attach(fs.readFileSync(videoPath), "video/webm");
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
    await this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }
});

AfterAll(async function () {
  await browser.close();
  if (pageFixture.logger) {
    pageFixture.logger.close();
  }
});
