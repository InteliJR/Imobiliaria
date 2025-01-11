import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Usuarios/Card";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import { showErrorToast } from "../../utils/toastMessage";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import axiosInstance from "../../services/axiosConfig";
import { IUser } from "../../components/Filter/UserInterfaces";
import { IFilterField } from "../../components/Filter/InputsInterfaces";
import { GenericFilterModal } from "../../components/Filter/Filter";  

export default function Users() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento

  const [advancedFiltered, setAdvancedFiltered] = useState<any[]>([]);


  // Busca textual
  const [search, setSearch] = useState("");

  // Controle do modal
  const [isModalOpen, setModalOpen] = useState(false);


  // Campos do filtro avançado (property-based)
  const userFilterFields: IFilterField<IUser>[] = [
    {
      name: "perfil",
      label: "Perfil",
      type: "select",
      options: ["Admin", "Locatario", "Locador"],
      property: "role",
    },
    { name: "cnpj", label: "CNPJ", type: "text", property: "cnpj" },
    { name: "cpf", label: "CPF", type: "text", property: "cpf" },
    { name: "email", label: "Email", type: "text", property: "email" },
    { name: "rg", label: "RG", type: "text", property: "rg" },
    { name: "telefone", label: "Telefone", type: "text", property: "telefone" },
    {
      name: "dataCriacao",
      label: "Data de Criação",
      type: "dateRange",
      property: "dataCriacao",
    },
    {
      name: "numeroImoveis",
      label: "Número de Imóveis",
      type: "number",
      property: "nImoveis",
      placeholder: "Digite o número de imóveis",
    },
    {
      name: "numeroImoveisRange",
      label: "Número de Imóveis",
      type: "numberRange",
      property: "nImoveis",
      placeholder: "Digite a faixa de numeros de imoveis",
    },
    {
      name: "filtroImovel",
      label: "Filtrar por CEP",
      type: "text",
      property: "imoveis",
      placeholder: "Digite o CEP do imóvel",
      customFilter: (user: IUser, filterValue: string) => {
        // Logica personalizada para filtrar os usaurios que possuem imoveis com um certo cep
        const lower = String(filterValue).toLowerCase();
        const cepOk = user.imoveis?.some((imovel) =>
          imovel.cep?.toLowerCase().includes(lower)
        );
        return cepOk;
      },
    }
  ];



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
      setAdvancedFiltered(combinedData); // Inicialmente exibir todos os usuários
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

  useEffect(() => {
    // Se search estiver vazio, "filteredData" = "advancedFiltered"
    if (!search.trim()) {
      setFilteredData(advancedFiltered);
      return;
    }
    const lower = search.toLowerCase();
    const finalResult = advancedFiltered.filter((user: any) =>
      user.nome?.toLowerCase().includes(lower)
    );
    setFilteredData(finalResult);
  }, [search, advancedFiltered]);

  // Abrir modal
  const openFilterModal = () => {
    setModalOpen(true);
  };

  // Callback do modal que ao clicar em "Buscar" já recebemos a array filtrada
  const handleFilteredResult = (resultado: any[]) => {
    // Esse "resultado" já está filtrado pelos campos avançados
    setAdvancedFiltered(resultado);
  };


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
              label="Buscar pelo nome"
              onFilter={(searchTerm) => {
                // Apenas guardamos em search
                setSearch(searchTerm);
              }}
            />
            </div>
            {/* TODO: Colocar outra tela com detalhes de filtro, podendo filtrar de outras maneiras */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
              onClick={openFilterModal}
            >
              Filtrar
              {/* Ícone SVG importado */}
              <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>

          <GenericFilterModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            fields={userFilterFields}
            data={data}
            onFilteredResult={handleFilteredResult}
          />

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
