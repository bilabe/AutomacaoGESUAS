import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import AtribuicaoPage from "../../pages/atribuicaoPage";

let atribuicaoPage: AtribuicaoPage;

Given('estou na página de escolha de atribuição', async function () {
  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.");
  }
  atribuicaoPage = new AtribuicaoPage(fixture.page);
  await atribuicaoPage.acessarPagina();
});

Then('deve exibir o nome do usuário {string}', async function (nome: string) {
  await atribuicaoPage.validarTextoPadrao(nome);
});

Then('o botão Salvar da tela de atribuição deve conter o texto {string}', async function (texto: string) {
  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.F");
  }
  await expect(fixture.page.locator('#btnSetAtribuicaoEscolhida')).toContainText(texto);
});

Then('o botão Sair da tela de atribuição deve conter o texto {string}', async function (texto: string) {
  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.");
  }
  await expect(fixture.page.locator('#userinfo')).toContainText(texto);
});

Then('a aba deve conter o texto {string}', async function (texto: string) {
  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.");
  }
  await expect(fixture.page.locator('#ui-id-1')).toContainText(texto);
});

When('seleciono a atribuição {string}', async function (valor: string) {
  await atribuicaoPage.selecionarAtribuicao(valor);
});

When('clico no botão Salvar da tela de atribuição', async function () {
  await atribuicaoPage.clicarSalvar();
});

When('clico no botão Sair da tela de atribuição', async function () {
  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.");
  }
  const botaoSair = fixture.page.getByRole('button', { name: 'Sair' });
  await botaoSair.click();
});

Then('devo ser redirecionado para {string}', async function (url: string) {
  if (!fixture.page) {
    throw new Error("fixture.page não está inicializado.");
  }
  await expect(fixture.page.url()).toContain(url);
});
