
export interface IContract {
    contratoId: number;
    documentos: string;
    valorAluguel: number;
    dataInicio: string;
    dataEncerramento: string;
    locadorId: number;
    locatarioId: number;
    imovelId: number;
    tipoGarantia: string;
    condicoesEspeciais: string;
    status: string;
    iptu: number;
    dataPagamento: string;
    taxaAdm: number;
    dataRescisao: string;
    renovado: boolean;
    dataEncerramentoRenovacao: string;
    valorReajuste: number;
  }
  