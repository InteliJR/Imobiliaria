import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProblemCard from "../components/CardChamado";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { GenericFilterModal } from "../../components/Filter/Filter";
import { IFilterField } from "../../components/Filter/InputsInterfaces";
import axios from "axios";

export default function ChamadosComponent() {
  interface Ticket {
    chamadoId: number;
    title: string;
    solicitor: string;
    address: string;
    date: string;
    open: boolean;
    description: string;
  }
  

  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento
  const [data, setData] = useState<any[]>([]);
  const [advancedFiltered, setAdvancedFiltered] = useState<any[]>([]);

  // Busca textual
  const [search, setSearch] = useState("");

  // Controle do modal
  const [isModalOpen, setModalOpen] = useState(false);

  const TicketFilterFields: IFilterField<Ticket>[] = [
    {
      name: "title",
      label: "Título",
      type: "text",
      property: "title",
    },
    {
      name: "solicitor",
      label: "Solicitante",
      type: "text",
      property: "solicitor",
    },
    {
      name: "address",
      label: "Endereço",
      type: "text",
      property: "address",
    },
    {
      name: "date",
      label: "Data",
      type: "dateRange",
      property: "date",
    },
    {
      name: "open",
      label: "Aberto",
      type: "checkbox",
      property: "open",
    },
    {
      name: "description",
      label: "Descrição",
      type: "text",
      property: "description",
    },
  ];


  const fetchTickets = async () => {
    setLoading(true); // Inicia o estado de carregamento
  
    try {
      // Faz as requisições simultaneamente
      const [chamadosResponse, usersResponse, propertiesResponse] = await Promise.all([
        axiosInstance.get("property/Chamados/PegarTodosOsChamados"),
        axiosInstance.get("auth/User/PegarTodosUsuarios"),
        axiosInstance.get("property/Imoveis/PegarTodosImoveis"),
      ]);
  
      // Verifica se os dados de resposta são válidos
      if (
        !chamadosResponse.data ||
        !usersResponse.data ||
        !propertiesResponse.data
      ) {
        console.error("Dados de resposta inválidos");
        showErrorToast("Dados recebidos são inválidos. Tente novamente.");
        return;
      }
  
      // Extrai os dados das respostas
      const chamados = chamadosResponse.data;
      const users = usersResponse.data;
      const properties = propertiesResponse.data;
  
      // Mescla os dados
      const mergedData = chamados.map(
        (chamado: {
          descricao: string;
          solicitanteId: any;
          idImovel: any;
          idChamado: any;
          titulo: any;
          dataSolicitacao: any;
          status: any;
          description: any;
        }) => {
          const user =
            users.find(
              (u: { usuarioId: any }) => u.usuarioId === chamado.solicitanteId
            ) || {};
          const property =
            properties.find(
              (p: { imovelId: any }) => p.imovelId === chamado.idImovel
            ) || {};
  
          return {
            chamadoId: chamado.idChamado,
            title: chamado.titulo || "Título não informado",
            solicitor: user.nome || "Usuário desconhecido",
            address: property.endereco || "Endereço desconhecido",
            date: chamado.dataSolicitacao || "Data não informada",
            open: chamado.status === "aberto" ? true : false,
            description: chamado.descricao || "Descrição não informada",
          };
        }
      );
  
      // Atualiza os estados com os dados mesclados
      setFilteredData(mergedData);
      setAdvancedFiltered(mergedData);
      setData(mergedData);
  
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
  
      // Tratamento de erros do Axios
      if (axios.isAxiosError(error)) {
        // Erro com resposta do servidor (ex: 400, 500)
        if (error.response) {
          const errorMessage = error.response.data || "Erro ao processar a requisição.";
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
    const lower = search.toLowerCase();
    const finalResult = advancedFiltered.filter((ticket: any) =>
      ticket.title?.toLowerCase().includes(lower)
    );
    setFilteredData(finalResult);
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
    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-neutral-800">Chamados</h2>
        <button
          type="button"
          className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
          onClick={() => navigate("/chamados/criar")}
        >
          Abrir Chamado
        </button>
      </div>

      {/* Formulário */}
      <form className="flex items-end gap-4 mb-6">
        <div className="flex-grow">
          <div className="w-full">
            <FormFieldFilter
              label="Buscar chamado pelo título"
              onFilter={(searchTerm) => {
                setSearch(searchTerm);
              }}
            />
          </div>
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
        fields={TicketFilterFields}
        data={data}
        onFilteredResult={handleFilteredResult}
      />

      {/* Cards */}
      <section className="flex flex-col gap-y-5">
        <h2 className="text-2xl font-semibold">Resultados</h2>
        <div className="h-[1px] bg-neutral-400 mb-4"></div>
        {loading ? (
          <Loading type="skeleton" />
        ) : (
          /* {users.length === 0 ? ( // Verifica se a lista de usuários está vazia
              <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                Nenhum usuário encontrado.
              </p>
            ) : */
          <div className="flex flex-col gap-6">
            {filteredData.map((ticket) => (
              <ProblemCard
                key={ticket.chamadoId}
                id={ticket.chamadoId}
                title={ticket.title}
                creator={ticket.solicitor}
                contact={ticket.address}
                description={ticket.description}
                date={ticket.date.split("T")[0]}
                time={ticket.date.split("T")[1].split(".")[0]}
                status={ticket.open ? "Aberto" : "Fechado"}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
