import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Imoveis/Card";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import getTokenData from "../../services/tokenConfig";

export default function LocatarioPage() {
  const navigate = useNavigate();

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
    fotos: string | string[];
    onClick: () => void;
  }

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  // const [roleId, setRoleId] = useState<number | null>(null);

  const tokenData = getTokenData();
  const roleID = tokenData.RoleID;

  useEffect(() => {
    const fetchPropertiesForLocatario = async () => {
      if (!roleID) {
        console.error("Role ID is not available.");
        return;
      }

      try {
        const response = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorIdDoLocatario/${roleID}`
        );

        console.log(response.data);

        if (!response.data) {
          console.error("Invalid response data");
          return;
        }

        const imoveisData = response.data;

        // Arrumar imagens para serem exibidas
        // separar string por vírgula
        imoveisData.forEach((imovel: any) => {
          if(typeof imovel.fotos === "string") {
            imovel.fotos = imovel.fotos.split(";").map((foto: string) => foto.trim());
          }
        });

        // array apenas com os nomes dos objetos no Storage
        const allPhotos = imoveisData.flatMap((property: any) => 
          Array.isArray(property.fotos) 
            ? property.fotos.map((foto: string) => foto.replace("https://storage.googleapis.com/administradora-kk.appspot.com/", ""))
            : []
        );
        

        // Assinar as URLs das imagens
        const responsePhotos = await axiosInstance.post('property/Imoveis/AssinarFotos', allPhotos);
        if (!responsePhotos.data) {
          console.error("Dados de resposta inválidos do endpoint de assinatura");
          return;
        }

        const signedPhotos: string[] = responsePhotos.data;

        // Redistribuir as fotos assinadas para cada imóvel usando um offset
        let offset = 0;
        imoveisData.forEach((property: any) => {
          if (Array.isArray(property.fotos) && property.fotos.length > 0) {
            const count = property.fotos.length;
            property.fotos = signedPhotos.slice(offset, offset + count); // Atualiza com URLs assinadas
            offset += count; // Atualiza o offset
          } else {
            property.fotos = ["../../../public/ImovelSemFoto.png"]; // Define imagem padrão caso não existam fotos
          }
        });
        

        setProperties(imoveisData);
        setFilteredData(imoveisData);
      } catch (error: any) {
        console.error(error);
        showErrorToast(
          error?.response?.data?.message || "Erro ao se conectar com o servidor."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesForLocatario();
  }, [roleID]);

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <h2 className="text-2xl font-semibold">Imóveis Disponíveis para Locatário</h2>
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
            {filteredData.length === 0 ? (
              <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                Nenhum imóvel encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((property) => (
                  <Card
                    key={property.imovelId}
                    id={property.imovelId}
                    propertyType={property.tipoImovel}
                    neighborhood={property.bairro}
                    address={property.endereco}
                    postalCode={property.cep}
                    landlord="Proprietário Desconhecido"
                    tenant="Você"
                    imageSrc={property.fotos && property.fotos.length > 0 ? property.fotos[0] : "../../../public/ImovelSemFoto.png"}
                    price={`R$${property.valorImovel.toFixed(2)}`}
                    condominio={property.condominio?.toString() ?? "0"}
                    onClick={() => navigate(`/imovel/${property.imovelId}`)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </section>

      <Footer />
    </main>
  );
}
