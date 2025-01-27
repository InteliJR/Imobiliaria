// Modified version of ChamadosImovel to display Pagamentos
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Payments/CardPayments";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { FaClipboardList, FaFileContract, FaHome, FaUsers } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function PagamentosImovel() {
  const navigate = useNavigate();
  interface Pagamento {
    paymentId: number;
    contratoId: number;
    valor: number;
    data: string;
    pagante: string;
    metodoPagamento: string;
    descricao: string;
    tipoPagamento: string;
    multa: boolean;
    valorMulta: number;
  }

  // const { imovelId } = useParams();

  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPagamentos = async () => {
    try {
      const response = await axiosInstance.get(
        "payment/Payment/listar-pagamentos"
      );

      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      const pagamentosData = response.data;

      const mappedData = pagamentosData.map((pagamento: Pagamento) => ({
        paymentId: pagamento.paymentId,
        title: pagamento.descricao || "Descrição não informada",
        line1: pagamento.pagante || "Pagante desconhecido",
        line2: pagamento.metodoPagamento || "Método não informado",
        line3: new Date(pagamento.data).toLocaleDateString("pt-BR"),
        status: pagamento.multa ? `Multa: R$ ${pagamento.valorMulta.toFixed(2)}` : "Sem multa",
      }));

      setPagamentos(mappedData);
      setFilteredData(mappedData);

    } catch (error: any) {
      console.error(error);
      showErrorToast("Erro ao se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagamentos();
  }, []);

  return (
    <main className="main-custom">
      <Navbar />
      <div className="flex justify-start gap-6 ms-2">
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
          <span className="z-10">Chamados</span>
        </button>
      </div>
      <div className="h-[1px] bg-neutral-400 mb-4"></div>
      <section className="section-custom">
        <Voltar />
        <h2 className="text-2xl font-semibold">Pagamentos</h2>
        <form className="grid grid-cols-1 gap-4">
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
              <FormFieldFilter
                label="Buscar pagamento"
                onFilter={(searchTerm) => {
                  const filtered = pagamentos.filter((pagamento) =>
                    pagamento.descricao.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setFilteredData(filtered);
                }}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
            >
              Filtrar
              <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>
        </form>

        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <section className="flex-grow flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">Resultados</h2>
            <div className="h-[1px] bg-black"></div>
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((pagamento) => (
                  <Card
                    key={pagamento.paymentId}
                    paymentid={pagamento.paymentId}
                    title={pagamento.title}
                    line1={pagamento.line1}
                    line2={pagamento.line2}
                    line3={pagamento.line3}
                    status={pagamento.status}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                Nenhum pagamento encontrado.
              </p>
            )}
          </section>
        )}
      </section>

      <Footer />
    </main>
  );
}
