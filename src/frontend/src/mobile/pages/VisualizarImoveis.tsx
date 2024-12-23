import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Imoveis/Card";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";

export default function MainPage() {

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
  }

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<Property[]>([]);

  const fetchProperties = async () => {
    try {
      // propriedades
      const response = await axiosInstance.get('property/Imoveis/PegarTodosImoveis');
      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }
  
      // separar string por vírgula
      const properties: Property[] = response.data;
      properties.forEach((property) => {
        if (typeof property.fotos === 'string') {
          property.fotos = property.fotos.split(",").map((foto) => foto.trim());
          }
      });
  
      // array apenas com os nomes dos objetos no Storage
      const allPhotos = properties.flatMap((property) => {
        if (!property.fotos || property.fotos.length === 0) {
          return []; // sem fotos
        }
        // Tirar o prefixo da URL
        return Array.isArray(property.fotos) ? property.fotos.map((foto) =>
          foto.replace("https://storage.googleapis.com/administradora-kk.appspot.com/", "")
        ) : [];
      });
  
      // Se não tiver foto já retorna
      if (allPhotos.length === 0) {
        setProperties(properties);
        setFilteredData(properties);
        return;
      }
  
      // Assinar as fotos
      const responsePhotos = await axiosInstance.post('property/Imoveis/AssinarFotos', allPhotos);
      if (!responsePhotos.data) {
        console.error("Dados de resposta inválidos do endpoint de assinatura");
        return;
      }
  
      const signedPhotos: string[] = responsePhotos.data;
  
      // Redistribuir as fotos assinadas para cada imóvel usando um offset -> idea do GPT
      let offset = 0;
      properties.forEach((property) => {
        if (!property.fotos) {
          return; // sem fotos
        }
  
        const count = property.fotos.length;
        // As fotos assinadas desse imóvel estão em [offset, offset + count)
        const signedSlice = signedPhotos.slice(offset, offset + count);
  
        // Atualiza as fotos do imóvel com as URLs assinadas
        property.fotos = signedSlice;
  
        // Avança o offset
        offset += count;
      });
  
      setProperties(properties);
      setFilteredData(properties);
  
    } catch (error: any) {
      console.error(error);
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProperties();
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
                  // console.log(property),
                  <Card
                  key={property.imovelId}
                  title={property.tipoImovel}
                  line1={property.bairro}
                  line2={property.endereco}
                  line3={`R$${property.valorImovel.toFixed(2)}`}
                  imageUrl={property.fotos && property.fotos.length > 0 ? property.fotos[0] : "../../../public/image.png"}
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
