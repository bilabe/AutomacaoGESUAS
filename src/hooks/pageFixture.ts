import { Page } from "@playwright/test";
import { Logger } from "winston";

export const fixture: {
  page: Page | null;
  logger: Logger | null;
} = {
  page: null,
  logger: null,
};