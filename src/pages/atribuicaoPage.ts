import { Page, expect } from "@playwright/test";

export default class AtribuicaoPage {
  constructor(private page: Page) {}

  private selectors = {
    logo: this.page.locator("#logo"),
    abaAtribuicao: this.page.getByRole("tab", { name: /Escolha a atribuição/i }),
    dropdownAtribuicao: this.page.getByLabel("Atribuicao"),
    botaoSalvar: this.page.getByRole("button", { name: "Salvar" }),
    botaoSair: this.page.getByRole("button", { name: "Sair" }),
    nomeUsuario: this.page.getByRole("strong"),
    textoAba: this.page.locator("#ui-id-1"),
  };

  async acessarPagina() {
    await this.page.goto("http://localhost/set_atribuicao_escolhida");
  }

  async validarTextoPadrao(nomeUsuario: string) {
    await expect(this.selectors.nomeUsuario).toContainText(nomeUsuario);
    await expect(this.selectors.botaoSalvar).toContainText("Salvar");
    await expect(this.selectors.botaoSair).toContainText("Sair");
    await expect(this.selectors.textoAba).toContainText("Escolha a atribuição para esta sessão");
  }

  async selecionarAtribuicao(valor: string) {
    await this.selectors.dropdownAtribuicao.selectOption(valor);
  }

  async clicarSalvar() {
    await this.selectors.botaoSalvar.click();
  }
}
