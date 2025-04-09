import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import DocumentViewer from "../DocumentViewer";
import Botao from "../Botoes/Botao";
// import { Contract } from "../../mobile/pages/ContractView";
import { FaTrash } from "react-icons/fa";
import { ContractFormProps } from '../../types';
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";

export const ContractForm: React.FC<ContractFormProps> = ({
  contract,
  isEditable,
  properties,
  lessors,
  renters,
  selectedPropertyId,
  // status,
  // DataReajuste,
  selectedLessorId,
  selectedRenterId,
  isLoadingProperty,
  isLoadingLessor,
  isLoadingRenter,
  onInputChange,
  onValueChange,
  setSelectedPropertyId,
  setSelectedLessorId,
  setSelectedRenterId,
  handleSave,
}) => {
  useEffect(() => {
    // console.log('Lessors data:', lessors);
    // console.log('Renters data:', renters);
  }, [lessors, renters]);

  const handleRemoveDocument = async (index: number) => {
    if (!contract) return;
    const updatedDocuments = [...(contract.documentos ?? [])];
    const documentToRemove = updatedDocuments[index];
    
    try {
      // Chama o endpoint para deletar o documento
      await axiosInstance.delete(`property/Contratos/DeletarDocumento/${contract.contratoId}`, {
        params: {
          documentUrl: documentToRemove
        }
      });
      
      // Remove o documento do array local
      updatedDocuments.splice(index, 1);
      onValueChange("documentos", updatedDocuments);
      
      toast.success("Documento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover documento:", error);
      toast.error("Erro ao remover documento. Por favor, tente novamente.");
    }
  };

  if (!contract) {
    return <p>Contrato não encontrado.</p>;
  }

  const documentos = contract?.documentos
    ? (typeof contract.documentos === "string" 
        ? [contract.documentos] 
        : contract.documentos.map(doc => 
            doc.startsWith('https://') 
              ? doc 
              : `https://storage.googleapis.com/administradora-kk.appspot.com/${doc}`
          )
      )
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
            onChange={(e) => setSelectedPropertyId??(e.target.value)}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
          >
            <option value="">Selecione um imóvel</option>
            {properties.map((imovel) => (
              <option key={imovel.imovelId} value={imovel.imovelId}>
                {imovel.nome || imovel.imovelId}
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
            onChange={(e) => setSelectedLessorId??(e.target.value)}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
          >
            <option value="">Selecione um locador</option>
            {lessors.map((locador) => (
              <option key={locador.locadorId} value={locador.locadorId}>
                {locador.nomeCompletoLocador}
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
            onChange={(e) => setSelectedRenterId??(e.target.value)}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
          >
            <option value="">Selecione um locatário</option>
            {renters.map((locatario) => (
              <option key={locatario.locatarioId} value={locatario.locatarioId}>
                {locatario.nomeCompletoLocatario}
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


{isEditable && (
  <div className="mt-2">
    <input
      type="file"
      id="document-upload"
      className="hidden"
      onChange={async (e) => {
        if (!e.target.files || !contract?.contratoId) return;
        
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          const response = await axiosInstance.post(
            `property/Contratos/UploadDocumento/${contract.contratoId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
          
          // Atualiza a lista de documentos
          const newDocUrl = response.data.documentUrl;
          
          // Trata o documentos atual corretamente seja string ou array
          let currentDocs: string | number | any[] = [];
          if (contract.documentos) {
            if (typeof contract.documentos === 'string') {
              currentDocs = (contract.documentos as string).split(/[;,]/).filter(Boolean);
            } else if (Array.isArray(contract.documentos)) {
              currentDocs = [...contract.documentos];
            }
          }
          
          // Adiciona o novo documento
          currentDocs.push(newDocUrl);
          
          // Atualiza o contrato com os novos documentos
          onValueChange("documentos", currentDocs);
          
          toast.success("Documento enviado com sucesso!");
          // Limpa o input
          e.target.value = '';
        } catch (error) {
          console.error("Erro ao enviar documento:", error);
          toast.error("Erro ao enviar documento. Tente novamente.");
        }
      }}
    />
    <button
      type="button"
      onClick={() => document.getElementById('document-upload')?.click()}
      className="flex items-center gap-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
      </svg>
      Enviar documento
    </button>
  </div>
)}

        {/* Botão Salvar Alterações */}
        {isEditable && <Botao label="Salvar Alterações" onClick={handleSave} />}
      </form>
    </>
  );
};
