// NAS INTERFACES TEM QUE TER OS DADOS QUE VAO SER INPUTADOS TIPO A FORMATAÇAO JSON

// Imovel
export interface IImovel {
    imovelId: number;
    fotos: string | null;
    tipoImovel: string;
    cep: string;
    condominio: number;
    valorImovel: number;
    bairro: string;
    descricao: string;
    endereco: string;
    complemento: string;
    locatarioId: number | null;
    locadorId: number | null;
  }
  
  // Usuario
  export interface IUser {
    usuarioId: number;
    roleId: number;
    role: string;
    nome: string;
    cpf: string | null;   
    telefone: string | null;
    nacionalidade: string | null;
    endereco: string | null;
    cnpj: string | null;
    passaporte: string | null;
    rg: string | null;
    email: string | null;
    ativo: boolean;
    dataCriacao: string;
    nImoveis: number; 
    imoveis: IImovel[];
  }
  