import React, { useState, useCallback, useEffect } from "react";
import FormField from "../../desktop/components/Form/FormField";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Loading from "../../components/Loading";
import Voltar from "../../components/Botoes/Voltar";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import axios from "axios";
import CurrencyInput from "react-currency-input-field"; // máscara de valores monetários
import { getServiceUrl } from "../../services/apiService";
import debounce from "lodash.debounce";

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
  const [documents, setDocuments] = useState<File | null>(null);

  // Estados relacionados à busca em outras tabelas
  const [lessorQuery, setLessorQuery] = useState("");
  const [lessorResults, setLessorResults] = useState([]);
  const [lessorId, setLessorId] = useState(null);
  const [renterQuery, setRenterQuery] = useState("");
  const [renterResults, setRenterResults] = useState([]);
  const [renterId, setRenterId] = useState(null);
  const [propertyQuery, setPropertyQuery] = useState("");
  const [propertyResults, setPropertyResults] = useState([]);
  const [propertyId, setPropertyId] = useState(null);
  const [isLoadingLessor, setIsLoadingLessor] = useState(false);
  const [isLoadingRenter, setIsLoadingRenter] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
      !lessorId ||
      !renterId ||
      !propertyId
    ) {
      showErrorToast(
        "Por favor, preencha todos os campos."
      );
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("documents", documents || "");
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
      formData.append("locadorid", lessorId || "");
      formData.append("locatarioid", renterId || "");
      formData.append("imovelid", propertyId || "");

      const response = await axiosInstance.post(
        getServiceUrl("contractService", "/Contratos/CriarUmNovoContrato"),
        formData
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
      setDocuments(null);
      setLessorQuery("");
      setLessorResults([]);
      setLessorId(null);
      setRenterQuery("");
      setRenterResults([]);
      setRenterId(null);
      setPropertyQuery("");
      setPropertyResults([]);
      setPropertyId(null);
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

  const fetchResults = useCallback(
    debounce(async (query, setResults, serviceUrl) => {
      if (!query) {
        setResults([]);
        return;
      }

      try {
        const response = await axiosInstance.get(serviceUrl, {
          params: { query },
        });
        setResults(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
        showErrorToast("Erro ao buscar resultados.");
      }
    }, 300),
    []
  );

  useEffect(() => {
    setIsLoadingLessor(true);
    setIsLoadingLessor(false);

    fetchResults(
      lessorQuery,
      setLessorResults,
      getServiceUrl("userService", "/Locadores/Buscar")
    );
  }, [lessorQuery, fetchResults]);

  useEffect(() => {
    setIsLoadingRenter(true);
    fetchResults(
      renterQuery,
      setRenterResults,
      getServiceUrl("userService", "/Locatarios/Buscar")
    );
    setIsLoadingRenter(false);
  }, [renterQuery, fetchResults]);

  useEffect(() => {
    setIsLoadingProperty(true);
    fetchResults(
      propertyQuery,
      setPropertyResults,
      getServiceUrl("propertyService", "/Imoveis/Buscar")
    );
    setIsLoadingProperty(false);
  }, [propertyQuery, fetchResults]);

  return (
    <main className="main-custom">
      <Navbar />
      <section className="section-custom">
        <Voltar />
        <h1 className="text-xl font-bold mt-6">Criar Contrato</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-3 pb-5 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <FormField
                label="Imóvel"
                placeholder="Digite para buscar"
                value={propertyQuery}
                onChange={(e) => setPropertyQuery(e.target.value)}
              />
              {isLoadingProperty && (
                <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
              )}
              {propertyResults.length > 0 && (
                <ul className="border border-neutral-200 rounded mt-2">
                  {propertyResults.map((property: any) => (
                    <li
                      key={property.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setPropertyQuery(property.nome);
                        setPropertyId(property.id);
                      }}
                    >
                      {property.nome}
                    </li>
                  ))}
                </ul>
              )}
              {/* Locador */}
              <FormField
                label="Locador"
                placeholder="Digite para buscar"
                value={lessorQuery}
                onChange={(e) => setLessorQuery(e.target.value)}
              />
              {isLoadingLessor && (
                <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
              )}
              {lessorResults.length > 0 && (
                <ul className="border border-neutral-200 rounded mt-2">
                  {lessorResults.map((lessor: any) => (
                    <li
                      key={lessor.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setLessorQuery(lessor.nome);
                        setLessorId(lessor.id);
                      }}
                    >
                      {lessor.nome}
                    </li>
                  ))}
                </ul>
              )}
              {/* Locatário */}
              <FormField
                label="Locatário"
                placeholder="Digite para buscar"
                value={renterQuery}
                onChange={(e) => setRenterQuery(e.target.value)}
              />
              {isLoadingRenter && (
                <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
              )}
              {renterResults.length > 0 && (
                <ul className="border border-neutral-200 rounded mt-2">
                  {renterResults.map((renter: any) => (
                    <li
                      key={renter.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setRenterQuery(renter.nome);
                        setRenterId(renter.id);
                      }}
                    >
                      {renter.nome}
                    </li>
                  ))}
                </ul>
              )}
              {/* Envio de documentos: */}
              <div className="flex flex-col">
                {/* Label com fonte de 13px e margem inferior de 5px */}
                <label className="block text-neutral-600">Documento</label>
                <input
                  type="file"
                  onChange={(e) => setDocuments(e.target.files?.[0] ?? null)}
                  className="h-10 flex-grow mt-1 block w-full rounded-md px-2 text-neutral-700 shadow-sm focus:border-neutral-300 cursor-pointer"
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
