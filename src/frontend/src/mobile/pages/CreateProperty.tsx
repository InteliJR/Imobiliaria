import React, { useState, useEffect, useCallback } from "react";
import FormField from "../../desktop/components/Form/FormField";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Loading from "../../components/Loading";
import Voltar from "../../components/Botoes/Voltar";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { getServiceUrl } from "../../services/apiService";
import debounce from "lodash.debounce";

export default function CreatePropertyMobile() {
  const [propertyType, setPropertyType] = useState("Kitnet");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [rent, setRent] = useState("");
  const [condoFee, setCondoFee] = useState("");
  const [description, setDescription] = useState("");
  const [locadorQuery, setLocadorQuery] = useState(""); // Para busca de locador
  const [locadorResults, setLocadorResults] = useState([]); // Resultados da consulta de locador
  const [locadorId, setLocadorId] = useState(null); // Armazena o ID do locador selecionado
  const [locatarioQuery, setLocatarioQuery] = useState(""); // Para busca de locatário
  const [locatarioResults, setLocatarioResults] = useState([]); // Resultados da consulta de locatário
  const [locatarioId, setLocatarioId] = useState(null); // Armazena o ID do locatário selecionado
  const [isLoadingLessor, setIsLoadingLessor] = useState(false); // Estado de carregamento da busca de locador
  const [isLoadingRenter, setIsLoadingRenter] = useState(false); // Estado de carregamento da busca de locatário
  const [loading, setLoading] = useState(false); // estado para controlar o componente de carregamento

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      console.log({
        propertyType,
        cep,
        address,
        complement,
        neighborhood,
        rent,
        condoFee,
        description,
        locadorId,
        locatarioId,
      });

      const response = await axiosInstance.post(
        getServiceUrl("propertyService", "/Imoveis/CriarUmNovoImovel"),
        {
          TipoImovel: propertyType,
          Cep: cep,
          Condominio: condoFee,
          ValorImovel: rent,
          Bairro: neighborhood,
          Descricao: description,
          Endereco: address,
          Complemento: complement,
          LocadorId: locadorId || null,
          LocatarioId: locatarioId || null,
        }
      );

      showSuccessToast(response?.data?.message || "Imóvel criado com sucesso!");

       // Limpar formulário após sucesso
       setPropertyType("Kitnet");
       setCep("");
       setAddress("");
       setComplement("");
       setNeighborhood("");
       setRent("");
       setCondoFee("");
       setDescription("");
       setLocadorQuery("");
       setLocadorResults([]);
       setLocadorId(null);
       setLocatarioQuery("");
       setLocatarioResults([]);
       setLocatarioId(null);
    } catch (error: any) {
      console.error(error);
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  // Função de busca de locadores no backend com debounce
  const fetchLocadorResults = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm) {
        setLocadorResults([]);
        return;
      }
      setIsLoadingLessor(true);
      try {
        // adicionar a requisição dos locatarios pelo termo buscado
        // const response = await axiosInstance.get(
        //   getServiceUrl("userService", "/Locadores/Buscar"),
        //   { params: { query: searchTerm } }
        // );
        // setLocadorResults(response.data || []);
        console.log("termo buscado:", searchTerm);
      } catch (error) {
        console.error("Erro ao buscar locadores:", error);
        showErrorToast("Erro ao buscar resultados.");
      } finally {
        setIsLoadingLessor(false);
      }
    }, 300),
    []
  );

  // Função de busca de locatários no backend com debounce
  const fetchLocatarioResults = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm) {
        setLocatarioResults([]);
        return;
      }
      setIsLoadingRenter(true);
      try {
        console.log("termo buscado:", searchTerm);
        // adicionar a requisição dos locatarios pelo termo buscado
        // const response = await axiosInstance.get(
        //   getServiceUrl("userService", "/Locatarios/Buscar"),
        //   { params: { query: searchTerm } }
        // );
        // setLocatarioResults(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar locatários:", error);
        showErrorToast("Erro ao buscar resultados.");
      } finally {
        setIsLoadingRenter(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchLocadorResults(locadorQuery);
  }, [locadorQuery, fetchLocadorResults]);

  useEffect(() => {
    fetchLocatarioResults(locatarioQuery);
  }, [locatarioQuery, fetchLocatarioResults]);

  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <Voltar />
        <h1 className="text-xl font-bold mt-6">
          Criar Imóvel
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-3 pb-5 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tipo do Imóvel */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                  Tipo do Imóvel
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="h-10 w-full flex-grow bg-transparent border border-neutral-200 focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded"
                >
                  <option>Kitnet</option>
                  <option>Apartamento</option>
                  <option>Casa</option>
                  <option>Comercial</option>
                </select>
              </div>

              <div>
                <FormField
                  label="CEP"
                  placeholder="Digite o CEP"
                  value={cep}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCep(e.target.value)
                  }
                />
              </div>

              <div>
                <FormField
                  label="Endereço"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <FormField
                  label="Complemento"
                  placeholder="Digite o complemento"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </div>

              <div>
                <FormField
                  label="Bairro"
                  placeholder="Bairro do imóvel"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField
                    label="Aluguel (R$)"
                    placeholder=""
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                  />
                </div>

                <div>
                  <FormField
                    label="Condomínio (R$)"
                    placeholder=""
                    value={condoFee}
                    onChange={(e) => setCondoFee(e.target.value)}
                  />
                </div>
              </div>

              {/* Locador*/}
              <FormField
                label="Locadores"
                placeholder="Digite para buscar"
                value={locadorQuery}
                onChange={(e) => setLocadorQuery(e.target.value)}
              />
              {isLoadingLessor && (
                <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
              )}
              {locadorResults.length > 0 && (
                <ul className="border border-neutral-200 rounded mt-2">
                  {locadorResults.map((locador: any) => (
                    <li
                      key={locador.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setLocadorQuery(locador.nome); // Atualiza o campo de texto com o nome do locador
                        setLocadorId(locador.id); // Define o ID do locador selecionado
                      }}
                    >
                      {locador.nome}
                    </li>
                  ))}
                </ul>
              )}

              {/* Locatário */}
              <div>
                <FormField
                  label="Locatário"
                  placeholder="Digite para buscar"
                  value={locatarioQuery}
                  onChange={(e) => setLocatarioQuery(e.target.value)}
                />
                {isLoadingRenter && (
                  <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
                )}
                {locatarioResults.length > 0 && (
                  <ul className="border border-neutral-200 rounded mt-2">
                    {locatarioResults.map((locatario: any) => (
                      <li
                        key={locatario.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setLocatarioQuery(locatario.nome); // Atualiza o campo de texto com o nome do locatário
                          setLocatarioId(locatario.id); // Define o ID do locatário selecionado
                        }}
                      >
                        {locatario.nome}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Descrição */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`h-20 flex-grow border border-neutral-200 focus:border-neutral-300 w-full p-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                  rows={3}
                ></textarea>
              </div>

              {/* Botão Confirmar */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none mt-4"
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loading type="spinner" />} {/* Spinner de carregamento */}
      <Footer />
    </div>
  );
}
