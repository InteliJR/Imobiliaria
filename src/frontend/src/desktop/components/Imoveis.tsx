import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./CardImovel";
import Loading from "../../components/Loading";
import FilterIcon from "/Filter.svg";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import { GenericFilterModal } from "../../components/Filter/Filter";
import { IFilterField } from "../../components/Filter/InputsInterfaces";
import { IProperty } from "../../components/Filter/PropertyInterfaces.ts";

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
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [advancedFiltered, setAdvancedFiltered] = useState<any[]>([]);

  // Busca textual
  const [search, setSearch] = useState("");

  // Controle do modal
  const [isModalOpen, setModalOpen] = useState(false);

  const PropertyFilterFields: IFilterField<IProperty>[] = [
    {
      name: "tipoImovel",
      label: "Tipo de Imóvel",
      type: "select",
      options: ["Casa", "Apartamento", "Sala Comercial", "Loja"],
      property: "propertyType",
    },
    { name: "bairro", label: "Bairro", type: "text", property: "neighborhood" },
    { name: "endereco", label: "Endereço", type: "text", property: "address" },
    { name: "valorImovel", label: "Valor do Imóvel", type: "number", property: "price" },
    { name: "condominio", label: "Condomínio", type: "number", property: "condominio" },
    { name: "locador", label: "Locador", type: "text", property: "landlord" },
    { name: "locatario", label: "Locatário", type: "text", property: "tenant" },

  ];


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
            price: property.valorImovel,
            condominio: property.condominio != 0 ? property.condominio : "Este imóvel não tem condominio"
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
      setData(mergedProperties);
      setAdvancedFiltered(mergedProperties);
      console.log(mergedProperties);
    } catch (error: any) {
      console.error(error);
      showErrorToast("Erro ao se conectar com o servidor.");
    }
  };

  useEffect(() => {
    // Se search estiver vazio, "filteredData" = "advancedFiltered"
    if (!search.trim()) {
      setFilteredData(advancedFiltered);
      return;
    }
    const lower = search.toLowerCase();
    const finalResult = advancedFiltered.filter((property: any) =>
      property.postalCode?.toLowerCase().includes(lower)
    );
    setFilteredData(finalResult);
  }, [search, advancedFiltered]);


  // Abrir modal
  const openFilterModal = () => {
    setModalOpen(true);
  };

  // Callback do modal que ao clicar em "Buscar" já recebemos a array filtrada
  const handleFilteredResult = (resultado: any[]) => {
    // Esse "resultado" já está filtrado pelos campos avançados
    setAdvancedFiltered(resultado);
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
              label="Buscar imóvel pelo cep"
              onFilter={(searchTerm) => {
                setSearch(searchTerm);
              }}
            />
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center hover:bg-neutral-800 gap-2 px-6 h-10 bg-[#1F1E1C] text-neutral-50 text-sm font-medium rounded"
          onClick={openFilterModal}
        >
          Filtrar
          <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
        </button>
      </form>

      <GenericFilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        fields={PropertyFilterFields}
        data={data}
        onFilteredResult={handleFilteredResult}
      />

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
                  imageSrc={property.imageSrc && property.imageSrc.length > 0 ? property.imageSrc[0] : "/ImovelSemFoto.png"}
                  price={`R$ ${property.price}`}
                  condominio={`R$ ${property.condominio}`}/>
                );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
