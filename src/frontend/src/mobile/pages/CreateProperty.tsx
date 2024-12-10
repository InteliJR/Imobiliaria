import React, { useState, useEffect, useCallback } from "react";
import FormField from "../../desktop/components/Form/FormField";
import Navbar from "../components/Navbar/Navbar";
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
  const [query, setQuery] = useState(""); // Para a busca
  const [results, setResults] = useState([]); // Resultados da consulta
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [locadorId, setLocadorId] = useState(null); // Armazena o ID do locador selecionado

  const handleSubmit = async (e: any) => {
    e.preventDefault();

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
          LocadorId: locadorId || null, // Adiciona o LocadorId no envio
        }
      );

      showSuccessToast(response?.data?.message || "Imóvel criado com sucesso!");
    } catch (error: any) {
      console.error(error);

      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
    }
  };

  // Função de busca no backend com debounce
  const fetchResults = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        // adicionar requisição dos locadores correspondentes ao termo buscado.
        // const response = await axiosInstance.get(
        //   getServiceUrl("userService", "/Locadores/Buscar"), // Endpoint para buscar locadores
        //   { params: { query: searchTerm } }
        // );
        // setResults(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar locadores:", error);
        showErrorToast("Erro ao buscar resultados.");
      } finally {
        setIsLoading(false);
      }
    }, 300), // debounce (delay)
    []
  );

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]);

  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <h1 className="text-xl font-bold text-yellow-darker mb-2">
          Criar Imóvel
        </h1>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-6 bg-white rounded-lg">
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
              <div>
                <FormField
                  label="Pesquisar Locadores"
                  placeholder="Digite para buscar"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {isLoading && (
                  <p className="text-sm text-neutral-500 mt-1">Carregando...</p>
                )}
                {results.length > 0 && (
                  <ul className="border border-neutral-200 rounded mt-2">
                    {results.map((locador: any) => (
                      <li
                        key={locador.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setQuery(locador.nome); // Atualiza o campo de texto com o nome do locador
                          setLocadorId(locador.id); // Define o ID do locador selecionado
                        }}
                      >
                        {locador.nome}
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
                  className={`h-20 flex-grow bg-transparent border border-black w-full focus:outline-none p-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
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
    </div>
  );
}
