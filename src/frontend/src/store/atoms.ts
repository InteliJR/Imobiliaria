import { atom } from "jotai";

// Átomo para armazenar o papel do usuário (role)
export const userRoleAtom = atom<string | null>(localStorage.getItem("userRole"));

// Defina a interface do usuário
export interface UserData {
  nome: string | null;
  telefone: string | null;
  nacionalidade: string | null;
  cpf: string | null;
  rg: string | null;
  passaporte: string | null;
  endereco: string | null;
  CNPJ: string | null;
  email: string | null;
  dataCriacao: string | null;
  role: string | null;
  roleId: number | null;
}

// Crie um atom para o estado do usuário
export const userAtom = atom<UserData | null>(null);