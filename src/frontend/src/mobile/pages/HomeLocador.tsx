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
// import { jwtDecode } from "jwt-decode";
import getTokenData from "../../services/tokenConfig";

export default function MainPage() {

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
    onClick: () => void;  
  }

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  const [locadorId, setLocadorId] = useState<number | null>(null);

  
  const tokenData = getTokenData();
  console.log(tokenData);
  const userId = tokenData.UserID;
  console.log(userId);
  
  useEffect(() => {
    const fetchLocadorId = async () => {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }
  
      try {
        const response = await axiosInstance.get(
          `auth/Locador/PegarLocadorPorUserId/${userId}`
        );
  
        if (!response.data) {
          console.error("Dados de resposta inválidos");
          return;
        }
  
        setLocadorId(response.data.locadorId);
      } catch (error: any) {
        console.error(error);
        showErrorToast(
          error?.response?.data?.message || "Erro ao se conectar com o servidor."
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchLocadorId();
  }, [userId]);
  
  useEffect(() => {
    if (locadorId === null) return; // Wait until locadorId is set
  
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorIdDoLocador/${locadorId}`
        );
  
        if (!response.data) {
          console.error("Dados de resposta inválidos");
          return;
        }
  
        setProperties(response.data);
        console.log("Este é o valor de property: ", properties);
        setFilteredData(response.data);
      } catch (error: any) {
        console.error(error);
        showErrorToast(
          error?.response?.data?.message || "Erro ao se conectar com o servidor."
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, [locadorId]);
  
  useEffect(() => {
    const tokenData = getTokenData();
    console.log(tokenData);
  
    if (tokenData) {
      const userId = tokenData.UserID; // Case-sensitive check
      if (!userId) {
        console.error("User ID is not available in the token.");
      } else {
        console.log(userId);
      }
    }
  }, []);

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <h2 className="text-2xl font-semibold">Seus Imóveis</h2>
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
                    landlord="Fulano de Tal"          // or property.landlord if it exists
                    tenant={null}                     // or property.tenant if it exists
                    imageSrc="/imovel.png"
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
