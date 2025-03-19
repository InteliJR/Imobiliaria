import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import { FaArrowLeft, FaHome, FaUsers, FaFileContract, FaClipboardList } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

// Dados mockados para teste
const mockChamados = {
  // Chamado para o Locador
  "1": {
    id: 1,
    title: "Problema na torneira da cozinha",
    solicitor: "João Silva (Locatário)",
    property: "Apartamento 101, Ed. Solar",
    address: "Rua das Flores, 123 - Centro",
    date: "2023-04-15T10:30:00",
    status: "aberto",
    description: "A torneira da cozinha está vazando há dois dias. Já tentei fechar bem, mas continua pingando constantemente. Preciso de um encanador para resolver este problema o mais rápido possível.",
    updates: [
      { date: "2023-04-15T10:30:00", text: "Chamado aberto pelo locatário." },
      { date: "2023-04-15T14:22:00", text: "Locador visualizou o chamado e está verificando disponibilidade de encanador." }
    ],
    viewType: "locador"
  },
  // Chamado para o Locatário
  "2": {
    id: 2,
    title: "Infiltração no teto do banheiro",
    solicitor: "Você",
    property: "Apartamento 202, Ed. Brisa",
    address: "Av. das Palmeiras, 456 - Jardim",
    date: "2023-04-10T08:15:00", 
    status: "aberto",
    description: "Notei uma mancha de infiltração no teto do banheiro que está aumentando de tamanho. Parece vir do apartamento de cima. Por favor, verificar o mais rápido possível antes que cause danos maiores.",
    updates: [
      { date: "2023-04-10T08:15:00", text: "Chamado aberto." },
      { date: "2023-04-10T15:30:00", text: "Locador confirmou recebimento e vai verificar com o síndico." },
      { date: "2023-04-11T09:45:00", text: "Síndico agendou vistoria para amanhã às 14h." }
    ],
    viewType: "locatario"
  }
};

export default function DetalhesChamado() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chamado, setChamado] = useState(id ? mockChamados[id as keyof typeof mockChamados] : null);
  const [novoComentario, setNovoComentario] = useState("");

  const adicionarComentario = () => {
    if (!novoComentario.trim()) return;
    
    const novoUpdate = {
      date: new Date().toISOString(),
      text: novoComentario
    };
    
    setChamado(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        updates: [...prev.updates, novoUpdate]
      };
    });
    
    setNovoComentario("");
  };

  const alterarStatus = (novoStatus: string) => {
    setChamado(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        status: novoStatus
      };
    });
  };

  // Verifica se o chamado existe
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
              
              {/* Ações específicas para o Locador */}
              {chamado.viewType === "locador" && (
                <div className="flex gap-2">
                  {chamado.status === "aberto" ? (
                    <button
                      onClick={() => alterarStatus("fechado")}
                      className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm"
                    >
                      Fechar Chamado
                    </button>
                  ) : (
                    <button
                      onClick={() => alterarStatus("aberto")}
                      className="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-1 text-sm"
                    >
                      Reabrir Chamado
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
              {chamado.updates.map((update, index) => (
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
              ))}
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
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={adicionarComentario}
                    className="px-4 py-2 bg-[#1F1E1C] text-white rounded hover:bg-neutral-800"
                    disabled={!novoComentario.trim()}
                  >
                    Enviar Atualização
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