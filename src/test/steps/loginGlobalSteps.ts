import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";

let loginPage: LoginPage;

When('estou na página de login', async function () {
  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.");
  }
  loginPage = new LoginPage(fixture.page);
  await loginPage.navegarParaLogin();
});

Then('devo ver a página de escolha de atribuição', async function () {
  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.");
  }
  await expect(fixture.page.locator('#ui-id-1')).toContainText('Escolha a atribuição para esta sessão');
});
