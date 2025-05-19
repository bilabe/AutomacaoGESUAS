import { Page, expect } from "@playwright/test";

export default class LostPasswordPage {
  constructor(private page: Page) {}

  private selectors = {
    inputCPF: this.page.getByRole("textbox", { name: "CPF" }),
    btnRedefinir: this.page.getByRole("button", { name: "Redefinir Senha" }),
    alertaErro: this.page.locator(".ui-state-error"),
    alertaSucesso: this.page.locator("div.alert-info"),
  };

  async acessarPagina() {
    await this.page.goto("http://localhost/lostpassword/");
  }

  async digitarCPF(cpf: string) {
    await this.selectors.inputCPF.click();
    await this.selectors.inputCPF.fill(cpf);
  }

  async clicarRedefinirSenha() {
    await this.selectors.btnRedefinir.click();
  }

  async deveVerMensagemErroCPFNaoEncontrado(mensagem: string) {
    await expect(this.selectors.alertaErro).toHaveText(
      new RegExp(mensagem, "i"),
    );
  }

  async deveEstarNaPaginaDeConfirmacao() {
    await expect(this.page).toHaveURL(
      "http://localhost/lostpassword/emailsend",
    );
    await expect(
      this.page.getByRole("tabpanel", { name: "Redefinir senha" }),
    ).toBeVisible();
    await expect(this.page.getByLabel("Redefinir senha")).toContainText(
      "E-mail enviado. Confira sua caixa de entrada e siga as instruções no e-mail para continuar a reconfiguração da senha.",
    );
  }

  async campoCPFDeveEstarVisivel() {
    await expect(this.selectors.inputCPF).toBeVisible();
  }

  async botaoRedefinirDeveEstarVisivel() {
    await expect(this.selectors.btnRedefinir).toBeVisible();
  }
}
