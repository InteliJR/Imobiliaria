import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import axiosInstance from "../../../services/axiosConfig";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function LineChart() {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null); // Dados de pagamentos

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("payment/Payment/listar-pagamentos");

      // Se não houver dados, retornamos
      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      const pagamentos = response.data;

      // Agrupar os pagamentos por data
      const dataMap: { [key: string]: number } = {};

      pagamentos.forEach((pagamento: any) => {
        const date = pagamento.data.substring(0, 10); // Ex.: "2025-01-10"
        const valor = pagamento.valor;

        if (dataMap[date]) {
          dataMap[date] += valor; // Soma os valores para a mesma data
        } else {
          dataMap[date] = valor; // Inicia o valor para uma nova data
        }
      });

      // Organizar os dados para o gráfico
      const labels = Object.keys(dataMap).sort(); // Ordena as datas
      const values = labels.map(date => dataMap[date]);

      setPaymentData({ labels, values });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Verifica se os dados estão carregados
  if (loading || !paymentData) {
    return <div>Carregando...</div>;
  }

  // Dados para o gráfico de linha
  const lineChartData = {
    labels: paymentData.labels,
    datasets: [
      {
        label: "Distribuição de Pagamentos",
        data: paymentData.values,
        borderColor: "#4CAF50",  // Cor da linha
        backgroundColor: "rgba(76, 175, 80, 0.2)",  // Cor de fundo da área abaixo da linha
        fill: true,  // Preenche a área abaixo da linha
        tension: 0.3,  // Suaviza a curva da linha
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Distribuição de Pagamentos ao Longo do Tempo",
      },
    },
    scales: {
      x: {
        type: "category",  // Tipo de eixo X como categoria
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor Pago",
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-y-5 min-h-screen">
      <main className="px-4 gap-y-5 mt-4 flex flex-1 flex-col">
        {/* Gráfico de linha */}
        <div className="w-full h-[300px] md:h-[400px]">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </main>
    </div>
  );
}