import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Chamados/Card";

// Dados mockados para teste
const chamadosMock = [
  {
    id: 1,
    title: "Problema na torneira da cozinha",
    line1: "João Silva (Locatário)",
    line2: "Rua das Flores, 123 - Centro",
    line3: "15/04/2023 às 10:30",
    status: "Aberto"
  },
  {
    id: 2,
    title: "Infiltração no teto do banheiro",
    line1: "Maria Oliveira (Locatária)",
    line2: "Av. das Palmeiras, 456 - Jardim",
    line3: "10/04/2023 às 08:15",
    status: "Aberto"
  },
  {
    id: 3,
    title: "Problema no chuveiro elétrico",
    line1: "Carlos Ferreira (Locatário)",
    line2: "Rua dos Pinheiros, 789 - Vila Nova",
    line3: "05/04/2023 às 14:45",
    status: "Fechado"
  }
];

export default function VisualizarChamadosTesteMobile() {
  const navigate = useNavigate();
  const [chamados] = useState(chamadosMock);
  const [viewType, setViewType] = useState<'locador' | 'locatario'>('locador');

  return (
    <main className="main-custom">
      <Navbar />
      
      <section className="section-custom">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Chamados</h2>
          <button
            type="button"
            className="px-4 py-2 bg-[#1F1E1C] text-white rounded text-sm"
            onClick={() => navigate("/chamados/criar")}
          >
            Abrir Chamado
          </button>
        </div>
        
        {/* Botões para alternar visão */}
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 py-2 text-sm rounded border ${
              viewType === 'locador' 
                ? 'bg-[#1F1E1C] text-white'
                : 'bg-white text-[#1F1E1C] border-[#1F1E1C]'
            }`}
            onClick={() => setViewType('locador')}
          >
            Visão do Locador
          </button>
          <button
            className={`flex-1 py-2 text-sm rounded border ${
              viewType === 'locatario' 
                ? 'bg-[#1F1E1C] text-white'
                : 'bg-white text-[#1F1E1C] border-[#1F1E1C]'
            }`}
            onClick={() => setViewType('locatario')}
          >
            Visão do Locatário
          </button>
        </div>
        
        {/* Informação do modo de visualização */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
          <p className="text-blue-800">
            <strong>Modo de teste:</strong> Você está vendo como {viewType === 'locador' ? 'um locador' : 'um locatário'}.
          </p>
        </div>
        
        {/* Lista de chamados */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Chamados {viewType === 'locador' ? 'dos seus imóveis' : 'dos seus aluguéis'}
          </h3>
          
          {chamados.length === 0 ? (
            <p className="text-center py-6 text-neutral-500">
              Nenhum chamado encontrado.
            </p>
          ) : (
            <div className="space-y-4 mt-4">
              {chamados.map((chamado) => (
                <Card
                  key={chamado.id}
                  id={chamado.id}
                  title={chamado.title}
                  line1={chamado.line1}
                  line2={chamado.line2}
                  line3={chamado.line3}
                  status={chamado.status as "Aberto" | "Fechado"}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 