import { Given } from "@cucumber/cucumber";
import { usuarios } from "../../helper/util/test-data/usuarios";

Given(
  'que estou logado como {string} do tipo {string} na unidade {string}',
  async function (perfil: string, tipo: string, unidade: string) {
    const chave = `${perfil}_${tipo}_${unidade}`.toLowerCase().replace(/ /g, '_');

    const usuario = usuarios[chave as keyof typeof usuarios];

    if (!usuario) {
      throw new Error(`Usuário com chave '${chave}' não encontrado`);
    }

    this.loginUser = usuario.cpf;
    this.loginPassword = usuario.senha;
    this.perfil = usuario.perfil;
    this.tipo = usuario.tipo;
    this.unidade = usuario.unidade;
  }
);
