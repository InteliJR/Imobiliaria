import React from "react";
import CurrencyInput from "react-currency-input-field";
import DocumentViewer from "../DocumentViewer";
import Botao from "../Botoes/Botao";
import { Contract } from "../../mobile/pages/ContractView";
import { FaTrash } from "react-icons/fa";

interface ContractFormProps {
  contract: Contract | null;
  isEditable: boolean;
  properties: any[];
  lessors: any[];
  renters: any[];
  selectedPropertyId: string | null;
  status: any;
  DataReajuste: any;
  // reajust: string | null;
  selectedLessorId: string | null;
  selectedRenterId: string | null;
  isLoadingProperty: boolean;
  isLoadingLessor: boolean;
  isLoadingRenter: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onValueChange: (field: string, value: string | number | string[]) => void;
  setSelectedPropertyId: (value: string) => void;
  setSelectedLessorId: (value: string) => void;
  setSelectedRenterId: (value: string) => void;
  handleSave: (event: React.FormEvent) => void;
}

export const ContractForm: React.FC<ContractFormProps> = ({
  contract,
  isEditable,
  properties,
  lessors,
  renters,
  selectedPropertyId,
  selectedLessorId,
  selectedRenterId,
  isLoadingProperty,
  isLoadingLessor,
  isLoadingRenter,
  // status,
  // DataReajuste,
  onInputChange,
  onValueChange,
  setSelectedPropertyId,
  setSelectedLessorId,
  setSelectedRenterId,
  handleSave,
}) => {
  const handleRemoveDocument = (index: number) => {
    if (!contract) return;
    const updatedDocuments = [...(contract.documentos ?? [])];
    updatedDocuments.splice(index, 1); // Remove o documento do array
    onValueChange("documentos", updatedDocuments); // Atualiza o estado do contrato
  };

  if (!contract) {
    return <p>Contrato não encontrado.</p>;
  }

  // console.log('Tipo de contract.documentos:', typeof contract?.documentos);
  // console.log('Valor de contract.documentos:', contract?.documentos);

  const documentos = contract?.documentos
    ? (typeof contract.documentos === "string" ? [contract.documentos] : contract.documentos)
    : [];

  const formatDate = (dateString:any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <>
      <h1 className="text-title font-strong mb-2">Contrato: {contract?.contratoId}</h1>
      <form className="flex flex-col gap-5 border-2 border-neutral-500 p-4 rounded">
        {/* Valor do Aluguel */}
        <div className="flex flex-col">
          <label htmlFor="rentalValue">Valor do Aluguel:</label>
          <CurrencyInput
            id="rentalValue"
            name="valorAluguel"
            placeholder="R$ 0,00"
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            decimalsLimit={2}
            maxLength={9}
            value={contract?.valorAluguel || ""}
            onValueChange={(value) => onValueChange("valorAluguel", parseFloat(value || "0"))}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Data de Início */}
        <div className="flex flex-col">
          <label>Data de Início:</label>
          <input
            type="text"
            name="dataInicio"
            value={formatDate(contract?.dataInicio) || ""}
            disabled={true}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Data de Encerramento */}
        <div className="flex flex-col">
          <label htmlFor="dataEncerramento">Data de Encerramento:</label>
          <input
            id="dataEncerramento"
            type="text"
            name="dataEncerramento"
            value={formatDate(contract?.dataEncerramento) || ""}
            onChange={onInputChange}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Tipo de Garantia */}
        <div className="flex flex-col">
          <label htmlFor="tipoGarantia">Tipo de Garantia:</label>
          <select
            id="tipoGarantia"
            name="tipoGarantia"
            value={contract?.tipoGarantia || ""}
            onChange={onInputChange}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          >
            <option value="Caução">Caução</option>
            <option value="Depósito">Depósito</option>
            <option value="Fiador">Fiador</option>
            <option value="Renovado">Outro</option>
          </select>
        </div>

        {/* Condições Especiais */}
        <div className="flex flex-col">
          <label htmlFor="condicoesEspeciais">Condições Especiais:</label>
          <input
            id="condicoesEspeciais"
            type="text"
            name="condicoesEspeciais"
            value={contract?.condicoesEspeciais || ""}
            onChange={onInputChange}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={contract?.status || ""}
            onChange={onInputChange}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          >
            <option value="Ativo">Ativo</option>
            <option value="Encerrado">Encerrado</option>
            <option value="Rescindido">Rescindido</option>
            <option value="Renovado">Renovado</option>
          </select>
        </div>

        {/* Campo de Data de Rescisão */}
        {contract?.status === "Rescindido" && (
          <div className="flex flex-col">
            <label htmlFor="dataRescisao">Data de Rescisão:</label>
            <input
              id="dataRescisao"
              type="date"
              name="dataRescisao"
              value={formatDate(contract?.DataRescisao) || new Date().toISOString().split("T")[0]}
              onChange={onInputChange}
              disabled={!isEditable}
              className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
            />
          </div>
        )}

        {/* Campo de Data de Encerramento da Renovação */}
        {contract?.status === "Renovado" && (
          <div className="flex flex-col">
            <label htmlFor="dataEncerramentoRenovacao">Data de Encerramento da Renovação:</label>
            <input
              id="dataEncerramentoRenovacao"
              type="date"
              name="dataEncerramentoRenovacao"
              value={formatDate(contract?.DataEncerramentoRenovacao) || new Date().toISOString().split("T")[0]}
              onChange={onInputChange}
              disabled={!isEditable}
              className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
            />
          </div>
        )}

        {/* IPTU */}
        <div className="flex flex-col">
          <label htmlFor="iptuValue">IPTU:</label>
          <CurrencyInput
            id="iptuValue"
            name="iptu"
            placeholder="R$ 0,00"
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            decimalsLimit={2}
            maxLength={9}
            value={contract?.iptu || ""}
            onValueChange={(value) => onValueChange("iptu", parseFloat(value || "0"))}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Data de Pagamento */}
        <div className="flex flex-col">
          <label htmlFor="dataPagamento">Data de Pagamento:</label>
          <input
            id="dataPagamento"
            type="date"
            name="dataPagamento"
            value={contract?.dataPagamento ? contract.dataPagamento.split("T")[0] : ""}
            onChange={onInputChange}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Taxa Administrativa */}
        <div className="flex flex-col">
          <label htmlFor="adminFee">Taxa Administrativa:</label>
          <CurrencyInput
            id="adminFee"
            name="taxaAdm"
            placeholder="R$ 0,00"
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            decimalsLimit={2}
            maxLength={9}
            value={contract?.taxaAdm || ""}
            onValueChange={(value) => onValueChange("taxaAdm", parseFloat(value || "0"))}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Reajuste */}
        <div className="flex flex-col">
          <label htmlFor="valorReajuste">Valor de Reajuste:</label>
          <CurrencyInput
            id="valorReajuste"
            name="valorReajuste"
            placeholder="R$ 0,00"
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            decimalsLimit={2}
            maxLength={9}
            value={contract?.valorReajuste || ""}
            onValueChange={(value) => onValueChange("valorReajuste", parseFloat(value || "0"))}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Data de Reajuste */}
        <div className="flex flex-col">
          <label htmlFor="dataReajuste">Data de Reajuste:</label>
          <input
            id="dataReajuste"
            type="date"
            name="dataReajuste"
            value={contract?.dataReajuste ? contract.dataReajuste.split("T")[0] : ""}
            onChange={onInputChange}
            disabled={!isEditable}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>

        {/* Imóvel */}
        {isLoadingProperty && <p className="text-sm text-neutral-500 mt-1">Carregando...</p>}
        <div>
          <label>Imóvel</label>
          <select
            value={selectedPropertyId || ""}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
          >
            <option value="">Selecione um imóvel</option>
            {properties.map((imovel: any) => (
              <option key={imovel.imovelId} value={imovel.imovelId}>
                {imovel.nome || imovel.imovelId} {/* Exibe o nome ou ID do imóvel */}
              </option>
            ))}
          </select>
        </div>

        {/* Locador */}
        {isLoadingLessor && <p className="text-sm text-neutral-500 mt-1">Carregando...</p>}
        <div>
          <label>Locador</label>
          <select
            value={selectedLessorId || ""}
            onChange={(e) => setSelectedLessorId(e.target.value)}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
          >
            <option value="">Selecione um locador</option>
            {lessors.map((locador: any) => (
              <option key={locador.locadorId} value={locador.locadorId}>
                {locador.nomeCompletoLessor || locador.locadorId}
              </option>
            ))}
          </select>
        </div>

        {/* Locatário */}
        {isLoadingRenter && <p className="text-sm text-neutral-500 mt-1">Carregando...</p>}
        <div>
          <label>Locatário</label>
          <select
            value={selectedRenterId || ""}
            onChange={(e) => setSelectedRenterId(e.target.value)}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
          >
            <option value="">Selecione um locatário</option>
            {renters.map((locatario: any) => (
              <option key={locatario.locatarioId} value={locatario.locatarioId}>
                {locatario.nomeCompletoRenter || locatario.locatarioId}
              </option>
            ))}
          </select>
        </div>

        {/* Documentos */}
        <div className="w-full">
  <h3>Documentos</h3>
  {documentos.length > 0 ? (
    documentos.map((docUrl: string, index: number) => (
      <div
        key={index}
        className="relative bg-gray-100 mt-3 p-2 flex flex-col items-center rounded-[.5rem]"
      >
        <h4 className="text-neutral-800 mb-4">Documento {index + 1}</h4>
        <DocumentViewer fileUrl={docUrl} />

        {isEditable && (
          <button
            type="button"
            onClick={() => handleRemoveDocument(index)}
            className="absolute top-3 right-3 text-neutral-600 hover:text-neutral-800 duration-200 ease-in-out"
            aria-label={`Remover documento ${index + 1}`}
            title={`Remover documento ${index + 1}`}
          >
            <FaTrash size={24} />
          </button>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-500 mt-3">Nenhum documento associado.</p>
  )}
</div>


        {isEditable && <p className="cursor-pointer">Enviar documento</p>}

        {/* Botão Salvar Alterações */}
        {isEditable && <Botao label="Salvar Alterações" onClick={handleSave} />}
      </form>
    </>
  );
};
