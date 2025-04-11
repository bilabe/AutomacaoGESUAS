import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { fixture } from "./pageFixture";
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

Before({ timeout: 60 * 1000 }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;

  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
  });

  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });

  const page = await context.newPage();

  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
  const tracePath = `./test-results/trace/${pickle.id}.zip`;
  let videoPath: string | undefined;
  let img: Buffer | undefined;

  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.");
  }

  if (result?.status === Status.PASSED) {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });

    videoPath = await fixture.page.video()?.path();
  }

  await context.tracing.stop({ path: tracePath });
  await fixture.page.close();
  await context.close();

  if (result?.status === Status.PASSED) {
    if (img) this.attach(img, "image/png");
    if (videoPath) this.attach(fs.readFileSync(videoPath), "video/webm");

    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${tracePath}</a>`;
    this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }
});

AfterAll(async function () {
  await browser.close();

  if (fixture.logger) {
    fixture.logger.close();
  }
});
