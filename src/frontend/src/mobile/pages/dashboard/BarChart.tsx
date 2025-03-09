import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import axiosInstance from "../../../services/axiosConfig";
import Loading from "../../../components/Loading"; // Suponho que você tenha um componente de loading

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [chartKey, setChartKey] = useState(0); // Estado para forçar re-renderização com uma chave

  useEffect(() => {
    // Requisição à API para pegar os dados
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("payment/Payment/listar-pagamentos");

        // Se não houver dados, retornamos
        if (!response.data) {
          console.error("Dados de resposta inválidos");
          return;
        }

        const pagamentos = response.data;

        // Agrupar os pagamentos por contrato
        const dataMap: { [key: string]: number } = {};

        pagamentos.forEach((pagamento: any) => {
          const contrato = pagamento.contratoId; // Ajuste para o nome correto do campo
          const valor = pagamento.valor;

          if (dataMap[contrato]) {
            dataMap[contrato] += valor;
          } else {
            dataMap[contrato] = valor;
          }
        });

        // Organizar os dados para o gráfico
        const labels = Object.keys(dataMap); // Contratos
        const values = labels.map((contrato) => dataMap[contrato]); // Valores totais dos pagamentos

        setPaymentData({ labels, values });
        setLoading(false); // Finaliza o loading
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []); // Apenas executa uma vez quando o componente é montado

  useEffect(() => {
    const handleResize = () => {
      setChartKey((prevKey) => prevKey + 1); // Alterando a chave a cada redimensionamento para forçar re-renderização
    };

    window.addEventListener("resize", handleResize); // Adiciona o listener para redimensionamento
    
    return () => window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar
  }, []); // Escuta redimensionamento sem afetar os dados

  // Verifica se os dados estão carregados
  if (loading || !paymentData) {
    return <Loading type="box" boxHeight={200} />; // Componente de loading enquanto os dados não estão prontos
  }

  const barChartData = {
    labels: paymentData.labels,
    datasets: [
      {
        label: "Distribuição de Pagamentos por Contrato",
        data: paymentData.values,
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: "Distribuição de Pagamentos por Contrato",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Contrato",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor Total Pago",
        },
      },
    },
  };

  return (
    <div className="w-full lg:w-1/2">
      {/* Passando a chave para forçar o re-render */}
      <Bar key={chartKey} data={barChartData} options={chartOptions} />
    </div>
  );
}
