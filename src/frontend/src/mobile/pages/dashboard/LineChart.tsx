import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loading from "../../../components/Loading";
import axiosInstance from "../../../services/axiosConfig"; // Certifique-se de que esse caminho está correto

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [chartKey, setChartKey] = useState(0); // Estado para forçar re-renderização com uma chave

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("payment/Payment/listar-pagamentos");

      // Verificar se os dados da API são válidos
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
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Carregar os dados reais da API
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setChartKey(prevKey => prevKey + 1); // Alterando a chave a cada redimensionamento para forçar re-renderização
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Escuta redimensionamento sem afetar os dados

  if (loading || !paymentData) {
    return <Loading type="box" boxHeight={200} />;
  }

  const lineChartData = {
    labels: paymentData.labels,
    datasets: [
      {
        label: "Distribuição de Pagamentos",
        data: paymentData.values,
        borderColor: "#4CAF50", // Cor da linha
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Cor de fundo da área abaixo da linha
        fill: true, // Preenche a área abaixo da linha
        tension: 0.3, // Suaviza a curva da linha
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Permite o redimensionamento
    plugins: {
      title: {
        display: true,
        text: "Distribuição de Pagamentos ao Longo do Tempo",
      },
    },
    scales: {
      x: {
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
    <div className="w-full lg:w-1/2">
      {/* Passando a chave para forçar o re-render */}
      <Line key={chartKey} data={lineChartData} options={chartOptions} />
    </div>
  );
}
