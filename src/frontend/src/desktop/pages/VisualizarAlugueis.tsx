import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import CreateNextMonthsModal from "../components/CreateNextMonthsModal";
import RentCard from "../components/CardAluguel";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Loading from "../../components/Loading";
import Voltar from "../../components/Botoes/Voltar";
import { showErrorToast } from "../../utils/toastMessage";

// Tipagem do objeto Rent retornado da API
interface Rent {
  aluguelId: number;
  contratoId: number;
  pagamentoId: number;
  status: boolean;     // true = pago, false = pendente
  mes: string;
  ano: string;
    boletoDoc: string | null;
payment: {
    pagamentoId: number;
    valor: number;
    data: string;
    status: boolean;
    contratoId: number;
    descricao: string;
    metodoPagamento: string;
    multa: boolean;
    pagante: string;
    tipoPagamento: string;
    valorMulta: number;
} | null;
}

export default function VisualizarAlugueis() {
  // const navigate = useNavigate();
  const { id } = useParams(); // Obtém o ID do imóvel pela URL

  // Estados
  const [data, setData] = useState<Rent[]>([]);
  const [filteredData, setFilteredData] = useState<Rent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [contractId, setContractId] = useState(0);

  // Busca de dados na API
  const fetchRents = async () => {
    try {
      const userRole = localStorage.getItem("userRole");
      let contractIdResponse = null;
      const response = await axiosInstance.get(`payment/Rent/alugueisPorImovel/${id}`);

      if(userRole === "Locatario" || userRole === "Locador") {
        contractIdResponse = await axiosInstance.get(`property/Contratos/PegarContratoPorImovelIdComVerificacao/${id}`);
      } else {
        contractIdResponse = await axiosInstance.get(`payment/Rent/pegarContratoIdPorImovelId/${id}`);
      }

      // console.log(contractIdResponse.data);
      if(!contractIdResponse.data) {
        console.error("Dados de resposta inválidos");
        return; 
      }
      setContractId(contractIdResponse.data);
      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }
  
      // "Achata" a resposta: { ...item.rent, payment: item.payment }
      const newData = response.data.map((item: any) => {
        return {
          ...item.rent,
          payment: item.payment
        };
      });
  
      // Ordenar por mês e ano
      // Assumindo que `a.mes` seja algo como "05/2025"
      // e eventualmente `a.ano` também exista (ex.: 2025)
      newData.sort((a: Rent, b: Rent) => {
        // Primeiro, vamos tentar extrair do campo a.mes => "05/2025"
        if (a.mes && a.mes.includes("/")) {
          const [mA, yA] = a.mes.split("/");
          const [mB, yB] = b.mes.split("/");
  
          const mesA = parseInt(mA, 10);
          const anoA = parseInt(yA, 10);
          const mesB = parseInt(mB, 10);
          const anoB = parseInt(yB, 10);
  
          const dateA = new Date(anoA, mesA - 1, 1);
          const dateB = new Date(anoB, mesB - 1, 1);
          return dateA.getTime() - dateB.getTime();
        } else {
          // Caso a.mes não esteja no formato "MM/YYYY"
          // mas tenhamos a.ano e a.mes separados
          // Exemplo: a.ano = "2025" e a.mes = "05"
  
          const yearA = parseInt(a.ano, 10);
          const monthA = parseInt(a.mes, 10);
          const dateA = new Date(yearA, monthA - 1, 1);
  
          const yearB = parseInt(b.ano, 10);
          const monthB = parseInt(b.mes, 10);
          const dateB = new Date(yearB, monthB - 1, 1);
  
          return dateA.getTime() - dateB.getTime();
        }
      });

      setContractId(newData[0].contratoId);
      setData(newData);
      setFilteredData(newData);
    } catch (error) {
      console.error(error);
      showErrorToast("Erro ao buscar alugueis");
    } finally {
      setLoading(false);
    }
  };
  
  // Efeito para buscar dados ao montar o componente
  useEffect(() => {
    fetchRents();
  }, []);

  // Efeito para filtrar com base no texto digitado
  useEffect(() => {
    if (!search.trim()) {
      // Se não há texto de busca, exibe todos
      setFilteredData(data);
      return;
    }
    const lowerSearch = search.toLowerCase();
    // Filtra por mês ou ano
    const finalResult = data.filter((rent) =>
      rent.mes.toLowerCase().includes(lowerSearch) || rent.ano.includes(search)
    );
    setFilteredData(finalResult);
  }, [search, data]);


    function handleSuccessCreate() {
        fetchRents();
    }

  return (
    <main className="main-custom">
      <Navbar />

      <div className="flex flex-col bg-[#F0F0F0] gap-y-5 p-6 min-h-screen">
        {/* Header */}
        <Voltar />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-neutral-800">
            Aluguéis do imóvel
          </h2>
          <button
            type="button"
            className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
            onClick={() => setShowModal(true)}
          >
            Adicionar meses
          </button>
            <CreateNextMonthsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                contractId={contractId || 0} 
                onSuccess={handleSuccessCreate}
              />
        </div>

        {/* Campo de busca simples */}
        <form className="flex items-end gap-4 mb-6">
          <div className="flex-grow">
            <FormFieldFilter
              label="Buscar aluguel por mês/ano"
              onFilter={(searchTerm) => setSearch(searchTerm)}
            />
          </div>
          {/* Botão de filtro avançado (removido ou adaptado) */}
          <button
            type="button"
            className="flex items-center justify-center hover:bg-neutral-800 gap-2 px-6 h-10 bg-[#1F1E1C] text-neutral-50 text-sm font-medium rounded"
            onClick={() => alert("Filtro avançado ainda não implementado.")}
          >
            Filtrar
            <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
          </button>
        </form>

        {/* Listagem */}
        <section className="flex flex-col gap-y-5">
          <h2 className="text-2xl font-semibold">Resultados</h2>
          <div className="h-[1px] bg-neutral-400 mb-4"></div>
          {loading ? (
            <Loading type="skeleton" />
          ) : (
            <div className="flex flex-col gap-6">
              {filteredData.length === 0 ? (
                <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                  Nenhum aluguel encontrado.
                </p>
              ) : (
                filteredData.map((rent) => (
                    <RentCard
                    key={rent.aluguelId}
                    id={rent.aluguelId}
                    contractId={rent.contratoId}
                    month={rent.mes}
                    year={rent.ano}
                    paid={rent.status}
                    paymentData={{
                        pagamentoId: rent.payment?.pagamentoId || 0,
                        valor: rent.payment?.valor || 0,
                        data: rent.payment?.data || "Sem data",
                        contratoId: rent.payment?.contratoId || 0,
                        descricao: rent.payment?.descricao || "Sem descrição",
                        metodoPagamento: rent.payment?.metodoPagamento || "Sem método",
                        multa: rent.payment?.multa || false,
                        pagante: rent.payment?.pagante || "Sem pagante",
                        tipoPagamento: rent.payment?.tipoPagamento || "Sem tipo",
                        valorMulta: rent.payment?.valorMulta || 0,
                        boletoDoc: rent.boletoDoc, // ou rent.payment?.boletoDoc, dependendo da sua estrutura
                        mes: rent.mes,
                        ano: rent.ano,
                        status: rent.payment?.status || false
                    }}
                    />
                ))
              )}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}

