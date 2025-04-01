export interface Lessor {
  locadorId: string;
  nomeCompletoLocador: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  estadoCivil: string;
  nacionalidade: string;
  profissao: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  documentos: string[];
}

export interface Renter {
  locatarioId: string;
  nomeCompletoLocatario: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  estadoCivil: string;
  nacionalidade: string;
  profissao: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  documentos: string[];
} 