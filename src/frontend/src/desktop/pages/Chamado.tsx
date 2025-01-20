import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";

export default function Chamado() {
  const [loading, setLoading] = useState(true);

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

      const LocadorResponse = await axiosInstance.get(
        `auth/Locador/PegarLocadorPorLocadorID?locadorID=${propertiesResponse.data.locadorId}`
      );

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
      <main className="bg-gray-100 min-h-screen">
        <Navbar />
  
        <section className="section-custom max-w-8xl mx-auto px-8 py-6">
          <Voltar />
  
          {loading ? (
            <Loading type="skeleton" />
          ) : (
            <>
              <h1 className="text-title font-bold text-center text-2xl mb-6">
                Chamado: {ticket?.Titulo}
              </h1>
              <div className="grid grid-cols-2 gap-8 border-2 border-neutral-500 bg-white p-8 rounded-lg shadow-md">
                {/* Solicitante */}
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    Solicitante
                  </h3>
                  <p className="text-neutral-600">
                    Nome:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.Solicitor}
                    </span>
                  </p>
                </div>
  
                {/* Locatário */}
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    Locatário
                  </h3>
                  <p className="text-neutral-600">
                    Nome:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.LocatarioName}
                    </span>
                  </p>
                  <p className="text-neutral-600">
                    Contato:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.LocatarioContact}
                    </span>
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-xl font-semibold text-neutral-800">Status</h3>
                  <p className="text-neutral-600">
                    Status:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.Status}
                    </span>
                  </p>
                </div>

                {/* Locador */}
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    Locador
                  </h3>
                  <p className="text-neutral-600">
                    Nome:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.LocadorName}
                    </span>
                  </p>
                  <p className="text-neutral-600">
                    Contato:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.LocadorContact}
                    </span>
                  </p>
                </div>
  
                {/* Imóvel */}
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-xl font-semibold text-neutral-800">Imóvel</h3>
                  <p className="text-neutral-600">
                    Endereço:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.Address}
                    </span>
                  </p>
                </div>
  
                {/* Datas */}
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-xl font-semibold text-neutral-800">Datas</h3>
                  <p className="text-neutral-600">
                    Data da Solicitação:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.DateSolicitation}
                    </span>
                  </p>
                  <p className="text-neutral-600">
                    Data de Início:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.DateStart}
                    </span>
                  </p>
                  <p className="text-neutral-600">
                    Data de Conclusão:{" "}
                    <span className="text-neutral-900 font-medium">
                      {ticket?.DateEnd}
                    </span>
                  </p>
                </div>
  
                {/* Descrição */}
                <div className="flex flex-col gap-y-2 col-span-2">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    Descrição
                  </h3>
                  <p className="text-neutral-900">{ticket?.Description}</p>
                </div>
              </div>
  
              {/* Botão para fechar chamado */}
              {ticket?.Status === "aberto" && (
                <div className="mt-6 text-center">
                  <button
                    className="h-12 px-8 bg-black hover:bg-neutral-800 text-neutral-50 text-base font-medium rounded"
                    onClick={closeTicket}
                  >
                    Fechar Chamado
                  </button>
                </div>
              )}
            </>
          )}
        </section>
  
        <Footer />
      </main>
    );
}
