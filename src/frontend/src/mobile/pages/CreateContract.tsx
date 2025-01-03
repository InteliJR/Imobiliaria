import React, { useState, useEffect } from "react";
import FormField from "../../desktop/components/Form/FormField";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Loading from "../../components/Loading";
import Voltar from "../../components/Botoes/Voltar";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import axios from "axios";
import CurrencyInput from "react-currency-input-field"; // máscara de valores monetários

export default function CreateContractMobile() {
  const [rentalValue, setRentalValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guaranteeType, setGuaranteeType] = useState("Caução");
  const [specialConditions, setSpecialConditions] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [iptu, setIptu] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [adminFee, setAdminFee] = useState("");
  const [terminationDate, setTerminationDate] = useState("");
  const [renewed, setRenewed] = useState(false);
  const [renewalEndDate, setRenewalEndDate] = useState("");
  const [adjustmentValue, setAdjustmentValue] = useState("");
  const [documents, setDocuments] = useState<File[] | null>([]);
  const [locatarioEmail, setLocatarioEmail] = useState("");
  const [locadorEmail, setLocadorEmail] = useState("");

  // Estados relacionados à busca em outras tabelas
  const [isLoadingLessor, setIsLoadingLessor] = useState(false);
  const [isLoadingRenter, setIsLoadingRenter] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const [locadores, setLocadores] = useState([]); // Lista de locadores
  const [locatarios, setLocatarios] = useState([]); // Lista de locatários
  const [imoveis, setImoveis] = useState([]);

  const [selectedLocadorId, setSelectedLocadorId] = useState<string | null>(
    null
  );
  const [selectedLocatarioId, setSelectedLocatarioId] = useState<string | null>(
    null
  );
  const [selectedImovelId, setSelectedImovelId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingLessor(true);
        setIsLoadingRenter(true);
        setIsLoadingProperty(true);
        const locadoresResponse = await axiosInstance.get(
          "auth/Locador/PegarTodosLocadores"
        );
        const locatariosResponse = await axiosInstance.get(
          "auth/Locatario/PegarTodosLocatarios"
        );
        const imoveisResponse = await axiosInstance.get(
          "property/Imoveis/PegarTodosImoveis"
        );
        setLocadores(locadoresResponse.data || []);
        setLocatarios(locatariosResponse.data || []);
        setImoveis(imoveisResponse.data || []);
        console.log(
          locadoresResponse.data,
          locatariosResponse.data,
          imoveisResponse.data
        );
      } catch (error) {
        showErrorToast("Erro ao carregar locadores, locatários e imoveis.");
      } finally {
        setIsLoadingLessor(false);
        setIsLoadingRenter(false);
        setIsLoadingProperty(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // Converter para array
      console.log("Arquivos selecionados:", filesArray); // Log para verificar os arquivos
      setDocuments(filesArray); // Atualize o estado
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificações de validação
    if (
      !rentalValue.trim() ||
      !startDate.trim() ||
      !endDate.trim() ||
      !iptu.trim() ||
      !paymentDate.trim() ||
      !adminFee.trim() ||
      !guaranteeType.trim() ||
      !selectedLocadorId ||
      !selectedLocatarioId ||
      !selectedImovelId
    ) {
      showErrorToast("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("valor_aluguel", rentalValue);
      formData.append("data_inicio", startDate);
      formData.append("data_encerramento", endDate);
      formData.append("tipo_garantia", guaranteeType);
      formData.append("condicoes_especiais", specialConditions);
      formData.append("status", status);
      formData.append("iptu", iptu);
      formData.append("data_pagamento", paymentDate);
      formData.append("taxa_adm", adminFee);
      formData.append("data_rescisao", terminationDate || "");
      formData.append("renovado", renewed ? "true" : "false");
      formData.append("data_encerramento_renovacao", renewalEndDate || "");
      formData.append("valor_reajuste", adjustmentValue);
      formData.append("locadorid", selectedLocadorId || "");
      formData.append("locatarioid", selectedLocatarioId || "");
      formData.append("imovelid", selectedImovelId || "");

      // formData.append("files", documents || "");

      documents?.forEach((document) => formData.append("files", document));

      const response = await axiosInstance.post(
        `property/Contratos/CriarContratoComMultiplosArquivos?emailLocatario=${encodeURIComponent(
          locatarioEmail
        )}&emailLocador=${encodeURIComponent(locadorEmail)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showSuccessToast(
        response?.data?.message || "Contrato criado com sucesso!"
      );

      // Limpa formulário
      setRentalValue("");
      setStartDate("");
      setEndDate("");
      setGuaranteeType("Caução");
      setSpecialConditions("");
      setStatus("Ativo");
      setIptu("");
      setPaymentDate("");
      setAdminFee("");
      setTerminationDate("");
      setRenewed(false);
      setRenewalEndDate("");
      setAdjustmentValue("");
      setDocuments([]);
      setLocadorEmail("");
      setLocatarioEmail("");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(
          error.response.data?.message || "Erro ao criar o contrato."
        );
      } else {
        showErrorToast("Erro ao criar o contrato.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-custom">
      <Navbar />
      <section className="section-custom">
        <Voltar />
        <h1 className="text-xl font-bold mt-6">Criar Contrato</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-3 pb-5 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="locatarioEmail"
                  className="text-sm text-neutral-600 mb-1"
                >
                  Email do Locatário
                </label>
                <input
                  type="email"
                  id="locatarioEmail"
                  name="locatarioEmail"
                  placeholder="Email do Locatário"
                  value={locatarioEmail}
                  onChange={(e) => setLocatarioEmail(e.target.value)}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                />
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="locadorEmail"
                  className="text-sm text-neutral-600 mb-1"
                >
                  Email do Locador
                </label>
                <input
                  type="email"
                  id="locadorEmail"
                  name="locadorEmail"
                  placeholder="Email do Locador"
                  value={locadorEmail}
                  onChange={(e) => setLocadorEmail(e.target.value)}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                />
              </div>

              {/* Valor do Aluguel */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="rentalValue"
                  className="text-sm text-neutral-600 mb-1"
                >
                  Valor do Aluguel (R$)
                </label>
                <CurrencyInput
                  id="rentalValue"
                  name="rentalValue"
                  placeholder="R$ 0,00"
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  decimalsLimit={2}
                  maxLength={9}
                  value={rentalValue}
                  onValueChange={(newValue) => setRentalValue(newValue || "")}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                />
              </div>

              <FormField
                label="Data de Início"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              
              <FormField
                label="Data de Encerramento"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {/* IPTU */}
              <div className="flex flex-col w-full">
                <label htmlFor="iptu" className="text-sm text-neutral-600 mb-1">
                  IPTU (R$)
                </label>
                <CurrencyInput
                  id="iptu"
                  name="iptu"
                  placeholder="R$ 0,00"
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  decimalsLimit={2}
                  maxLength={9}
                  value={iptu}
                  onValueChange={(newValue) => setIptu(newValue || "")}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                />
              </div>
              <FormField
                label="Data de Pagamento"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
              {/* Taxa Administrativa */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="adminFee"
                  className="text-sm text-neutral-600 mb-1"
                >
                  Taxa Administrativa (R$)
                </label>
                <CurrencyInput
                  id="adminFee"
                  name="adminFee"
                  placeholder="R$ 0,00"
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  decimalsLimit={2}
                  maxLength={9}
                  value={adminFee}
                  onValueChange={(newValue) => setAdminFee(newValue || "")}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                />
              </div>
              {/* Valor de Reajuste */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="adjustmentValue"
                  className="text-sm text-neutral-600 mb-1"
                >
                  Valor de Reajuste (R$)
                </label>
                <CurrencyInput
                  id="adjustmentValue"
                  name="adjustmentValue"
                  placeholder="R$ 0,00"
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  decimalsLimit={2}
                  maxLength={9}
                  value={adjustmentValue}
                  onValueChange={(newValue) =>
                    setAdjustmentValue(newValue || "")
                  }
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                />
              </div>
              <FormField
                label="Condições Especiais"
                value={specialConditions}
                onChange={(e) => setSpecialConditions(e.target.value)}
              />
              <FormField
                label="Garantia"
                value={guaranteeType}
                onChange={(e) => setGuaranteeType(e.target.value)}
              />

              {/* Imóvel */}
              {isLoadingProperty && (
                <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
              )}
              <div>
                <label className="block text-neutral-600">Imóvel</label>
                <select
                  value={selectedLocadorId || ""}
                  onChange={(e) => setSelectedImovelId(e.target.value)}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
                >
                  <option value="">Selecione um imóvel</option>
                  {imoveis.map((imovel: any) => (
                    <option key={imovel.imovelId} value={imovel.imovelId}>
                      {imovel.imovelId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Locador */}
              {isLoadingLessor && (
                <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
              )}
              <div>
                <label className="block text-neutral-600">Locador</label>
                <select
                  value={selectedLocadorId || ""}
                  onChange={(e) => setSelectedLocadorId(e.target.value)}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
                >
                  <option value="">Selecione um locador</option>
                  {locadores.map((locador: any) => (
                    <option key={locador.locadorId} value={locador.locadorId}>
                      {locador.nomeCompletoLocador}
                    </option>
                  ))}
                </select>
              </div>

              {/* Locatário */}
              {isLoadingRenter && (
                <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
              )}
              <div>
                <label className="block text-neutral-600">Locatário</label>
                <select
                  value={selectedLocatarioId || ""}
                  onChange={(e) => setSelectedLocatarioId(e.target.value)}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm bg-white"
                >
                  <option value="">Selecione um locatário</option>
                  {locatarios.map((locatario: any) => (
                    <option
                      key={locatario.locatarioId}
                      value={locatario.locatarioId}
                    >
                      {locatario.nomeCompletoLocatario}
                    </option>
                  ))}
                </select>
              </div>

              {/* Envio de documentos: */}
              <div className="flex flex-col">
                {/* Label com fonte de 13px e margem inferior de 5px */}
                <label className="block text-neutral-600">Documento</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="h-10 flex-grow mt-1 block w-full rounded-md px-2 text-neutral-700 shadow-sm focus:border-neutral-300 cursor-pointer"
                  multiple
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none mt-4"
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </section>
      {isLoading && <Loading type="spinner" />}
      <Footer />
    </main>
  );
}
