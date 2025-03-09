import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import VisualizarItem from "../components/VisualizarItem";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";

export default function Chamado() {
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento

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
    Status: string;
  }

  const [ticket, setTicket] = useState<Ticket | null>(null);

  const fetchTicket = async () => {
    try {
      const id = window.location.pathname.split("/").pop();

      const chamadosResponse = await axiosInstance.get(
        `property/Chamados/PegarChamadosPorId/${id}`
      );

      const SolicitorResponse = await axiosInstance.get(
        `auth/User/PegarUsuario?userId=${chamadosResponse.data.solicitanteId}`
      );

      const propertiesResponse = await axiosInstance.get(
        `property/Imoveis/PegarImovelPorId/${chamadosResponse.data.idImovel}`
      );

      const LocatarioResponse = await axiosInstance.get(
        `auth/Locatario/PegarLocatarioPorLocatarioID?LocatarioID=${propertiesResponse.data.locatarioId}`
      );

      console.log("Locatario:", LocatarioResponse.data);

      const LocadorResponse = await axiosInstance.get(
        `auth/Locador/PegarLocadorPorLocadorID?locadorID=${propertiesResponse.data.locadorId}`
      );

      console.log("Locador:", LocadorResponse.data);

      if (
        !chamadosResponse.data ||
        !SolicitorResponse.data ||
        !propertiesResponse.data
      ) {
        console.error("Dados de resposta inválidos");
        showErrorToast("Erro ao se conectar com o servidor.");
        return;
      }

      console.log("Chamado:", chamadosResponse.data);
      console.log("Usuário:", SolicitorResponse.data);
      console.log("Imóvel:", propertiesResponse.data);

      const newTicket = {
        ChamadoId: chamadosResponse.data.idChamado,
        Titulo: chamadosResponse.data.titulo || "Título não informado",
        Solicitor: SolicitorResponse.data.nome || "Usuário desconhecido",
        LocadorName:
          LocadorResponse.data.nomeCompletoLocador || "Usuário desconhecido",
        LocadorContact:
          LocadorResponse.data.numeroTelefone || "Telefone não informado",
        LocatarioName:
          LocatarioResponse.data.nomeCompletoLocatario ||
          "Usuário desconhecido",
        LocatarioContact:
          LocatarioResponse.data.numeroTelefone || "Telefone não informado",
        TypeTicket: chamadosResponse.data.tipoChamado || "Tipo não informado",
        Address: propertiesResponse.data.endereco || "Endereço desconhecido",
        DateSolicitation:
          chamadosResponse.data.dataSolicitacao || "Data não informada",
        DateStart: chamadosResponse.data.dataInicio || "Data não informada",
        DateEnd: chamadosResponse.data.dataFim || "Data não informada",
        Description:
          chamadosResponse.data.descricao || "Descrição não informada",
        Status: chamadosResponse.data.status || "Status não informado",
      };

      // Formatar data e hora para o padrão brasileiro
      const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("pt-BR", options);
      };

      newTicket.DateSolicitation = formatDate(newTicket.DateSolicitation);
      newTicket.DateStart = formatDate(newTicket.DateStart);
      newTicket.DateEnd = formatDate(newTicket.DateEnd);

      setTicket(newTicket);

      // console.log("Chamado:", newTicket);

      setLoading(false);
    } catch (error) {
      console.error(error);

      showErrorToast("Erro ao se conectar com o servidor.");
    }
  };

  const closeTicket = async () => {
    try {
      const id = window.location.pathname.split("/").pop();

      const response = await axiosInstance.put(
        `property/Chamados/AtualizarStatus/${id}?Status=fechado`
      );

      if (!response.data) {
        console.error("Dados de resposta inválidos");
        showErrorToast("Erro ao se conectar com o servidor.");
        return;
      }

      console.log("Chamado fechado com sucesso!");

      // Redirecionar para a página de chamados
      window.location.href = "/chamados";
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
        <div className="w-full flex flex-col justify-center items-center">
          <div className="max-w-6xl w-full">
            <Voltar />
            {loading ? (
              <Loading type="skeleton" />
            ) : (
              <>
                <h1 className="text-title font-strong mb-4 mt-4">
                  Chamado: {ticket?.Titulo}
                </h1>
                <div className="relative flex flex-col gap-5 border-2 border-neutral-500 p-4 rounded">
                  <div className="flex flex-col md:flex-row md:gap-8">
                    {/* Primeira coluna */}
                    <div className="flex-1 flex flex-col gap-5">
                      {/* Solicitante */}
                      <div>
                        <h2 className="text-neutral-600">Solicitante</h2>
                        <p className="text-neutral-600">
                          Nome:{" "}
                          <span className="text-neutral-900">
                            {ticket?.Solicitor}
                          </span>
                        </p>
                      </div>
                      {/* Locatário */}
                      <div>
                        <h2 className="text-neutral-600">Locatário</h2>
                        <p className="text-neutral-600">
                          Nome:{" "}
                          <span className="text-neutral-900">
                            {ticket?.LocatarioName}
                          </span>
                        </p>
                        <p className="text-neutral-600">
                          Contato:{" "}
                          <span className="text-neutral-900">
                            {ticket?.LocatarioContact}
                          </span>
                        </p>
                      </div>
                      {/* Locador */}
                      <div>
                        <h2 className="text-neutral-600">Locador</h2>
                        <p className="text-neutral-600">
                          Nome:{" "}
                          <span className="text-neutral-900">
                            {ticket?.LocadorName}
                          </span>
                        </p>
                        <p className="text-neutral-600">
                          Contato:{" "}
                          <span className="text-neutral-900">
                            {ticket?.LocadorContact}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Segunda coluna */}
                    <div className="flex-1 flex flex-col gap-5">
                      {/* Tipo de chamado */}
                      <VisualizarItem
                        label="Tipo"
                        informacao={
                          ticket?.TypeTicket ?? "Tipo não especificado"
                        }
                      />
                      {/* Endereço do imóvel */}
                      <VisualizarItem
                        label="Imóvel"
                        informacao={
                          ticket?.Address ?? "Endereço não especificado"
                        }
                      />
                      {/* Datas */}
                      <VisualizarItem
                        label="Data da solicitação"
                        informacao={
                          ticket?.DateSolicitation ?? "Data não informada"
                        }
                      />
                      <VisualizarItem
                        label="Data de início"
                        informacao={ticket?.DateStart ?? "Data não informada"}
                      />
                      <VisualizarItem
                        label="Data de término"
                        informacao={ticket?.DateEnd ?? "Data não informada"}
                      />
                    </div>
                  </div>

                  {/* Descrição */}
                  <div>
                    <h2 className="text-neutral-600">Descrição</h2>
                    <p className="bg-gray-100 p-2 rounded-sm">{ticket?.Description}</p>
                  </div>

                  {/* Status */}
                  <p className="absolute top-1 right-2 text-neutral-600 italic">
                    {ticket?.Status === "aberto" ? "Aberto" : "Fechado"}
                  </p>
                </div>

                {/* Botão para fechar chamado */}
                {ticket?.Status === "aberto" && (
                  <button
                    className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
                    onClick={closeTicket}
                  >
                    Fechar Chamado
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
