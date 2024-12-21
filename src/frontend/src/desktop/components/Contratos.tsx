import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardContrato from "../../components/CardContratos";
import FormField from "../../mobile/components/Form/FormField";
import Loading from "../../components/Loading";
import FilterIcon from "/Filter.svg";
import { showErrorToast } from "../../utils/toastMessage";
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

export default function ContratosComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [filtro, setFiltro] = useState("");

  const fetchContratos = async () => {
    try {
      const mockContratos: Contrato[] = Array.from({ length: 6 }, (_, index) => ({
        contratoId: `C-${index + 1}`,
        documentos: ["contrato.pdf", "vistoria.pdf"],
        valorAluguel: 1500 + index * 100,
        dataEncerramento: `2024-12-${index + 25}`,
        locadorId: `Locador ${index + 1}`,
        locatarioId: `Locatário ${index + 1}`,
        imovelId: `Imóvel ${index + 1}`,
        tipoGarantia: "Fiador",
        condicoesEspeciais: "Sem atrasos",
        status: index % 2 === 0 ? "Ativo" : "Encerrado",
        iptu: 200 + index * 50,
        dataPagamento: "2024-01-01",
        taxaAdm: 150,
        renovado: index % 2 === 0,
        valorReajuste: 100 + index * 20,
      }));

      setContratos(mockContratos);
      setLoading(false);
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        showErrorToast(
          error.response?.data?.message || "Erro ao se conectar com o servidor."
        );
      } else {
        showErrorToast("Erro ao se conectar com o servidor.");
      }
    }
  };

  useEffect(() => {
    fetchContratos();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = contratos.filter((contrato) =>
      contrato.contratoId.toLowerCase().includes(filtro.toLowerCase())
    );
    setContratos(filtered);
  };

  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-neutral-800">Contratos</h2>
        <button
          type="button"
          className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
          onClick={() => navigate("/contratos/criar")}
        >
          Adicionar Contrato
        </button>
      </div>

      {/* Formulário */}
      <form className="flex items-end gap-4 mb-6" onSubmit={handleSearch}>
        <div className="flex-grow">
          <FormField label="Buscar contrato" value={filtro} onChange={setFiltro} />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center hover:bg-neutral-800 gap-2 px-6 h-10 bg-[#1F1E1C] text-neutral-50 text-sm font-medium rounded"
        >
          Filtrar
          <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
        </button>
      </form>

      {/* Cards */}
      <section className="flex flex-col gap-y-5">
        <h2 className="text-2xl font-semibold">Resultados</h2>
        <div className="h-[1px] bg-neutral-400 mb-4"></div>
        {loading ? (
          <Loading type="skeleton" />
        ) : contratos.length === 0 ? (
          <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
            Nenhum contrato encontrado.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contratos.map((contrato) => (
              <CardContrato
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
    </div>
  );
}
