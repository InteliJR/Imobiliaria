import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Chamados/Card";
import FormFieldFilter from "../components/Form/FormFieldFilter";

import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import axios from "axios";

interface Ticket {
  chamadoId: number;
  title: string;
  solicitor: string;
  address: string;
  date: string;
  open: boolean;
}

export default function ChamadosImovel() {
  const { imovelId } = useParams<{ imovelId: string }>();
  const navigate = useNavigate();
  
  const [filteredData, setFilteredData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Número de chamados por página

  // Função para buscar chamados específicos do imóvel
  const fetchPropertyTickets = useCallback(async () => {
    try {
      // Buscar chamados por imovelId
      const chamadosResponse = await axiosInstance.get(
        `property/Chamados/PegarChamadosPorImovel/${imovelId}`
      );
      
      // Buscar usuários para obter nomes dos solicitantes
      const usersResponse = await axiosInstance.get(
        "auth/User/PegarTodosUsuarios"
      );
      
      // Buscar detalhes do imóvel
      const propertyResponse = await axiosInstance.get(
        `property/Imoveis/PegarImovelPorId/${imovelId}`
      );

      if (!chamadosResponse.data || !usersResponse.data || !propertyResponse.data) {
        console.error("Dados de resposta inválidos");
        showErrorToast("Erro ao carregar dados dos chamados");
        return;
      }

      const chamados = Array.isArray(chamadosResponse.data) ? chamadosResponse.data : [];
      const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
      const property = propertyResponse.data;

      // Mesclando os dados
      const mergedData = chamados.map((chamado) => {
        const user = users.find(
          (u) => u.usuarioId === chamado.solicitanteId
        ) || {};

        return {
          chamadoId: chamado.idChamado,
          title: chamado.titulo || "Título não informado",
          solicitor: user.nome || "Usuário desconhecido",
          address: property.endereco || "Endereço desconhecido",
          date: chamado.dataSolicitacao || "Data não informada",
          open: chamado.status === "aberto",
        };
      });

      setFilteredData(mergedData);
      setData(mergedData);
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        showErrorToast(
          error.response?.data?.message || "Erro ao se conectar com o servidor."
        );
      } else {
        showErrorToast("Erro ao se conectar com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  }, [imovelId]);

  // Efeito para buscar chamados ao montar o componente
  useEffect(() => {
    fetchPropertyTickets();
  }, [fetchPropertyTickets]);

  // Efeito para filtrar com base no texto digitado
  useEffect(() => {
    if (!search.trim()) {
      setFilteredData(data);
    } else {
      const lower = search.toLowerCase();
      const finalResult = data.filter((ticket) =>
        ticket.title.toLowerCase().includes(lower)
      );
      setFilteredData(finalResult);
    }
    setCurrentPage(1); // Resetar página ao buscar
  }, [search, data]);

  // Função para calcular os dados paginados
  const getPagedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  };

  // Total de páginas
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handlers para navegação entre páginas
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const userRole = localStorage.getItem('userRole');

  return (
    <main className="main-custom">
      <Navbar />
      <section className="section-custom">
        <Voltar />
        <h2 className="text-2xl font-semibold">Chamados do Imóvel</h2>
        
        {/* Botão para criar novo chamado (apenas para Locatario) */}
        {userRole === "Locatario" && (
          <button
            type="button"
            className="w-full h-10 bg-[#1F1E1C] text-neutral-50 text-form-label rounded mb-4"
            onClick={() => navigate('/chamados/criar')}
          >
            Abrir chamado
          </button>
        )}

        {/* Busca */}
        <form className="grid grid-cols-1 gap-4">
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
              <FormFieldFilter
                label="Buscar chamado pelo título"
                onFilter={(searchTerm) => {
                  setSearch(searchTerm);
                }}
              />
            </div>
          </div>
        </form>

        {/* Cards */}
        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <>
            <section className="flex-grow flex flex-col gap-y-5">
              <h2 className="text-2xl font-semibold">Resultados</h2>
              <div className="h-[1px] bg-black"></div>
              {filteredData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getPagedData().map((ticket) => (
                    <Card
                      key={ticket.chamadoId}
                      id={ticket.chamadoId}
                      title={ticket.title}
                      line1={ticket.solicitor}
                      line2={ticket.address}
                      line3={new Date(ticket.date).toLocaleDateString("pt-BR")}
                      status={ticket.open ? "Aberto" : "Fechado"}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                  Nenhum chamado encontrado.
                </p>
              )}

              {/* Paginação */}
              {filteredData.length > 0 && (
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-500"
                        : "bg-[#1F1E1C] text-white"
                    }`}
                  >
                    Anterior
                  </button>
                  <span className="self-center">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-500"
                        : "bg-[#1F1E1C] text-white"
                    }`}
                  >
                    Próxima
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
} 