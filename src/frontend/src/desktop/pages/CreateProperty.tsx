import { useState, useCallback, useEffect } from "react";
import FormField from "../components/Form/FormField";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Loading from "../../components/Loading";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig.ts";
// import debounce from "lodash.debounce";

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
  const [selectedLocadorId, setSelectedLocadorId] = useState(null);
  const [selectedLocatarioId, setSelectedLocatarioId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const locadoresResponse = await axiosInstance.get("auth/Locador/PegarTodosLocadores");
        console.log(locadoresResponse.data);
        const locatariosResponse = await axiosInstance.get("auth/Locatario/PegarTodosLocatarios");
        console.log(locatariosResponse.data);
        setLocadores(locadoresResponse.data || []);
        setLocatarios(locatariosResponse.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
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
      const response = await axiosInstance.post("property/Imoveis/CriarUmNovoImovel", {
        TipoImovel: propertyType,
        Cep: cep,
        Condominio: condoFee,
        ValorImovel: rent,
        Bairro: neighborhood,
        Descricao: description,
        Endereco: address,
        Complemento: complement,
        LocadorId: selectedLocadorId || null,
        LocatarioId: selectedLocatarioId || null,
      });

      showSuccessToast(response?.data?.message || "Imóvel criado com sucesso!");
      // Resetar estado após o envio
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
    } catch (error: any) {
      console.error(error);
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <h1 className="text-3xl font-bold text-yellow-darker mb-6">
          Adicionar Imóvel
        </h1>
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
                    <option key={locador.id} value={locador.id}>
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


              <button
                type="submit"
                className="h-10 w-full bg-yellow-darker text-white rounded"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Adicionar Imóvel"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
