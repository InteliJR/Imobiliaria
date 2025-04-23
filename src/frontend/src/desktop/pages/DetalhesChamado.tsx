import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import { FaArrowLeft, FaHome, FaUsers, FaFileContract, FaClipboardList } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import axiosInstance from "../../services/axiosConfig";
import Loading from "../../components/Loading";
import { showErrorToast, showSuccessToast } from "../../utils/toastMessage";
import axios from "axios";
import getTokenData from "../../services/tokenConfig";

interface Chamado {
  chamadoId: number;
  title: string;
  solicitor: string;
  solicitorId: number;
  property: string;
  address: string;
  propertyId: number;
  date: string;
  status: string;
  description: string;
  updates: Array<{
    date: string;
    text: string;
  }>;
}

export default function DetalhesChamado() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [novoComentario, setNovoComentario] = useState("");
  
  // Dados do usuário atual
  const tokenData = getTokenData();
  const userRole = tokenData.RoleName;

  const fetchChamadoDetails = async () => {
    setLoading(true);
    try {
      const [chamadosResponse, usersResponse, propertiesResponse, updatesResponse] = await Promise.all([
        axiosInstance.get(`property/Chamados/PegarChamadosPorId/${id}`),
        axiosInstance.get("auth/User/PegarTodosUsuarios"),
        axiosInstance.get("property/Imoveis/PegarTodosImoveis"),
        axiosInstance.get(`property/Chamados/GetUpdates/${id}`)
      ]);

      if (!chamadosResponse.data) {
        showErrorToast("Chamado não encontrado.");
        navigate("/chamados");
        return;
      }

      const chamadoData = chamadosResponse.data;
      const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
      const properties = Array.isArray(propertiesResponse.data) ? propertiesResponse.data : [];
      const updates = Array.isArray(updatesResponse.data) ? updatesResponse.data : [];

      // Encontra o usuário e o imóvel relacionados
      const user = users.find((u: { usuarioId: number }) => u.usuarioId === chamadoData.solicitanteId) || {};
      const property = properties.find((p: { imovelId: number }) => p.imovelId === chamadoData.idImovel) || {};

      // Formata os dados do chamado
      setChamado({
        chamadoId: chamadoData.idChamado,
        title: chamadoData.titulo || "Título não informado",
        solicitor: user.nome || "Usuário desconhecido",
        solicitorId: chamadoData.solicitanteId,
        property: property.tipoImovel || "Imóvel desconhecido",
        address: property.endereco || "Endereço desconhecido",
        propertyId: chamadoData.idImovel,
        date: chamadoData.dataSolicitacao || "Data não informada",
        status: chamadoData.status || "Status não informado",
        description: chamadoData.descricao || "Descrição não informada",
        updates: updates.map((update: { dataAtualizacao: string; comentario: string }) => ({
          date: update.dataAtualizacao,
          text: update.comentario
        }))
      });
    } catch (error) {
      console.error("Erro ao buscar detalhes do chamado:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data || "Erro ao processar a requisição.";
          showErrorToast(errorMessage);
        } else if (error.request) {
          showErrorToast("Erro de rede. Verifique sua conexão e tente novamente.");
        } else {
          showErrorToast("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
      } else if (error instanceof Error) {
        showErrorToast(error.message);
      } else {
        showErrorToast("Erro ao se conectar com o servidor.");
      }
      
      navigate("/chamados");
    } finally {
      setLoading(false);
    }
  };

  const adicionarComentario = async () => {
    if (!novoComentario.trim() || !chamado) return;
    
    setUpdating(true);
    try {
      await axiosInstance.post(`property/Chamados/AddUpdate`, {
        chamadoId: chamado.chamadoId,
        comentario: novoComentario
      });
      
      // Atualiza o estado local com o novo comentário
      const novoUpdate = {
        date: new Date().toISOString(),
        text: novoComentario
      };
      
      setChamado({
        ...chamado,
        updates: [...chamado.updates, novoUpdate]
      });
      
      setNovoComentario("");
      showSuccessToast("Atualização adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar atualização:", error);
      showErrorToast("Não foi possível adicionar a atualização. Tente novamente.");
    } finally {
      setUpdating(false);
    }
  };

  const alterarStatus = async (novoStatus: string) => {
    if (!chamado) return;
    
    setUpdating(true);
    try {
      await axiosInstance.put(`property/Chamados/AtualizarStatusChamado/${chamado.chamadoId}`, {
        status: novoStatus
      });
      
      setChamado({
        ...chamado,
        status: novoStatus
      });
      
      showSuccessToast(`Status do chamado alterado para ${novoStatus}.`);
    } catch (error) {
      console.error("Erro ao atualizar status do chamado:", error);
      showErrorToast("Não foi possível atualizar o status do chamado.");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchChamadoDetails();
    }
  }, [id]);

  // Verifica se o chamado existe
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F0F0F0]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loading type="spinner" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!chamado) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F0F0F0]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Chamado não encontrado</h2>
            <p className="text-neutral-600 mb-6">O chamado solicitado não existe ou foi removido.</p>
            <button
              onClick={() => navigate("/chamados")}
              className="px-6 py-2 bg-[#1F1E1C] text-white rounded hover:bg-neutral-800"
            >
              Voltar para a lista de chamados
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Determina se o usuário pode editar o chamado com base em seu papel
  const canEditChamado = userRole === "Admin" || 
                        (userRole === "Locador" && chamado.status === "aberto") ||
                        (userRole === "Judiciario");

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F0F0]">
      <Navbar />
      
      {/* Menu de navegação */}
      <div className="flex justify-center gap-6 ms-2 mt-4">
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/imoveis")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaHome className="z-10" />
          <span className="z-10">Imóveis</span>
        </button>

        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/usuarios")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaUsers className="z-10" />
          <span className="z-10">Clientes</span>
        </button>

        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/contratos")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaFileContract className="z-10" />
          <span className="z-10">Contratos</span>
        </button>
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/pagamentos")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaMoneyBillTrendUp className="z-10" />
          <span className="z-10">Pagamentos</span>
        </button>
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/chamados")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaClipboardList className="z-10" />
          <span className="z-10 font-bold">Chamados</span>
        </button>
      </div>
      <div className="h-[1px] bg-neutral-400 mb-4"></div>

      {/* Conteúdo principal */}
      <div className="flex-grow container mx-auto max-w-4xl px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Botão Voltar */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/chamados")}
              className="flex items-center text-neutral-700 hover:text-neutral-900"
            >
              <FaArrowLeft className="mr-2" />
              Voltar para lista de chamados
            </button>
          </div>
          
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">{chamado.title}</h1>
            <div className="flex items-center space-x-2">
              <span 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  chamado.status === "aberto" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}
              >
                {chamado.status === "aberto" ? "Aberto" : "Fechado"}
              </span>
              
              {/* Ações específicas para usuários com permissão */}
              {canEditChamado && (
                <div className="flex gap-2">
                  {chamado.status === "aberto" ? (
                    <button
                      onClick={() => alterarStatus("fechado")}
                      className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm"
                      disabled={updating}
                    >
                      {updating ? "Processando..." : "Fechar Chamado"}
                    </button>
                  ) : (
                    <button
                      onClick={() => alterarStatus("aberto")}
                      className="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-1 text-sm"
                      disabled={updating}
                    >
                      {updating ? "Processando..." : "Reabrir Chamado"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Informações do chamado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm font-semibold text-neutral-500 mb-1">Solicitante</h2>
              <p className="text-neutral-800">{chamado.solicitor}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-500 mb-1">Imóvel</h2>
              <p className="text-neutral-800">{chamado.property}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-500 mb-1">Endereço</h2>
              <p className="text-neutral-800">{chamado.address}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-500 mb-1">Data de Abertura</h2>
              <p className="text-neutral-800">
                {new Date(chamado.date).toLocaleDateString('pt-BR')} às{' '}
                {new Date(chamado.date).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          {/* Descrição */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-800 mb-3">Descrição</h2>
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <p className="text-neutral-700 whitespace-pre-wrap">{chamado.description}</p>
            </div>
          </div>
          
          {/* Atualizações */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-800 mb-3">Histórico de Atualizações</h2>
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              {chamado.updates.length === 0 ? (
                <p className="text-neutral-500 italic">Nenhuma atualização registrada.</p>
              ) : (
                chamado.updates.map((update, index) => (
                  <div key={index} className="mb-3 pb-3 border-b border-neutral-200 last:border-0">
                    <div className="flex justify-between text-sm text-neutral-500 mb-1">
                      <span>
                        {new Date(update.date).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(update.date).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-neutral-700">{update.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Adicionar comentário */}
          {chamado.status === "aberto" && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-800 mb-3">Adicionar Atualização</h2>
              <div className="flex flex-col gap-3">
                <textarea
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
                  rows={3}
                  placeholder="Digite uma nova atualização sobre este chamado..."
                  disabled={updating}
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={adicionarComentario}
                    className="px-4 py-2 bg-[#1F1E1C] text-white rounded hover:bg-neutral-800"
                    disabled={!novoComentario.trim() || updating}
                  >
                    {updating ? "Enviando..." : "Enviar Atualização"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
} 