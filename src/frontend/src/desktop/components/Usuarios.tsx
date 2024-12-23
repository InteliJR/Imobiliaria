import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandlordCard from "./CardUsuario";
import FormField from "../../mobile/components/Form/FormField";
import Loading from "../../components/Loading";
import FilterIcon from "/Filter.svg";
import { showErrorToast } from "../../utils/toastMessage";
// import { AxiosError } from "axios";
import axiosInstance from "../../services/axiosConfig";

export default function UsuariosComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState(""); // Estado para o campo de busca

  const getAllInfo = async () => {
    try {
      const responseAuth = await axiosInstance.get(
        "auth/User/PegarTodosUsuarios"
      );
      const responseProperty = await axiosInstance.get(
        "property/Imoveis/PegarTodosImoveis"
      );

      if (!responseAuth.data || !responseProperty.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      // Você pode manter ou ajustar o filtro de usuários conforme necessário
      const usersWithRelevantRoles = responseAuth.data;

      const combinedData = usersWithRelevantRoles.map((user: any) => {
        // Filtrar imóveis relacionados ao usuário usando roleId
        const imoveis = responseProperty.data.filter((imovel: any) => {
          const isLocador = Number(imovel.locadorId) === Number(user.roleId);
          const isLocatario =
            Number(imovel.locatarioId) === Number(user.roleId);
          return isLocador || isLocatario;
        });

        console.log(`Usuário: ${user.nome}, Imóveis encontrados:`, imoveis);

        return {
          ...user,
          nImoveis: imoveis.length,
          imoveis,
        };
      });

      setData(combinedData);
      setFilteredData(combinedData); // Inicialmente exibir todos os usuários
      console.log("Dados combinados:", combinedData);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
      console.error(
        "Erro ao obter informações de usuários ou imóveis:",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const searchLower = search.toLowerCase();
    const filtered = data.filter((user: any) =>
      user.nome.toLowerCase().includes(searchLower)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-neutral-800">Usuários</h2>
        <button
          type="button"
          className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
          onClick={() => navigate("/usuarios/criar")}
        >
          Adicionar Usuário
        </button>
      </div>

      {/* Formulário */}
      <form className="flex items-end gap-4 mb-6" onSubmit={handleFilter}>
        <div className="flex-grow">
          <FormField
            label="Buscar usuário"
            value={search}
            onChange={(e: any) =>
              setSearch(e.target.value)
            }
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center hover:bg-neutral-800 gap-2 px-6 h-10 bg-[#1F1E1C] text-neutral-50 text-sm font-medium rounded"
        >
          Filtrar
          <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
        </button>
      </form>

      {/* Cards */}
      <section className="flex flex-col gap-y-5">
        <h2 className="text-2xl font-semibold">Resultados</h2>
        <div className="h-[1px] bg-neutral-400 mb-4"></div>
        {loading ? (
          <Loading type="skeleton" />
        ) : filteredData.length === 0 ? (
          <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
            Nenhum usuário encontrado.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredData.map((user: any) => (
              <LandlordCard
                key={user.id}
                id={user.id}
                name={user.nome || "Nome não disponível"}
                role={user.role || "Função não disponível"}
                cpf={user.cpf || "não encontrado"}
                rg={user.rg || "não encontrado"}
                associatedProperties={user.nImoveis}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
