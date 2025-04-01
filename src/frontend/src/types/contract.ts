import type { Property } from "./property";
import type { Lessor, Renter } from "./user";

export interface Contract {
  dataReajuste?: any;
  contratoId?: string;
  documentos?: string[];
  valorAluguel?: number;
  dataInicio?: string;
  dataEncerramento?: string;
  locadorId?: string;
  locatarioId?: string;
  imovelId?: string;
  tipoGarantia?: string;
  condicoesEspeciais?: string;
  status?: any;
  iptu?: number;
  dataPagamento?: string;
  taxaAdm?: number;
  DataRescisao?: string;
  renovado?: boolean;
  DataEncerramentoRenovacao?: string;
  valorReajuste?: number;
}

export interface Payment {
  pagamentoId: string;
  contratoId: string;
  valor: number;
  data: string;
  pagante: string;
  MetodoPagamento: string;
  descricao: string;
  TipoPagamento: string;
  multa: boolean;
  valor_multa: number;
}

export interface ContractFormProps {
  contract: Contract | null;
  isEditable: boolean;
  properties: Property[];
  lessors: Lessor[];
  renters: Renter[];
  selectedPropertyId: string | null;
  status: any;
  DataReajuste: any;
  selectedLessorId: string | null;
  selectedRenterId: string | null;
  isLoadingProperty: boolean;
  isLoadingLessor: boolean;
  isLoadingRenter: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onValueChange: (field: string, value: string | number | string[]) => void;
  setSelectedPropertyId?: (value: string) => void;
  setSelectedLessorId?: (value: string) => void;
  setSelectedRenterId?: (value: string) => void;
  handleSave: (event: React.FormEvent) => void;
} 