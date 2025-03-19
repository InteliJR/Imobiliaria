import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [totalPagamentos, setTotalPagamentos] = useState(0);
  const [quantidadeMultas, setQuantidadeMultas] = useState(0);
  const [valorTotalAlugueis, setValorTotalAlugueis] = useState(0);

  const fetchPagamentos = async () => {
    try {
      const response = await axiosInstance.get("payment/Payment/listar-pagamentos");

      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      const pagamentosData = response.data;

      let totalPagamentos = 0;
      let quantidadeMultas = 0;
      let valorTotalAlugueis = 0;

      // Itera sobre os pagamentos para calcular as informações desejadas
      pagamentosData.forEach((pagamento:any) => {
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

  // const fetchPagamentos = async () => {
  //   try {
  //     const response = await axiosInstance.get(
  //       "payment/Payment/listar-pagamentos"
  //     );

  //     if (!response.data) {
  //       console.error("Dados de resposta inválidos");
  //       return;
  //     }

  //     const pagamentosData = response.data;

  //     const mappedData = pagamentosData.map((pagamento: Pagamento) => ({
  //       paymentId: pagamento.paymentId,
  //       title: pagamento.descricao || "Descrição não informada",
  //       line1: pagamento.pagante || "Pagante desconhecido",
  //       line2: pagamento.metodoPagamento || "Método não informado",
  //       line3: new Date(pagamento.data).toLocaleDateString("pt-BR"),
  //       status: pagamento.multa ? `Multa: R$ ${pagamento.valorMulta.toFixed(2)}` : "Sem multa",
  //     }));

  //     setPagamentos(mappedData);
  //     setFilteredData(mappedData);

  //   } catch (error: any) {
  //     console.error(error);
  //     showErrorToast("Erro ao se conectar com o servidor.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPagamentos();
  // }, []);

  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 min-h-screen">
      <Navbar />
      <main className="px-4 gap-y-5 mt-4 flex flex-1 flex-col">
        <Voltar />
        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <>
            {/* Formulário */}
            <section className="flex flex-col gap-y-5">
              <h2 className="text-2xl font-semibold">Monitoramento Financeiro</h2>
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
            <section className="flex-grow flex flex-col gap-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5"><h2>Total de Pagamentos</h2></label>
                  <div className="border border-neutral-300 bg-[#D9D9D9] text-2xl font-bold shadow-[2px_2px_4px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden h-[120px] flex items-center justify-center">
                    {<p>R$ {totalPagamentos.toFixed(2)}</p>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5"><h2>Quantidade de Multas</h2></label>
                  <div className="border border-neutral-300 bg-[#D9D9D9] text-2xl font-bold shadow-[2px_2px_4px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden h-[120px] flex items-center justify-center">
                    {<p>{quantidadeMultas}</p>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5"><h2>Valor Total de Aluguéis</h2></label>
                <div className="border border-neutral-300 bg-[#D9D9D9] text-2xl font-bold shadow-[2px_2px_4px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden h-[120px] flex items-center justify-center">
                  {<p>R$ {valorTotalAlugueis.toFixed(2)}</p>}
                </div>
              </div>

              {/* Gráficos */}
              <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">

                <LineChart />
                <BarChart />

                {/* Gráfico de pizza */}

              </div>
            </section>
          </>
        )}
      </main>


      {/* Footer */}
      <Footer />
    </div>
  );
}
