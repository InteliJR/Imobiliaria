import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";

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
}

export default function PropertyDetails() {
  const { imovelId } = useParams<{ imovelId: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPropertyDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `property/Imoveis/PegarImovelPorIdComVerificacao/${imovelId}`
      );

      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      setProperty(response.data);
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
    fetchPropertyDetails();
  }, [imovelId]);

  if (loading) {
    return (
      <main className="main-custom">
        <Navbar />
        <Loading type="skeleton" />
        <Footer />
      </main>
    );
  }

  if (!property) {
    return (
      <main className="main-custom">
        <Navbar />
        <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
          Imóvel não encontrado.
        </p>
        <Footer />
      </main>
    );
  }

  return (
    <main className="main-custom">
      <Navbar />
      <section className="section-custom">
        <Voltar />
        <h2 className="text-2xl font-semibold">Detalhes do Imóvel</h2>
        <div className="mt-4 p-4 text-normal-text shadow-[2px_2px_4px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden">
          <p><span className="text-[#76726A]">Tipo: </span> {property.tipoImovel}</p>
          <p><span className="text-[#76726A]">Endereço:  </span>{property.endereco}</p>
          <p><span className="text-[#76726A]">Bairro:  </span>{property.bairro}</p>
          <p><span className="text-[#76726A]">Descrição:  </span>{property.descricao}</p>
          <p><span className="text-[#76726A]">CEP:  </span>{property.cep}</p>
          <p><span className="text-[#76726A]">Complemento:  </span>{property.complemento}</p>
          <p><span className="text-[#76726A]">Valor:  </span>R${property.valorImovel.toFixed(2)}</p>
          <p><span className="text-[#76726A]">Condomínio:  </span>R${property.condominio.toFixed(2)}</p>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-[#1F1E1C] text-white rounded"
            onClick={() => navigate(`/chamados/${property.imovelId}`)}
          >
            Ver Chamados
          </button>
          <button
            className="px-4 py-2 bg-[#1F1E1C] text-white rounded"
            onClick={() => navigate("/pagamentos")}
          >
            Ver Pagamentos
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
