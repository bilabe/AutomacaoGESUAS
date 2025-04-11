export type UsuarioTeste = {
    cpf: string;
    senha: string;
    perfil: 'tecnico' | 'gestor' | 'suporte' | 'assessor_financeiro' | 'administrativo_financeiro' | 'tecnico_suporte_dados';
    tipo?: string;
    unidade: string;
  };
  
  export const usuarios: Record<string, UsuarioTeste> = {
    tecnico_coordenador_cras_avusolandia: {
      cpf: '01805136488',
      senha: '*Gesuas123',
      perfil: 'tecnico',
      tipo: 'coordenador',
      unidade: 'CRAS Avusolândia',
    },
    tecnico_nivel_superior_creas_testolandia: {
      cpf: '22222222222',
      senha: '*Gesuas123',
      perfil: 'tecnico',
      tipo: 'nivel_superior',
      unidade: 'CREAS Testolândia',
    },
    gestor_cras_avusolandia: {
      cpf: '33333333333',
      senha: '*GesuasGestor',
      perfil: 'gestor',
      unidade: 'CRAS Avusolândia',
    },
    suporte: {
      cpf: '44444444444',
      senha: '*GesuasSuporte',
      perfil: 'suporte',
      unidade: 'Suporte ao Cliente',
    },
    assessor_financeiro: {
      cpf: '55555555555',
      senha: '*GesuasAssessor',
      perfil: 'assessor_financeiro',
      unidade: 'Avusolândia',
    },
  };
  