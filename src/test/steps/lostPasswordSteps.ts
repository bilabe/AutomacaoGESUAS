import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import LostPasswordPage from "../../pages/lostPasswordPage";

let lostPasswordPage: LostPasswordPage;

Given('estou na página de recuperação de senha', async function () {
  if (!pageFixture.page) {
    throw new Error("pageFixture.page não está inicializado.");
  }
  lostPasswordPage = new LostPasswordPage(pageFixture.page);
  await lostPasswordPage.acessarPagina();
});

When('informo o CPF {string}', async function (cpf: string) {
  await lostPasswordPage.digitarCPF(cpf);
});

When('clico no botão Redefinir Senha', async function () {
  await lostPasswordPage.clicarRedefinirSenha();
});

Then('deve ser exibida a mensagem de erro {string}', async function (mensagem: string) {
  await lostPasswordPage.deveVerMensagemErroCPFNaoEncontrado(mensagem);
});

Then('devo ser redirecionado para a confirmação de envio por e-mail', async function () {
  await lostPasswordPage.deveEstarNaPaginaDeConfirmacao();
});

Then('o campo CPF deve estar visível', async function () {
  await lostPasswordPage.campoCPFDeveEstarVisivel();
});

Then('o botão Redefinir Senha deve estar visível', async function () {
  await lostPasswordPage.botaoRedefinirDeveEstarVisivel();
});
