//TEM QUE ARRUMAR A PARTE DE FILTRAGEM PARA QUE O USUÁRIO CONSIGA FAZER UMA PESQUISA DENTRO DO CONTEXTO DE IMÓVEIS
// INCLUSIVE ESSE REQUISITO JÁ ESTA IMPLEMENTADO DENTRO DO COMPONENTE DE CHAMADOS

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./CardImovel";
import Loading from "../../components/Loading";
import FilterIcon from "/Filter.svg";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import FormFieldFilter from "../components/Form/FormFieldFilter";

export default function Imoveis() {
  interface Property {
    id: number;
    address: string;
    neighborhood: string;
    postalCode: string;
    propertyType: string;
    landlord: string;
    tenant: string | null;
    imageSrc: string;
    price: string;
    condominio: string;
  }
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const fetchProperties = async () => {
    try {
      const propertiesResponse = await axiosInstance.get(
        "property/Imoveis/PegarTodosImoveis"
      );
      const usersResponse = await axiosInstance.get(
        "auth/User/PegarTodosUsuarios"
      );
  
      if (!propertiesResponse.data || !usersResponse.data) {
        console.error("Dados de resposta inválidos");
        return;
      }
  
      const properties = propertiesResponse.data;
      const users = usersResponse.data;
  
      // Mesclando os dados de imóveis com locador e locatário
      const mergedProperties = properties.map(
        (property: {
          imovelId: any;
          endereco: string;
          bairro: string;
          cep: string;
          tipoImovel: string;
          locadorId: any;
          locatarioId: any;
          fotos: any;
          valorImovel: any;
          condominio: any;
          complemento: any;
        }) => {
          // Encontrando os dados do locador
          const landlord =
            users.find((user: { usuarioId: any }) => user.usuarioId === property.locadorId)?.nome || "Locador não encontrado";
  
          // Encontrando os dados do locatário
          const tenant =
            users.find((user: { usuarioId: any }) => user.usuarioId === property.locatarioId)?.nome || "Locatário não encontrado";
  
          return {
            id: property.imovelId,
            address: `${property.endereco} ${property.complemento || ""}`.trim(),
            neighborhood: property.bairro,
            postalCode: property.cep,
            propertyType: property.tipoImovel,
            landlord: landlord,
            tenant: tenant,
            imageSrc: property.fotos?.[0]?.url || "/imovel.png", // Suporte para foto do backend ou imagem padrão
            price: `R$ ${property.valorImovel.toLocaleString("pt-BR")} | R$ ${
              property.condominio ? property.condominio.toLocaleString("pt-BR") : 0
            }`,
          };
        }
      );
  
      // Atualizando os estados com os dados mesclados
      setProperties(mergedProperties);
      setLoading(false); // Caso a requisição dos dados tenha sido bem sucedida
      setFilteredData(mergedProperties);
  
    } catch (error) {
      console.error(error);
      showErrorToast("Erro ao se conectar com o servidor.");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await fetchProperties();
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-neutral-800">Imóveis</h2>
        <button
          type="button"
          className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
          onClick={() => navigate("/imoveis/criar")}
        >
          Adicionar
        </button>
      </div>

      {/* Formulário */}
      <form className="flex items-end gap-4 mb-6">
        <div className="flex-grow">
          <div className="w-full">
            <FormFieldFilter
              label="Buscar chamado"
              onFilter={(searchTerm) => {
                // console.log(searchTerm);
                const filtered = properties.filter((properties) =>
                  properties.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                );
                setFilteredData(filtered);
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center hover:bg-neutral-800 gap-2 px-6 h-10 bg-[#1F1E1C] text-neutral-50 text-sm font-medium rounded"
        >
          Filtrar
          <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
        </button>
      </form>


      {/* Cards */}
      <section className="flex flex-col gap-y-5">
        <h2 className="text-2xl font-semibold">Resultados</h2>
        <div className="h-[1px] bg-neutral-400 mb-4"></div>
        {loading ? (
          <Loading type="skeleton" />
        ) : properties.length === 0 ? (
          <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
            Nenhum imóvel encontrado.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredData.map((property) => {
              return (
                <Card
                  key={property.id}
                  id={property.id}
                  address={property.address}
                  neighborhood={property.neighborhood}
                  postalCode={property.postalCode}
                  propertyType={property.propertyType}
                  landlord={property.landlord}
                  tenant={property.tenant}
                  imageSrc={property.imageSrc}
                  price={property.price}
                  condominio={property.condominio} />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
