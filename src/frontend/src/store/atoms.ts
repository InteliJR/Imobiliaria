import { atom } from "jotai";

// Átomo para armazenar o papel do usuário (role)
export const userRoleAtom = atom<string | null>(localStorage.getItem("userRole"));