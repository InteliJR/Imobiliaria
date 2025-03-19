import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import ProblemCard from "../components/CardChamado";
import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaFileContract,
} from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

// Dados mockados para teste
const chamadosMock = [
  {
    chamadoId: 1,
    title: "Problema na torneira da cozinha",
    solicitor: "João Silva (Locatário)",
    address: "Rua das Flores, 123 - Centro",
    date: "2023-04-15T10:30:00",
    open: true,
    description: "A torneira da cozinha está vazando há dois dias. Já tentei fechar bem, mas continua pingando constantemente.",
  },
  {
    chamadoId: 2,
    title: "Infiltração no teto do banheiro",
    solicitor: "Maria Oliveira (Locatária)",
    address: "Av. das Palmeiras, 456 - Jardim",
    date: "2023-04-10T08:15:00",
    open: true,
    description: "Notei uma mancha de infiltração no teto do banheiro que está aumentando de tamanho.",
  },
  {
    chamadoId: 3,
    title: "Problema no chuveiro elétrico",
    solicitor: "Carlos Ferreira (Locatário)",
    address: "Rua dos Pinheiros, 789 - Vila Nova",
    date: "2023-04-05T14:45:00",
    open: false,
    description: "O chuveiro elétrico parou de esquentar a água. Já verifiquei que ele liga, mas a água sai fria.",
  }
];

export default function VisualizarChamadosTeste() {
  const navigate = useNavigate();
  const [chamados] = useState(chamadosMock);
  const [viewType, setViewType] = useState<'locador' | 'locatario'>('locador');

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F0F0]">
      <Navbar />
      {/* New Row with Clickable Options */}
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
      
      <div className="flex-grow container mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Chamados</h2>
          <div className="flex gap-2">
            <button
              type="button"
              className="h-10 px-4 border border-[#1F1E1C] text-[#1F1E1C] hover:bg-neutral-100 text-sm font-medium rounded"
              onClick={() => setViewType('locador')}
            >
              Visão do Locador
            </button>
            <button
              type="button"
              className="h-10 px-4 border border-[#1F1E1C] text-[#1F1E1C] hover:bg-neutral-100 text-sm font-medium rounded"
              onClick={() => setViewType('locatario')}
            >
              Visão do Locatário
            </button>
            <button
              type="button"
              className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
              onClick={() => navigate("/chamados/criar")}
            >
              Abrir Chamado
            </button>
          </div>
        </div>

        {/* Informação do modo de visualização */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800">
            <strong>Modo de teste:</strong> Você está vendo os chamados como {viewType === 'locador' ? 'um locador' : 'um locatário'}.
            {viewType === 'locador' 
              ? ' Locadores podem ver os chamados relacionados aos seus imóveis e atualizá-los.'
              : ' Locatários podem ver seus próprios chamados e adicionar atualizações.'}
          </p>
        </div>

        {/* Cards */}
        <section className="flex flex-col gap-y-5">
          <h2 className="text-2xl font-semibold">Chamados {viewType === 'locador' ? 'dos seus imóveis' : 'dos seus aluguéis'}</h2>
          <div className="h-[1px] bg-neutral-400 mb-4"></div>
          
          <div className="flex flex-col gap-6">
            {chamados.map((ticket) => (
              <ProblemCard
                key={ticket.chamadoId}
                id={ticket.chamadoId}
                title={ticket.title}
                creator={ticket.solicitor}
                contact={ticket.address}
                description={ticket.description}
                date={ticket.date.split("T")[0]}
                time={ticket.date.split("T")[1].split(".")[0] || "00:00"}
                status={ticket.open ? "Aberto" : "Fechado"}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
} 