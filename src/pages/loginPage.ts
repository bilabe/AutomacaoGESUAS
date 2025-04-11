import { Page, expect } from "@playwright/test";

export default class LoginPage {
  constructor(private page: Page) {}

  private selectors = {
    cpfInput: this.page.getByRole('textbox', { name: 'CPF' }),
    senhaInput: this.page.getByRole('textbox', { name: 'Senha' }),
    acessarBtn: this.page.locator("button[type='submit']"),
  };

  async navegarParaLogin() {
    await this.page.goto("http://localhost/logout");
  }

  async clicarAcessar() {
    await this.selectors.acessarBtn.click();
  }

  async digitarUsuario(cpf: string) {
    await this.selectors.cpfInput.click();
    await this.page.waitForTimeout(100); // Pode ser trocado por espera mais robusta se quiser
    await this.selectors.cpfInput.fill(cpf);
  }

  async digitarSenha(senha: string) {
    await this.selectors.senhaInput.click();
    await this.page.waitForTimeout(100);
    await this.selectors.senhaInput.fill(senha);
  }

  async campoCpfDeveEstarFocado() {
    await expect(this.selectors.cpfInput).toBeFocused();
  }

  async campoSenhaDeveEstarFocado() {
    await expect(this.selectors.senhaInput).toBeFocused();
  }

  async deveEstarNaPaginaDeAtribuicao() {
    await expect(this.page).toHaveURL("http://localhost/set_atribuicao_escolhida");
  }

  localizarMensagemErro() {
    return this.page.getByText('Usuário inexistente ou senha');
  }

  async deveVerMensagemErro() {
    await expect(this.localizarMensagemErro()).toBeVisible();
  }

  // Verifica se a logo do GESUAS está visível
async logoGesuasDeveEstarVisivel() {
  await expect(this.page.locator('img[alt="Logo Gesuas"]')).toBeVisible();
}

// Verifica se o título "Seja bem-vindo ao Gesuas!" está visível
async tituloBemVindoDeveEstarVisivel() {
  await expect(this.page.locator('h1')).toHaveText("Seja bem-vindo ao Gesuas!");
}

async clicarEsqueceuSenha() {
  await this.page.getByRole('link', { name: 'Esqueceu sua senha?' }).click();
}

async deveEstarNaPaginaDeRecuperacaoSenha() {
  await expect(this.page).toHaveURL("http://localhost/lostpassword/");
}
}
