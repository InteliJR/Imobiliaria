import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import { FaArrowLeft } from "react-icons/fa";

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

export default function DetalhesChamadoMobile() {
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
      <main className="main-custom">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center p-8 bg-white rounded-lg shadow-md w-full">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Chamado não encontrado</h2>
            <p className="text-neutral-600 mb-6">O chamado solicitado não existe ou foi removido.</p>
            <button
              onClick={() => navigate("/chamados")}
              className="px-4 py-2 bg-[#1F1E1C] text-white rounded hover:bg-neutral-800 w-full"
            >
              Voltar para a lista de chamados
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="main-custom">
      <Navbar />
      
      <section className="section-custom">
        {/* Botão Voltar */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/chamados")}
            className="flex items-center text-neutral-700 hover:text-neutral-900"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para lista de chamados
          </button>
        </div>
        
        {/* Cabeçalho com título e status */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-xl font-bold text-neutral-900 mr-2">{chamado.title}</h1>
            <span 
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                chamado.status === "aberto" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}
            >
              {chamado.status === "aberto" ? "Aberto" : "Fechado"}
            </span>
          </div>
          
          {/* Ações específicas para o Locador */}
          {chamado.viewType === "locador" && (
            <div className="mt-3">
              {chamado.status === "aberto" ? (
                <button
                  onClick={() => alterarStatus("fechado")}
                  className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-2 text-sm w-full"
                >
                  Fechar Chamado
                </button>
              ) : (
                <button
                  onClick={() => alterarStatus("aberto")}
                  className="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-2 text-sm w-full"
                >
                  Reabrir Chamado
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Informações do chamado */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 mb-3">Informações</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500">Solicitante</h3>
              <p className="text-neutral-800">{chamado.solicitor}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-500">Imóvel</h3>
              <p className="text-neutral-800">{chamado.property}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-500">Endereço</h3>
              <p className="text-neutral-800">{chamado.address}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-500">Data de Abertura</h3>
              <p className="text-neutral-800">
                {new Date(chamado.date).toLocaleDateString('pt-BR')} às{' '}
                {new Date(chamado.date).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
        
        {/* Descrição */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 mb-3">Descrição</h2>
          <p className="text-neutral-700 whitespace-pre-wrap">{chamado.description}</p>
        </div>
        
        {/* Atualizações */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 mb-3">Histórico de Atualizações</h2>
          
          <div className="space-y-3">
            {chamado.updates.map((update, index) => (
              <div key={index} className="pb-3 border-b border-neutral-200 last:border-0">
                <div className="text-xs text-neutral-500 mb-1">
                  {new Date(update.date).toLocaleDateString('pt-BR')} às{' '}
                  {new Date(update.date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <p className="text-neutral-700">{update.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Adicionar comentário */}
        {chamado.status === "aberto" && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h2 className="text-lg font-semibold text-neutral-800 mb-3">Adicionar Atualização</h2>
            
            <div className="space-y-3">
              <textarea
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
                rows={3}
                placeholder="Digite uma nova atualização sobre este chamado..."
              ></textarea>
              
              <button
                onClick={adicionarComentario}
                className="w-full py-2 bg-[#1F1E1C] text-white rounded hover:bg-neutral-800"
                disabled={!novoComentario.trim()}
              >
                Enviar Atualização
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
} 