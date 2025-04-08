import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import axiosInstance from "../../services/axiosConfig";
import ImovelImage from "../components/Imoveis/ImovelImage";
import { toast } from "react-toastify";
interface Property {
  imovelId: number;
  tipoImovel: string;
  cep: string;
  condominio: number;
  valorImovel: number;
  bairro: string;
  endereco: string;
  descricao: string;
  complemento: string;
  fotos: string | string[];
}

export default function PropertyDetails() {
  const { imovelId } = useParams<{ imovelId: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const userRole = localStorage.getItem('userRole');
  const fetchPropertyDetails = async () => {
    try {
      
      let response;

      if (userRole == "Admin" || userRole == "Judiciario"){
        response = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorId/${imovelId}`
        );
      } 
      else{
        response = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorIdComVerificacao/${imovelId}`
        );
      }


      if (!response.data) {
        // console.error("Dados de resposta inválidos");
        toast.error("Dados de resposta inválidos");
        return;
      }

      // console.log(response.data);

      // separar string por vírgula
      const property: Property = response.data;
      // console.log(property);
      if (typeof property.fotos === 'string') {
        property.fotos = property.fotos.split(";").map((foto) => foto.trim());
      }

      // console.log(property.fotos);

  
      // array apenas com os nomes dos objetos no Storage
      const allPhotos = property.fotos ? property.fotos.map((foto) =>
        foto.replace("https://storage.googleapis.com/administradora-kk.appspot.com/", "")
      ) : [];

      // console.log(allPhotos);
      // Assinar as fotos
      const responsePhotos = await axiosInstance.post('property/Imoveis/AssinarFotos', allPhotos);
      if (!responsePhotos.data) {
        // console.error("Dados de resposta inválidos do endpoint de assinatura");
        toast.error("Dados de resposta inválidos do endpoint de assinatura");
        return;
      }

      // Substituir as URLs das fotos pelas URLs assinadas
      property.fotos = responsePhotos.data;
      // console.log(property.fotos);
      // console.log(property);
      setProperty(property);
      // console.log(property)
    } catch (error: any) {
      // console.error(error);
      // showErrorToast(
      //   error?.response?.data?.message || "Erro ao se conectar com o servidor."
      // );
      toast.error(
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
        <ImovelImage images={Array.isArray(property.fotos) ? property.fotos : [property.fotos]} />
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
            onClick={() => navigate(`/chamados/imovel/${property.imovelId}`)}
          >
            Ver Chamados
          </button>
          <button
            className="px-4 py-2 bg-[#1F1E1C] text-white rounded"
            onClick={() => navigate(`/visualizar/alugueis/${property.imovelId}`)}
          >
            Ver Pagamentos
          </button>
          {userRole === "Admin" && (
            <button
            
              className="px-4 py-2 bg-[#1F1E1C] text-white rounded"
              onClick={() => navigate(`/imovel-adm/${property.imovelId}`)}
            > Editar as informações do Imóvel</button>
          )}
          {userRole === "Locatario" && (
            <button
            
              className="px-4 py-2 bg-[#1F1E1C] text-white rounded"
              onClick={() => navigate(`/contratos-loc/${property.imovelId}`)}
            > Visualizar o contrato de locação </button>
          )}
          {userRole === "Locador" && (
            <button
            
              className="px-4 py-2 bg-[#1F1E1C] text-white rounded"
              onClick={() => navigate(`/contratos-loc/${property.imovelId}`)}
            > Visualizar o contrato de locação </button>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
