import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";

let loginPage: LoginPage;

Given("que estou na página de login", async function () {
  if (!pageFixture.page) {
    throw new Error("pageFixture.page não está inicializado.");
  }
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.navegarParaLogin();
  if (pageFixture.logger) {
    pageFixture.logger.info("Naveguei para a página de login");
  }
});

When("clico no botão Acessar", async function () {
  await loginPage.clicarAcessar();
});

Then("o campo CPF deve ser focado", async function () {
  await loginPage.campoCpfDeveEstarFocado();
});

When("digito o usuário {string}", async function (cpf: string) {
  await loginPage.digitarUsuario(cpf);
});

Then("o campo senha deve ser focado", async function () {
  await loginPage.campoSenhaDeveEstarFocado();
});

When("digito a senha {string}", async function (senha: string) {
  await loginPage.digitarSenha(senha);
});

Then("devo ser redirecionado para a página de atribuição", async function () {
  await loginPage.deveEstarNaPaginaDeAtribuicao();
});

Then("deve aparecer a mensagem de erro {string}", async function () {
  await loginPage.deveVerMensagemErro();
});

Then("a logo do GESUAS deve ser exibida", async function () {
  await loginPage.logoGesuasDeveEstarVisivel();
});

Then("o título de boas-vindas deve estar visível", async function () {
  await loginPage.tituloBemVindoDeveEstarVisivel();
});

When("clico no link {string}", async function (linkText: string) {
  if (!pageFixture.page) {
    throw new Error("pageFixture.page não está inicializado.");
  }
  await pageFixture.page.getByRole("link", { name: linkText }).click();
});

Then(
  "devo ser redirecionado para a página de recuperação de senha",
  async function () {
    await loginPage.deveEstarNaPaginaDeRecuperacaoSenha();
  },
);

When("preencho o CPF e a senha", async function () {
  await loginPage.digitarUsuario(this.loginUser);
  await loginPage.digitarSenha(this.loginPassword);
});

When("clico no botão de login", async function () {
  await loginPage.clicarAcessar();
});
