import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../components/Voltar";
import VisualizarItem from "../components/VisualizarItem";
import { showErrorToast } from "../../utils/toastMessage";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";

export default function Chamado() {

  interface Ticket {
    ChamadoId: number;
    Titulo: string;
    Solicitor: string;
    LocadorName: string;
    LocadorContact: string;
    LocatarioName: string;
    LocatarioContact: string;
    TypeTicket: string;
    Address: string;
    DateSolicitation: string;
    DateStart: string;
    DateEnd: string;
    Description: string;
  }

  const [ticket, setTicket] = useState<Ticket | null>(null);


  const fetchTicket = async () => {
    try {
      const id = window.location.pathname.split("/").pop();

      const chamadosResponse = await axiosInstance.get(`property/Chamados/PegarChamadosPorId/${id}`);

      const SolicitorResponse = await axiosInstance.get(`auth/User/PegarUsuario?userId=${chamadosResponse.data.solicitanteId}`);

      const propertiesResponse = await axiosInstance.get(`property/Imoveis/PegarImovelPorId/${chamadosResponse.data.idImovel}`);

      const LocatarioResponse = await axiosInstance.get(`auth/Locatario/PegarLocatarioPorLocatarioID?LocatarioID=${propertiesResponse.data.locatarioId}`);

      console.log("Locatario:", LocatarioResponse.data);

      const LocadorResponse = await axiosInstance.get(`auth/Locador/PegarLocadorPorLocadorID?locadorID=${propertiesResponse.data.locadorId}`);

      console.log("Locador:", LocadorResponse.data);

      if (!chamadosResponse.data || !SolicitorResponse.data || !propertiesResponse.data) {
        console.error("Dados de resposta inválidos");
        showErrorToast("Erro ao se conectar com o servidor.");
        return;
      }

      console.log("Chamado:", chamadosResponse.data);
      console.log("Usuário:", SolicitorResponse.data);
      console.log("Imóvel:", propertiesResponse.data);

      const newTicket = {
        ChamadoId: chamadosResponse.data.idChamado,
        Titulo: chamadosResponse.data.titulo || 'Título não informado',
        Solicitor: SolicitorResponse.data.nome || 'Usuário desconhecido',
        LocadorName: LocadorResponse.data.nomeCompletoLocador || 'Usuário desconhecido',
        LocadorContact: LocadorResponse.data.numeroTelefone || 'Telefone não informado',
        LocatarioName: LocatarioResponse.data.nomeCompletoLocatario || 'Usuário desconhecido',
        LocatarioContact: LocatarioResponse.data.numeroTelefone || 'Telefone não informado',
        TypeTicket: chamadosResponse.data.tipoChamado || 'Tipo não informado',
        Address: propertiesResponse.data.endereco || 'Endereço desconhecido',
        DateSolicitation: chamadosResponse.data.dataSolicitacao || 'Data não informada',
        DateStart: chamadosResponse.data.dataInicio || 'Data não informada',
        DateEnd: chamadosResponse.data.dataFim || 'Data não informada',
        Description: chamadosResponse.data.descricao || 'Descrição não informada',
      };

      // Formatar data e hora para o padrão brasileiro
      const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
      };

      newTicket.DateSolicitation = formatDate(newTicket.DateSolicitation);
      newTicket.DateStart = formatDate(newTicket.DateStart);
      newTicket.DateEnd = formatDate(newTicket.DateEnd);

      setTicket(newTicket);

      // console.log("Chamado:", newTicket);

    } catch (error) {
      console.error(error);

      showErrorToast("Erro ao se conectar com o servidor.");
    }
  };


  useEffect(() => {
    fetchTicket();
  }, []);

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
      <Voltar />

      <h1 className="text-title font-strong">Chamado: {ticket?.Titulo}</h1>
        {/* Solicitante */}
        <div className="relative flex flex-col gap-5 border-2 border-neutral-500 p-4 rounded">
        <div>
          <h2 className="text-neutral-600">Solicitante</h2>
          <p className="text-neutral-600">
            Nome: <span className="text-neutral-900">{ticket?.Solicitor}</span>
          </p>
        </div>
        {/* Locatário */}
        <div>
        <h2 className="text-neutral-600">Locatário</h2>
        <p className="text-neutral-600">
          Nome: <span className="text-neutral-900">{ticket?.LocatarioName}</span>
        </p>
        <p className="text-neutral-600">
          Contato: <span className="text-neutral-900">{ticket?.LocatarioContact}</span>
        </p>
        </div>
        
        {/* Locador */}
        <div>
        <h2 className="text-neutral-600">Locador</h2>
        <p className="text-neutral-600">  
          Nome: <span className="text-neutral-900">{ticket?.LocadorName}</span>
        </p>
        <p className="text-neutral-600">
          Contato: <span className="text-neutral-900">{ticket?.LocadorContact}</span>
        </p>
        </div>

        {/* Tipo de manutenção */}
        <VisualizarItem label="Tipo" informacao={ticket?.TypeTicket} />

        {/* Endereço do Imóvel */}
        <VisualizarItem
        label="Imóvel"
        informacao={ticket?.Address}
        />

        {/* Data da solicitação do chamado */}
        <VisualizarItem label="Data da solicitação" informacao={ticket?.DateSolicitation} />

        {/* Período do chamado */}
        <div>
        <h2 className="text-neutral-600">Período</h2>
        <div className="flex flex-row gap-10">
          <p className="text-neutral-600">
          Início <span className="text-neutral-900">{ticket?.DateStart}</span>
          </p>
          <p className="text-neutral-600">
          Fim <span className="text-neutral-900">{ticket?.DateEnd}</span>
          </p>
        </div>
        </div>

        {/* Descrição do chamado */}
        <div>
        <h2 className="text-neutral-600">Descrição</h2>
        <p>
          {ticket?.Description}
        </p>
        </div>

        {/* Status do chamado */}
        <p className="absolute top-1 right-2 text-neutral-600 italic">Aberto</p>
      </div>
      </section>

      <Footer />
    </main>
  );
}
