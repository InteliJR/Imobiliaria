import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Chamados/Card";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { GenericFilterModal } from "../../components/Filter/Filter";
import { IFilterField } from "../../components/Filter/InputsInterfaces";


export default function Tickets() {
  interface Ticket {
    chamadoId: number;
    title: string;
    solicitor: string;
    address: string;
    date: string;
    open: boolean;
  }

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento
  const [data, setData] = useState<any[]>([]);
  const [advancedFiltered, setAdvancedFiltered] = useState<any[]>([]);

  // Busca textual
  const [search, setSearch] = useState("");

  // Controle do modal
  const [isModalOpen, setModalOpen] = useState(false);

  const TicketFilterFields: IFilterField<Ticket>[] = [
    {
      name: "title",
      label: "Título",
      type: "text",
      property: "title",
    },
    {
      name: "solicitor",
      label: "Solicitante",
      type: "text",
      property: "solicitor",
    },
    {
      name: "address",
      label: "Endereço",
      type: "text",
      property: "address",
    },
    {
      name: "date",
      label: "Data",
      type: "dateRange",
      property: "date",
    },
    {
      name: "open",
      label: "Aberto",
      type: "checkbox",
      property: "open",
    }
  ];

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
          solicitanteId: any;
          idImovel: any;
          idChamado: any;
          titulo: any;
          dataSolicitacao: any;
          status: any;
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
            open: chamado.status === "aberto" ? true : false,
          };
        }
      );

      setFilteredData(mergedData);
      setData(mergedData);
      setAdvancedFiltered(mergedData);
      // console.log("Dados mesclados:", mergedData);
    } catch (error: any) {
      console.error(error);

      showErrorToast("Erro ao se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Se search estiver vazio, "filteredData" = "advancedFiltered"
    if (!search.trim()) {
      setFilteredData(advancedFiltered);
      return;
    }
    const lower = search.toLowerCase();
    const finalResult = advancedFiltered.filter((ticket: any) =>
      ticket.title?.toLowerCase().includes(lower)
    );
    setFilteredData(finalResult);
  }, [search, advancedFiltered]);


  // Abrir modal
  const openFilterModal = () => {
    setModalOpen(true);
  };

  // Callback do modal que ao clicar em "Buscar" já recebemos a array filtrada
  const handleFilteredResult = (resultado: any[]) => {
    // Esse "resultado" já está filtrado pelos campos avançados
    setAdvancedFiltered(resultado);
  };


  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <main className="main-custom">
      <Navbar />

      {/* Formulário */}
      <section className="section-custom">
        <Voltar />
        <button
          type="submit"
          className="w-full h-10 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
        >
          Abrir chamado
        </button>
        <h2 className="text-2xl font-semibold">Chamados</h2>
        <form className="grid grid-cols-1 gap-4">
          {/* Linha com FormField e botão Filtrar ocupando toda a largura */}
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
            <FormFieldFilter
              label="Buscar chamado pelo título"
              onFilter={(searchTerm) => {
                setSearch(searchTerm);
              }}
            />
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
              onClick={openFilterModal}
            >
              Filtrar
              {/* Ícone SVG importado */}
              <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>
        </form>

        <GenericFilterModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          fields={TicketFilterFields}
          data={data}
          onFilteredResult={handleFilteredResult}
        />

        {/* Cards */}
        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <section className="flex-grow flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">Resultados</h2>
            <div className="h-[1px] bg-black"></div>
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((ticket) => (
                  <Card
                    key={ticket.chamadoId} // Usar o idChamado real como chave
                    id={ticket.chamadoId} // Passar o idChamado real como número
                    title={ticket.title} // Título com o id real
                    line1={ticket.solicitor} // Nome do solicitante
                    line2={ticket.address} // Endereço do imóvel
                    line3={new Date(ticket.date).toLocaleDateString("pt-BR")} // Data formatada
                    status={ticket.open ? "Aberto" : "Fechado"} // Status com base no campo `open`
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                Nenhum chamado encontrado.
              </p>
            )}
          </section>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
