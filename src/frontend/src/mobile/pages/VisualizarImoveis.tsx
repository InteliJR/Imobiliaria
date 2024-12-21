import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Imoveis/Card";
import FormField from "../components/Form/FormField";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";

export default function Properties() {
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

  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento
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
            price: `R$ ${property.valorImovel.toLocaleString("pt-BR")}`,
            condominio: property.condominio != 0 ? `R$ ${property.condominio}` : "Este imóvel não tem condominio"
          };
        }
      );
  
      // Atualizando os estados com os dados mesclados
      setProperties(mergedProperties);
      setLoading(false); // Caso a requisição dos dados tenha sido bem sucedida
      setFilteredData(mergedProperties);
      console.log(mergedProperties);
  
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
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />
        <button
          type="submit"
          className="w-full h-10 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
        >
          Cadastrar Imóvel
        </button>
        <h2 className="text-2xl font-semibold">Imóveis</h2>
        <form className="grid grid-cols-1 gap-4">
          {/* Linha com FormField e botão Filtrar ocupando toda a largura */}
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
              <FormField
                label="Buscar imóvel"
                onChange={() => {}} // Função onChange vazia
                value={""}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
            >
              Filtrar
              {/* Ícone SVG importado */}
              <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>
        </form>
        {/* Cards */}
        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <section className="flex-grow flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">Resultados</h2>
            <div className="h-[1px] bg-black"></div>
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
        )}
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
