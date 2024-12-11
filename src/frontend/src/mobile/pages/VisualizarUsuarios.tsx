import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Usuarios/Card";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import { showErrorToast } from "../../utils/toastMessage";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import axiosInstance from "../../services/axiosConfig";

export default function Users() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento

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

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />
        <button
          type="submit"
          className="w-full h-10 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
        >
          Adicionar usuário
        </button>
        <h2 className="text-2xl font-semibold">Usuários</h2>
        <form className="grid grid-cols-1 gap-4">
          {/* Linha com FormField e botão Filtrar ocupando toda a largura */}
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
              <FormFieldFilter
                label="Buscar usuário"
                onFilter={(searchTerm) => {
                  console.log(searchTerm);
                  const filtered = data.filter((user) =>
                    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setFilteredData(filtered);
                }}
              />
            </div>
            {/* TODO: Colocar outra tela com detalhes de filtro, podendo filtrar de outras maneiras */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
            >
              Filtrar
              {/* Ícone SVG importado */}
              <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Cards */}
        <section className="flex-grow flex flex-col gap-y-5">
          <h2 className="text-2xl font-semibold">Resultados</h2>
          <div className="h-[1px] bg-black"></div>
          {loading ? (
            <Loading type="skeleton" />
          ) : filteredData.length === 0 ? (
            <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
              Nenhum usuário encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((user, index) => {
                const roleLower = user.role.toLowerCase();
                const status =
                  roleLower === "admin"
                    ? "Admin"
                    : roleLower === "judiciario"
                    ? "Judiciário"
                    : roleLower === "locador"
                    ? "Locador"
                    : roleLower === "locatario"
                    ? "Locatário"
                    : "Desconhecido";

                return (
                  <Card
                    key={index}
                    id={user.usuarioId}
                    title={user.nome || "Nome não disponível"}
                    line1={user.nImoveis || "Número de imóveis não disponível"}
                    line2={user.endereco || "Endereço não disponível"}
                    line3={user.dataCriacao || "Data de criação não disponível"}
                    status={status as "Locador" | "Locatário"}
                  />
                );
              })}
            </div>
          )}
        </section>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
