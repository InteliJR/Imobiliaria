import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../../components/CardContratos";
import FormField from "../components/Form/FormField";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import Botao from "../../components/Botoes/Botao";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { AxiosError } from "axios";

interface Contrato {
  contratoId: string;
  documentos: string[];
  valorAluguel: number;
  dataEncerramento: string;
  locadorId: string;
  locatarioId: string;
  imovelId: string;
  tipoGarantia: string;
  condicoesEspeciais: string;
  status: string;
  iptu: number;
  dataPagamento: string;
  taxaAdm: number;
  dataRescisao?: string;
  renovado: boolean;
  dataEncerramentoRenovacao?: string;
  valorReajuste?: number;
}

export default function Contratos() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [filtro, setFiltro] = useState("");

  const fetchContratos = async () => {
    try {
      setLoading(true); // Inicia o estado de carregamento
      const response = await axiosInstance.get("property/Contratos/PegarTodosOsContratos");
  
      if (response.data) {
        setContratos(response.data); // Atualiza o estado com os contratos recebidos
      } else {
        setContratos([]); // Garante que contratos seja uma lista vazia se não houver dados
      }
  
      setLoading(false); // Finaliza o estado de carregamento
    } catch (error) {
      console.error(error);
  
      if (error instanceof AxiosError) {
        showErrorToast(
          error.response?.data?.message || "Erro ao se conectar com o servidor."
        );
      } else {
        showErrorToast("Erro ao se conectar com o servidor.");
      }
  
      setLoading(false); // Finaliza o estado de carregamento em caso de erro
    }
  };
  
  useEffect(() => {
    fetchContratos();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    console.log("filtrar por: ", filtro)

    try {
      // Simulação de busca no "banco"
      const filtered = contratos.filter((contrato) =>
        contrato.contratoId.toLowerCase().includes(filtro.toLowerCase())
      );
      setContratos(filtered);
    } catch (error: any) {
      console.error(error);
      showErrorToast("Erro ao buscar contratos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />
        <Botao 
          label="Cadastrar Contrato" 
          onClick={() => navigate("/contratos/criar")} 
        />
        <h2 className="text-2xl font-semibold">Contratos</h2>
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
              <FormField
                label="Buscar contrato"
                onChange={setFiltro}
                value={filtro}
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
            {contratos.length === 0 ? (
              <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                Nenhum contrato encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contratos.map((contrato) => (
                  <Card
                    key={contrato.contratoId}
                    id={contrato.contratoId}
                    title={contrato.contratoId}
                    locador={contrato.locadorId}
                    locatario={contrato.locatarioId}
                    status={contrato.status}
                    encerramento={contrato.dataEncerramento}
                    location={contrato.imovelId}
                    iptu={contrato.iptu.toFixed(2)}
                    aluguel={contrato.valorAluguel.toFixed(2)}
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
