import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProblemCard from "../components/CardChamado";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";

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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento

  const fetchTickets = async () => {
    try {
      const chamadosResponse = await axiosInstance.get(
        "property/Chamados/PegarTodosOsChamados"
      );
      const usersResponse = await axiosInstance.get(
        "auth/User/PegarTodosUsuarios"
      );
      const propertiesResponse = await axiosInstance.get(
        "property/Imoveis/PegarTodosImoveis"
      );

      if (
        !chamadosResponse.data ||
        !usersResponse.data ||
        !propertiesResponse.data
      ) {
        console.error("Dados de resposta inválidos");
        return;
      }

      // console.log("Chamados:", chamadosResponse.data);
      // console.log("Usuários:", usersResponse.data);
      // console.log("Imóveis:", propertiesResponse.data);

      const chamados = chamadosResponse.data;
      const users = usersResponse.data;
      const properties = propertiesResponse.data;

      // Mesclando os dados
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
            open: chamado.status === "Aberto" ? true : false,
            description: chamado.descricao || "Descrição não informada",
          };
        }
      );

      setTickets(mergedData);
      setFilteredData(mergedData);

      setLoading(false); // Caso a requisição dos dados tenha sido bem sucedida
    } catch (error) {
      console.error(error);

      showErrorToast("Erro ao se conectar com o servidor.");
    }
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
              label="Buscar chamado"
              onFilter={(searchTerm) => {
                // console.log(searchTerm);
                const filtered = tickets.filter((chamados) =>
                  chamados.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                );
                setFilteredData(filtered);
              }}
            />
          </div>
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
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
