import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Imoveis/Card";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Properties() {
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate("/imoveis/criar");
  }

  interface Property {
    imovelId: number;
    tipoImovel: string;
    cep: string;
    condominio: number;
    valorImovel: number;
    bairro: string;
    descricao: string;
    endereco: string;
    complemento: string;
    locador: string;
    locatario: string;
    fotos: string | string[];
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

      console.log(users);

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
            users.find((user: { roleId: any }) => user.roleId === property.locadorId)?.nome || "Locador não encontrado";
  
          // Encontrando os dados do locatário
          const tenant =
            users.find((user: { roleId: any  }) => user.roleId === property.locatarioId)?.nome || "Locatário não encontrado";
  
          return {
            id: property.imovelId,
            address: `${property.endereco} ${property.complemento || ""}`.trim(),
            neighborhood: property.bairro,
            postalCode: property.cep,
            propertyType: property.tipoImovel,
            landlord: landlord,
            tenant: tenant,
            imageSrc: property.fotos,
            price: `R$ ${property.valorImovel.toLocaleString("pt-BR")}`,
            condominio: property.condominio != 0 ? `R$ ${property.condominio}` : "Este imóvel não tem condominio"
          };
        }
      );

      // Arrumar imagens para serem exibidas
      // separar string por vírgula
      mergedProperties.forEach((property: any) => {
        if (typeof property.imageSrc === 'string') {
          property.imageSrc = property.imageSrc.split(";").map((foto: string) => foto.trim());
        }
      });

      // array apenas com os nomes dos objetos no Storage
      const allPhotos = mergedProperties.flatMap((property: any) => {
        if (!property.imageSrc || property.imageSrc.length === 0) {
          return []; // sem fotos
        }
        // Tirar o prefixo da URL
        return Array.isArray(property.imageSrc) ? property.imageSrc.map((foto: string) =>
          foto.replace("https://storage.googleapis.com/administradora-kk.appspot.com/", "")
        ) : [];
      });

      // Assinar as URLs das imagens
      const responsePhotos = await axiosInstance.post('property/Imoveis/AssinarFotos', allPhotos);
      if (!responsePhotos.data) {
        console.error("Dados de resposta inválidos do endpoint de assinatura");
        return;
      }
      
      const signedPhotos: string[] = responsePhotos.data;
      
      // Redistribuir as fotos assinadas para cada imóvel usando um offset
      let offset = 0;
      mergedProperties.forEach((property: any) => {
        if (!property.imageSrc) {
          return; // sem fotos
        }
      
        const count = property.imageSrc.length;
        // As fotos assinadas desse imóvel estão em [offset, offset + count)
        const signedSlice = signedPhotos.slice(offset, offset + count);
      
        // Atualiza as fotos do imóvel com as URLs assinadas
        property.imageSrc = signedSlice;
      
        // Avança o offset
        offset += count;
      });

      setProperties(mergedProperties);
      setLoading(false); // Caso a requisição dos dados tenha sido bem sucedida
      setFilteredData(mergedProperties);
      console.log(mergedProperties);
    } catch (error: any) {
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
          onClick={handleRedirection}
        >
          Cadastrar Imóvel
        </button>
        <h2 className="text-2xl font-semibold">Imóveis</h2>
        <form className="grid grid-cols-1 gap-4">
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
              <FormFieldFilter
                label="Buscar imóvel"
                onFilter={(searchTerm) => {
                  const filtered = properties.filter((property) =>
                    property.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.tipoImovel.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setFilteredData(filtered);
                }}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
            >
              Filtrar
              <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>
        </form>

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
                  price={property.price}
                  condominio={property.condominio} 
                  imageSrc={property.imageSrc && property.imageSrc.length > 0 ? property.imageSrc[0] : "../../../public/image.png"}
                  />
                  
              );
            })}
          </div>
        )}
          </section>
        )}
      </section>

      <Footer />
    </main>
  );
}
