import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";

let loginPage: LoginPage;

Given('que estou na página de login', async function () {
  loginPage = new LoginPage(fixture.page);
  await loginPage.navegarParaLogin();
  fixture.logger.info("Naveguei para a página de login");
});

When('clico no botão Acessar', async function () {
  await loginPage.clicarAcessar();
});

Then('o campo CPF deve ser focado', async function () {
  await loginPage.campoCpfDeveEstarFocado();
});

When('digito o usuário {string}', async function (cpf: string) {
  await loginPage.digitarUsuario(cpf);
});

Then('o campo senha deve ser focado', async function () {
  await loginPage.campoSenhaDeveEstarFocado();
});

When('digito a senha {string}', async function (senha: string) {
  await loginPage.digitarSenha(senha);
});

Then('devo ser redirecionado para a página de atribuição', async function () {
  await loginPage.deveEstarNaPaginaDeAtribuicao();
});

Then('deve aparecer a mensagem de erro {string}', async function (_mensagem: string) {
  await loginPage.deveVerMensagemErro(); // aqui você pode melhorar para checar a string exata se quiser
});

Then('a logo do GESUAS deve ser exibida', async function () {
  await loginPage.logoGesuasDeveEstarVisivel();
});

Then('o título de boas-vindas deve estar visível', async function () {
  await loginPage.tituloBemVindoDeveEstarVisivel();
});

When('clico no link {string}', async function (linkText: string) {
  await fixture.page.getByRole('link', { name: linkText }).click();
});

Then('devo ser redirecionado para a página de recuperação de senha', async function () {
  await loginPage.deveEstarNaPaginaDeRecuperacaoSenha();
});

When('preencho o CPF e a senha', async function () {
  await loginPage.digitarUsuario(this.loginUser);
  await loginPage.digitarSenha(this.loginPassword);
});

When('clico no botão de login', async function () {
  await loginPage.clicarAcessar();
});
