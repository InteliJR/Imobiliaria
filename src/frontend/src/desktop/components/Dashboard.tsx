import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { showErrorToast } from "../../utils/toastMessage";
import Loading from "../../components/Loading";

export default function MainPage() {
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento

  const pieData = [
    { name: "Residencial", valor: 400 },
    { name: "Comercial", valor: 300 },
    { name: "Industrial", valor: 300 },
    { name: "Terrenos", valor: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const lineData = [
    { month: "Jan", valor: 4000 },
    { month: "Feb", valor: 3000 },
    { month: "Mar", valor: 2000 },
    { month: "Apr", valor: 2780 },
    { month: "May", valor: 1890 },
    { month: "Jun", valor: 2390 },
    { month: "Jul", valor: 3490 },
  ];

  const fetchData = () => {
    try {
      console.log("traz os dados dos gráficos");

      // Requisição...
      setLoading(false); // Caso a requisição dos dados tenha sido bem sucedida
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        showErrorToast(
          error.response?.data?.message || "Erro ao se conectar com o servidor."
        );
      } else {
        showErrorToast("Erro ao se conectar com o servidor.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-[#F0F0F0] p-4">
      <main className="flex-1">
        <h2 className="text-3xl font-bold text-neutral-800 mb-6">
          Monitoramento Financeiro
        </h2>

        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <section className="grid grid-cols-12 gap-6">
            {/* Gráfico de Pizza */}
            <div className="col-span-12 md:col-span-4 bg-white rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-4">Imóveis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="valor"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico de Linhas */}
            <div className="col-span-12 md:col-span-8 bg-white rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-4">Faturamento Mensal</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="valor"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cards Resumo */}
            <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-3 bg-white rounded shadow p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600">Aluguéis em Atraso</p>
              <p className="text-2xl font-bold text-neutral-800">00</p>
            </div>
            <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-3 bg-white rounded shadow p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600">Chamados em Aberto</p>
              <p className="text-2xl font-bold text-neutral-800">00</p>
            </div>
            <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-3 bg-white rounded shadow p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600">Número de Locadores</p>
              <p className="text-2xl font-bold text-neutral-800">21</p>
            </div>
            <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-3 bg-white rounded shadow p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600">Número de Locatários</p>
              <p className="text-2xl font-bold text-neutral-800">15</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
