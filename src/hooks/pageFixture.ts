import { Page } from "@playwright/test";
import { Logger } from "winston";

export const pageFixture: {
  page?: Page;
  logger?: Logger;
} = {};
