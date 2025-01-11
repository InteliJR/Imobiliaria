export interface ITicket {
    chamadoId: number; // ID do chamado
    title: string; // Título do chamado
    solicitor: string; // Solicitante
    address: string; // Endereço associado ao chamado
    date: string; // Data do chamado (em formato ISO 8601)
    open: boolean; // Status do chamado (aberto ou fechado)
    description: string; // Descrição do chamado
  }
  