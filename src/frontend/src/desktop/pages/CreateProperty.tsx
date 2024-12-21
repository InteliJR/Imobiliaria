import { useState, useEffect } from "react";
import FormField from "../components/Form/FormField";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Loading from "../../components/Loading";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig.ts";

export default function CreateProperty() {
  const [propertyType, setPropertyType] = useState("Kitnet");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [rent, setRent] = useState("");
  const [condoFee, setCondoFee] = useState("");
  const [description, setDescription] = useState("");
  const [locadores, setLocadores] = useState([]); // Lista de locadores
  const [locatarios, setLocatarios] = useState([]); // Lista de locatários
  const [selectedLocadorId, setSelectedLocadorId] = useState<string | null>(null);
  const [selectedLocatarioId, setSelectedLocatarioId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]); // Estado para armazenar as fotos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locadoresResponse = await axiosInstance.get("auth/Locador/PegarTodosLocadores");
        const locatariosResponse = await axiosInstance.get("auth/Locatario/PegarTodosLocatarios");
        setLocadores(locadoresResponse.data || []);
        setLocatarios(locatariosResponse.data || []);
      } catch (error) {
        showErrorToast("Erro ao carregar locadores e locatários.");
      }
    };
    fetchData();
  }, []);
  
  // Função de envio do formulário
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("TipoImovel", propertyType);
      formData.append("Cep", cep);
      formData.append("Condominio", condoFee);
      formData.append("ValorImovel", rent);
      formData.append("Bairro", neighborhood);
      formData.append("Descricao", description);
      formData.append("Endereco", address);
      formData.append("Complemento", complement);
      formData.append("LocadorId", selectedLocadorId || "");
      formData.append("LocatarioId", selectedLocatarioId || "");

      // Adicionar as fotos ao FormData
      photos.forEach((photo) => {
        formData.append("Fotos[]", photo); // Enviar todas as fotos como array
      });

      // Alterar o endpoint para permitir upload de imagens
      const response = await axiosInstance.post("property/Imoveis/CriarUmNovoImovel", formData);

      showSuccessToast(response?.data?.message || "Imóvel criado com sucesso!");
      setPropertyType("Kitnet");
      setCep("");
      setAddress("");
      setComplement("");
      setNeighborhood("");
      setRent("");
      setCondoFee("");
      setDescription("");
      setSelectedLocadorId(null);
      setSelectedLocatarioId(null);
      setPhotos([]); // Limpar fotos após o envio
    } catch (error: any) {
      console.error(error);
      showErrorToast(error?.response?.data?.message || "Erro ao se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o upload das fotos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files)); // Converter FileList para array
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <h1 className="text-3xl font-bold text-yellow-darker mb-6">Adicionar Imóvel</h1>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-6 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-neutral-600">Tipo do Imóvel</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="h-10 w-full bg-transparent border border-neutral-200 px-2 rounded"
                >
                  <option>Kitnet</option>
                  <option>Apartamento</option>
                  <option>Casa</option>
                  <option>Comercial</option>
                </select>
              </div>

              {/* Outros campos */}
              <FormField label="CEP" placeholder="Digite o CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
              <FormField label="Endereço" placeholder="Digite o endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
              <FormField label="Complemento" placeholder="Digite o complemento" value={complement} onChange={(e) => setComplement(e.target.value)} />
              <FormField label="Bairro" placeholder="Bairro do imóvel" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
              <FormField label="Aluguel (R$)" value={rent} onChange={(e) => setRent(e.target.value)} />
              <FormField label="Condomínio (R$)" value={condoFee} onChange={(e) => setCondoFee(e.target.value)} />

              {/* Dropdown de Locador */}
              <div>
                <label className="block text-neutral-600">Locador</label>
                <select
                  value={selectedLocadorId || ""}
                  onChange={(e) => setSelectedLocadorId(e.target.value)}
                  className="h-10 w-full bg-transparent border border-neutral-200 px-2 rounded"
                >
                  <option value="">Selecione um locador</option>
                  {locadores.map((locador: any) => (
                    <option key={locador.locadorId} value={locador.locadorId}>
                      {locador.nomeCompletoLocador}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown de Locatário */}
              <div>
                <label className="block text-neutral-600">Locatário</label>
                <select
                  value={selectedLocatarioId || ""}
                  onChange={(e) => setSelectedLocatarioId(e.target.value)}
                  className="h-10 w-full bg-transparent border border-neutral-200 px-2 rounded"
                >
                  <option value="">Selecione um locatário</option>
                  {locatarios.map((locatario: any) => (
                    <option key={locatario.locatarioId} value={locatario.locatarioId}>
                      {locatario.nomeCompletoLocatario}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Campo para envio de fotos */}
              <div>
                <label className="block text-neutral-600">Fotos do Imóvel</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                  className="h-10 w-full bg-transparent border border-neutral-200 px-2 rounded"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-neutral-200 px-2 py-2 text-form-label rounded-md shadow-sm focus:border-brown-500 focus:ring-brown-500"
                  rows={3}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-yellow-darker text-white rounded-md hover:bg-yellow-dark transition duration-300 focus:outline-none focus:bg-yellow-dark mt-4"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Adicionar Imóvel"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loading type="spinner" />}
      <Footer />
    </div>
  );
}
