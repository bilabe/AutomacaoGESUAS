import { When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";

let loginPage: LoginPage;

When('estou na página de login', async function () {
  loginPage = new LoginPage(fixture.page);
  await loginPage.navegarParaLogin();
});

When('preencho o CPF e a senha', async function () {
  await loginPage.digitarUsuario(this.loginUser);
  await loginPage.digitarSenha(this.loginPassword);
});

When('clico no botão de login', async function () {
  await loginPage.clicarAcessar();
});

Then('devo ver a página de escolha de atribuição', async function () {
  await loginPage.deveEstarNaPaginaDeAtribuicao();
});

Then('devo ver a página de escolha de atribuição', async function () {
    await loginPage.deveEstarNaPaginaDeAtribuicao(); // Isso deve estar implementado em loginPage.ts
  });
  
