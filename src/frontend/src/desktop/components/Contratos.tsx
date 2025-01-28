import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardContrato from "../../components/CardContratos";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import Loading from "../../components/Loading";
import FilterIcon from "/Filter.svg";
import { showErrorToast } from "../../utils/toastMessage";
import axios from "axios";
import axiosInstance from "../../services/axiosConfig";
import { GenericFilterModal } from "../../components/Filter/Filter";
import { IFilterField } from "../../components/Filter/InputsInterfaces";
import { IContract } from "../../components/Filter/ConstractInterface";

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
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [advancedFiltered, setAdvancedFiltered] = useState<any[]>([]);

  // Busca textual
  const [search, setSearch] = useState("");
  // Controle do modal
  const [isModalOpen, setModalOpen] = useState(false);

  const ContractFilterFields: IFilterField<IContract>[] = [
    {
      name: "locadorId",
      label: "Locador",
      type: "text",
      property: "locadorId",
    },
    {
      name: "locatarioId",
      label: "Locatário",
      type: "text",
      property: "locatarioId",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      property: "status",
      options: ["Ativo", "Inativo"],
    },
    {
      name: "dataEncerramento",
      label: "Data de Encerramento",
      type: "dateRange",
      property: "dataEncerramento",
    },
    {
      name: "imovelId",
      label: "Imóvel",
      type: "text",
      property: "imovelId",
    },
    {
      name: "iptu",
      label: "IPTU",
      type: "numberRange",
      property: "iptu",
    },
    {
      name: "valorAluguel",
      label: "Valor do Aluguel",
      type: "numberRange",
      property: "valorAluguel",
    },
  ];

  const fetchContratos = async () => {
    setLoading(true); // Inicia o estado de carregamento
  
    try {
      // Faz a requisição para obter os contratos
      const response = await axiosInstance.get("property/Contratos/PegarTodosOsContratos");
  
      // Verifica se os dados de resposta são válidos
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Dados de resposta inválidos ou ausentes");
        showErrorToast("Dados recebidos são inválidos. Tente novamente.");
        setContratos([]); // Garante que contratos seja uma lista vazia
        return;
      }
  
      // Transforma o contratoId em número
      const contratos = response.data.map((contrato: any) => ({
        ...contrato,
        contratoId: Number(contrato.contratoId),
      }));
  
      // Atualiza os estados com os dados recebidos
      setContratos(contratos);
      setFilteredData(contratos);
      setData(contratos);
      setAdvancedFiltered(contratos);
  
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
  
      // Tratamento de erros do Axios
      if (axios.isAxiosError(error)) {
        // Erro com resposta do servidor (ex: 400, 500)
        if (error.response) {
          const errorMessage = error.response.data?.message || "Erro ao processar a requisição.";
          showErrorToast(errorMessage);
        }
        // Erro de rede (ex: servidor indisponível)
        else if (error.request) {
          showErrorToast("Erro de rede. Verifique sua conexão e tente novamente.");
        }
        // Erro inesperado
        else {
          showErrorToast("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
      }
      // Erro genérico (não relacionado ao Axios)
      else if (error instanceof Error) {
        showErrorToast(error.message);
      }
      // Erro desconhecido
      else {
        showErrorToast("Erro ao se conectar com o servidor.");
      }
    } finally {
      setLoading(false); // Finaliza o estado de carregamento, independentemente de sucesso ou erro
    }
  };

  useEffect(() => {
    // Se search estiver vazio, "filteredData" = "advancedFiltered"
    if (!search.trim()) {
      setFilteredData(advancedFiltered);
      return;
    }
  
    const searchAsNumber = Number(search);
  
    const finalResult = advancedFiltered.filter((contract: IContract) => {
      return contract.contratoId === searchAsNumber;
    });
  
    setFilteredData(finalResult);
    // console.log("Final result:", finalResult);
  }, [search, advancedFiltered]);


  // Abrir modal
  const openFilterModal = () => {
    setModalOpen(true);
  };

  // Callback do modal que ao clicar em "Buscar" já recebemos a array filtrada
  const handleFilteredResult = (resultado: any[]) => {
    // Esse "resultado" já está filtrado pelos campos avançados
    setAdvancedFiltered(resultado);
  };

  
  useEffect(() => {
    fetchContratos();
  }, []);


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
      <form className="flex items-end gap-4 mb-6">
        <div className="flex-grow">
        <FormFieldFilter
              label="Buscar chamado pelo título"
              onFilter={(searchTerm) => {
                setSearch(searchTerm);
              }}
            />
        </div>
        <button
          type="button"
          className="flex items-center justify-center hover:bg-neutral-800 gap-2 px-6 h-10 bg-[#1F1E1C] text-neutral-50 text-sm font-medium rounded"
          onClick={openFilterModal}
        >
          Filtrar
          <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
        </button>
      </form>


      <GenericFilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        fields={ContractFilterFields}
        data={data}
        onFilteredResult={handleFilteredResult}
      />


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
            {filteredData.map((contrato) => (
              <CardContrato
                key={contrato.contratoId}
                id={contrato.contratoId}
                title={contrato.contratoId}
                locador={contrato.locadorId}
                locatario={contrato.locatarioId}
                reajuste={contrato.dataEncerramentoRenovacao}
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
