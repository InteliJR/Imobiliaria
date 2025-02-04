import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast, showSuccessToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import ImovelImage from "../components/Imoveis/ImovelImage";

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
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState<Property | null>(null);
  const userRole = localStorage.getItem("userRole");

  const fetchPropertyDetails = async () => {
    try {
      let response;
      if (userRole === "Admin" || userRole === "Judiciario") {
        response = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorId/${imovelId}`
        );
      } else {
        response = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorIdComVerificacao/${imovelId}`
        );
      }

      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      const propertyData: Property = response.data;

      if (typeof propertyData.fotos === "string") {
        propertyData.fotos = propertyData.fotos.split(";").map((foto) => foto.trim());
      }

      const allPhotos = propertyData.fotos
        ? propertyData.fotos.map((foto) =>
            foto.replace("https://storage.googleapis.com/administradora-kk.appspot.com/", "")
          )
        : [];

      const responsePhotos = await axiosInstance.post(
        "property/Imoveis/AssinarFotos",
        allPhotos
      );

      if (!responsePhotos.data) {
        console.error("Erro ao assinar fotos");
        return;
      }

      propertyData.fotos = responsePhotos.data;
      setProperty(propertyData);
      setEditedProperty(propertyData);
    } catch (error: any) {
      console.error(error);
      showErrorToast(error?.response?.data?.message || "Erro ao se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [imovelId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedProperty) return;
    setEditedProperty({ ...editedProperty, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await axiosInstance.put(
        `property/Imoveis/AtualizarImovel/${imovelId}`,
        editedProperty
      );
      showSuccessToast("Imóvel atualizado com sucesso!");
      setIsEditing(false);
      fetchPropertyDetails();
    } catch (error: any) {
      console.error(error);
      showErrorToast("Erro ao atualizar o imóvel.");
    }
  };

  // Função para cancelar edição e restaurar valores antigos
  const handleCancelEdit = () => {
    setEditedProperty(property);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <main className="main-custom">
        <Navbar />
        <Loading type="skeleton" />
        <Footer />
      </main>
    );
  }

  if (!property || !editedProperty) {
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
          <p>
            <span className="text-[#76726A]">Tipo: </span>
            {isEditing ? (
              <input
                type="text"
                name="tipoImovel"
                value={editedProperty.tipoImovel}
                onChange={handleInputChange}
                className="border rounded p-1"
              />
            ) : (
              property.tipoImovel
            )}
          </p>
          <p>
            <span className="text-[#76726A]">Endereço: </span>
            {isEditing ? (
              <input
                type="text"
                name="endereco"
                value={editedProperty.endereco}
                onChange={handleInputChange}
                className="border rounded p-1"
              />
            ) : (
              property.endereco
            )}
          </p>
          <p>
            <span className="text-[#76726A]">Valor: </span>
            {isEditing ? (
              <input
                type="number"
                name="valorImovel"
                value={editedProperty.valorImovel}
                onChange={handleInputChange}
                className="border rounded p-1"
              />
            ) : (
              `R$ ${property.valorImovel.toFixed(2)}`
            )}
          </p>
          <p>
            <span className="text-[#76726A]">Condomínio: </span>
            {isEditing ? (
              <input
                type="number"
                name="condominio"
                value={editedProperty.condominio}
                onChange={handleInputChange}
                className="border rounded p-1"
              />
            ) : (
              `R$ ${property.condominio.toFixed(2)}`
            )}
          </p>
        </div>

        {/* Botões de edição */}
        {userRole === "Admin" && (
          <div className="flex gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={handleSaveChanges}
                >
                  Salvar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
