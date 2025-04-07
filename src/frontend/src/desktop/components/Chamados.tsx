import { useEffect, useState, useCallback } from "react";
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
import getTokenData from "../../services/tokenConfig";

interface Ticket {
  chamadoId: number;
  title: string;
  solicitor: string;
  solicitorId: number;
  address: string;
  propertyId: number;
  date: string;
  open: boolean;
  description: string;
}

const ChamadosComponent = () => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Ticket[]>([]);
  const [advancedFiltered, setAdvancedFiltered] = useState<Ticket[]>([]);

  // Busca textual
  const [search, setSearch] = useState("");

  // Controle do modal
  const [isModalOpen, setModalOpen] = useState(false);

  // Dados do usuário atual
  const tokenData = getTokenData();
  const userRole = tokenData.RoleName;
  const userId = tokenData.RoleID;

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

  const fetchTickets = useCallback(async () => {
    setLoading(true);

    try {
      // Faz as requisições simultaneamente para buscar todos os dados necessários
      const [chamadosResponse, usersResponse, propertiesResponse] =
        await Promise.all([
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
      const chamados = Array.isArray(chamadosResponse.data)
        ? chamadosResponse.data
        : [];
      const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
      const properties = Array.isArray(propertiesResponse.data)
        ? propertiesResponse.data
        : [];

      // Mescla os dados
      let mergedData = chamados.map(
        (chamado: {
          descricao: string;
          solicitanteId: number;
          idImovel: number;
          idChamado: number;
          titulo: string;
          dataSolicitacao: string;
          status: string;
        }) => {
          const user =
            users.find(
              (u: { usuarioId: number }) => u.usuarioId === chamado.solicitanteId
            ) || {};
          const property =
            properties.find(
              (p: { imovelId: number }) => p.imovelId === chamado.idImovel
            ) || {};

          return {
            chamadoId: chamado.idChamado,
            title: chamado.titulo || "Título não informado",
            solicitor: user.nome || "Usuário desconhecido",
            solicitorId: chamado.solicitanteId,
            address: property.endereco || "Endereço desconhecido",
            propertyId: chamado.idImovel,
            date: chamado.dataSolicitacao || "Data não informada",
            open: chamado.status === "aberto",
            description: chamado.descricao || "Descrição não informada",
          };
        }
      );

      // Filtra os chamados de acordo com o papel do usuário
      if (userRole === "Locatario") {
        // Locatário vê apenas seus próprios chamados
        mergedData = mergedData.filter((chamado) => chamado.solicitorId === userId);
      } else if (userRole === "Locador") {
        // Locador vê apenas chamados relacionados aos seus imóveis
        // Primeiro, encontramos os imóveis do locador
        const locadorImoveis = properties.filter(
          (property: { locadorId: number }) => property.locadorId === userId
        );
        const locadorImoveisIds = locadorImoveis.map(
          (property: { imovelId: number }) => property.imovelId
        );
        // Depois filtramos os chamados para mostrar apenas os relacionados aos imóveis do locador
        mergedData = mergedData.filter(
          (chamado) => locadorImoveisIds.includes(chamado.propertyId)
        );
      }
      // Admin e Judiciário veem todos os chamados (nenhum filtro necessário)

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
          const errorMessage =
            error.response.data || "Erro ao processar a requisição.";
          showErrorToast(errorMessage);
        }
        // Erro de rede (ex: servidor indisponível)
        else if (error.request) {
          showErrorToast(
            "Erro de rede. Verifique sua conexão e tente novamente."
          );
        }
        // Erro inesperado
        else {
          showErrorToast(
            "Ocorreu um erro inesperado. Tente novamente mais tarde."
          );
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
  }, [userRole, userId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredData(advancedFiltered);
    } else {
      const lower = search.toLowerCase();
      const finalResult = advancedFiltered.filter(
        (chamado) => 
          chamado.title.toLowerCase().includes(lower) || 
          chamado.solicitor.toLowerCase().includes(lower) ||
          chamado.address.toLowerCase().includes(lower)
      );
      setFilteredData(finalResult);
    }
    setCurrentPage(1); // Resetar página ao buscar/filtrar
  }, [search, advancedFiltered]);

  // Abrir modal
  const openFilterModal = () => {
    setModalOpen(true);
  };

  // Callback do modal que ao clicar em "Buscar" já recebemos a array filtrada
  const handleFilteredResult = (resultado: Ticket[]) => {
    // Esse "resultado" já está filtrado pelos campos avançados
    setAdvancedFiltered(resultado);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Número de itens por página

  // Função para calcular os dados paginados
  const getPagedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  };

  // Total de páginas
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="flex flex-col bg-[#F0F0F0]  max-w-6xl gap-y-5 p-6 flex-grow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold ">Chamados</h2>
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
              label="Buscar chamado"
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
        ) : filteredData.length === 0 ? (
          <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
            Nenhum chamado encontrado.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {getPagedData().map((ticket) => (
                <ProblemCard
                  key={ticket.chamadoId}
                  id={ticket.chamadoId}
                  title={ticket.title}
                  creator={ticket.solicitor}
                  contact={ticket.address}
                  description={ticket.description}
                  date={ticket.date.split("T")[0]}
                  time={ticket.date.split("T")[1]?.split(".")[0] || "00:00"}
                  status={ticket.open ? "Aberto" : "Fechado"}
                />
              ))}
            </div>
            {/* Paginação */}
            <div className="flex justify-between items-center mt-6">
              <button
                className={`px-4 py-2 text-sm font-medium rounded ${
                  currentPage === 1
                    ? "bg-neutral-300 cursor-not-allowed"
                    : "bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="text-neutral-700">
                Página {currentPage} de {totalPages || 1}
              </span>
              <button
                className={`px-4 py-2 text-sm font-medium rounded ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-neutral-300 cursor-not-allowed"
                    : "bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50"
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ChamadosComponent;
