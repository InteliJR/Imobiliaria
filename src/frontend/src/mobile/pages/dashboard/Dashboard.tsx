import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/FooterSmall";
import Voltar from "../../../components/Botoes/Voltar";
import { showErrorToast } from "../../../utils/toastMessage";
import FormField from "../../components/Form/FormField";
import Loading from "../../../components/Loading";
import FilterIcon from "/Filter.svg";
import axiosInstance from "../../../services/axiosConfig";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [totalPagamentos, setTotalPagamentos] = useState(0);
  const [quantidadeMultas, setQuantidadeMultas] = useState(0);
  const [valorTotalAlugueis, setValorTotalAlugueis] = useState(0);

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

      let totalPagamentos = 0;
      let quantidadeMultas = 0;
      let valorTotalAlugueis = 0;

      // Itera sobre os pagamentos para calcular as informações desejadas
      pagamentosData.forEach((pagamento: any) => {
        totalPagamentos += pagamento.valor; // Soma o valor total dos pagamentos

        if (pagamento.multa) {
          quantidadeMultas++; // Conta as multas
        }

        if (pagamento.tipoPagamento === "aluguel") {
          valorTotalAlugueis += pagamento.valor; // Soma o valor dos aluguéis
        }
      });

      // Atualiza os estados com os dados calculados
      setTotalPagamentos(totalPagamentos);
      setQuantidadeMultas(quantidadeMultas);
      setValorTotalAlugueis(valorTotalAlugueis);
    } catch (error) {
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
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 min-h-screen">
      <Navbar />
      <main className="px-4 gap-y-5 mt-4 flex flex-1 flex-col">
        <div className="max-w-6xl w-full m-auto">
          <Voltar />
          {loading ? (
            <Loading type="skeleton" />
          ) : (
            <>
              {/* Formulário */}
              <section className="flex flex-col gap-y-5">
                <h2 className="text-2xl font-semibold">
                  Monitoramento Financeiro
                </h2>

                <form className="grid grid-cols-1 gap-4">
                  <div className="flex w-full gap-2 items-end">
                    <div className="w-full">
                      <FormField
                        label="Buscar boleto"
                        value={searchTerm}
                        onChange={setSearchTerm}
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
              </section>

              {/* Cards */}
              <section className="flex-grow flex flex-col">
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="flex flex-col">
                    <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                      <h2 className="text-base">Total de Pagamentos</h2>
                    </label>
                    <div className="border border-gray-300 text-2xl font-bold shadow-[0px_0px_7px_rgba(0,0,0,0.2)] rounded-[6px] overflow-hidden h-[90px] flex items-center justify-center">
                      {<p className="leading-none m-0 p-0">R$ {totalPagamentos.toFixed(2)}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                      <h2 className="text-base">Quantidade de Multas</h2>
                    </label>
                    <div className="border border-gray-300 text-2xl font-bold shadow-[0px_0px_7px_rgba(0,0,0,0.2)] rounded-[6px] overflow-hidden h-[90px] flex items-center justify-center">
                      {<p className="leading-none m-0 p-0">{quantidadeMultas}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                    <h2 className="text-base">Valor Total de Aluguéis</h2>
                  </label>
                  <div className="border border-gray-300 text-2xl font-bold shadow-[0px_0px_7px_rgba(0,0,0,0.2)] rounded-[6px] overflow-hidden h-[90px] flex items-center justify-center">
                    {<p className="leading-none m-0 p-0">R$ {valorTotalAlugueis.toFixed(2)}</p>}
                  </div>
                </div>
                {/* Gráficos */}
                <div className="flex flex-wrap lg:flex-nowrap w-full overflow-hidden mt-8 gap-4">
                  <LineChart />
                  <BarChart />
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
