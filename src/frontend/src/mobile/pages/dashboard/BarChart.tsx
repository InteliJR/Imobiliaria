import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import axiosInstance from "../../../services/axiosConfig";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
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
  
      // Debug para inspecionar os dados
      console.log(pagamentos);  // Inspecione a estrutura para garantir que "pagamento.contrato" seja o campo correto
  
      // Agrupar os pagamentos por contrato
      const dataMap: { [key: string]: number } = {};
  
      pagamentos.forEach((pagamento: any) => {
        // Verifique se o nome do campo para o contrato é correto
        const contrato = pagamento.contratoId;  // Ajuste para o nome correto do campo
        const valor = pagamento.valor;
  
        if (dataMap[contrato]) {
          dataMap[contrato] += valor; // Soma os valores para o mesmo contrato
        } else {
          dataMap[contrato] = valor; // Inicia o valor para um novo contrato
        }
      });
  
      // Organizar os dados para o gráfico
      const labels = Object.keys(dataMap); // Contratos
      const values = labels.map(contrato => dataMap[contrato]); // Valores totais dos pagamentos
  
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
  console.log(paymentData);
  // Verifica se os dados estão carregados
  if (loading || !paymentData) {
    return <div>Carregando...</div>;
  }

  // Dados para o gráfico de barras
  const barChartData = {
    labels: paymentData.labels,  // Contratos
    datasets: [
      {
        label: "Distribuição de Pagamentos por Contrato",
        data: paymentData.values,  // Valores dos pagamentos
        backgroundColor: "#4CAF50", // Cor das barras
        borderColor: "#388E3C",  // Cor da borda das barras
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
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
    <div className="flex flex-col gap-y-5 min-h-screen">
      <main className="px-4 gap-y-5 mt-4 flex flex-1 flex-col">
        {/* Gráfico de barras */}
        <div className="w-full h-[300px] md:h-[400px]">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </main>
    </div>
  );
}
