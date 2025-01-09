import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandlordCard from "./CardUsuario";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import Loading from "../../components/Loading";
import FilterIcon from "/Filter.svg";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { GenericFilterModal } from "../../components/Filter/Filter";
import { IFilterField } from "../../components/Filter/InputsInterfaces";
// Se estiver usando a interface property-based, importe-a do local certo
// import { IUser } from "../../components/Filter/UserInterfaces";

export default function UsuariosComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Dados originais
  const [data, setData] = useState<any[]>([]);
  // Resultado do filtro avançado
  const [advancedFiltered, setAdvancedFiltered] = useState<any[]>([]);
  // Resultado final (após busca textual)
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Busca textual
  const [search, setSearch] = useState("");

  // Controle do modal
  const [isModalOpen, setModalOpen] = useState(false);

  // Campos do filtro avançado (property-based)
  const userFilterFields: IFilterField[] = [
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
      property:  "nImoveis",
      placeholder: "Digite a faixa de numeros de imoveis",
    },
    {
      name: "filtroImovel",
      label: "Filtrar por CEP",
      type: "text",
      property: "imoveis",
      placeholder: "Digite o CEP do imóvel",
      customFilter: (user, filterValue) => {
        // Logica personalizada para filtrar os usaurios que possuem imoveis com um certo cep
        const lower = String(filterValue).toLowerCase();
        const cepOk = user.imoveis?.some((imovel) =>
          imovel.cep?.toLowerCase().includes(lower)
        );
        return cepOk;
      },
    }
  ];

  // Carrega os dados da API
  const getAllInfo = async () => {
    try {
      const [responseAuth, responseProperty] = await Promise.all([
        axiosInstance.get("auth/User/PegarTodosUsuarios"),
        axiosInstance.get("property/Imoveis/PegarTodosImoveis"),
      ]);

      if (!responseAuth.data || !responseProperty.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      // Combina
      const combinedData = responseAuth.data.map((user: any) => {
        const imoveis = responseProperty.data.filter((imovel: any) => {
          const isLocador = Number(imovel.locadorId) === Number(user.roleId);
          const isLocatario = Number(imovel.locatarioId) === Number(user.roleId);
          return isLocador || isLocatario;
        });
        return {
          ...user,
          nImoveis: imoveis.length,
          imoveis,
        };
      });

      setData(combinedData);
      // Inicialmente sem nenhum filtro
      setAdvancedFiltered(combinedData);
      // E "filteredData" também
      setFilteredData(combinedData);

      console.log("Dados combinados:", combinedData);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
      console.error("Erro ao obter informações:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  /**
   * Sempre que "advancedFiltered" OU "search" mudam,
   * re-filtra "advancedFiltered" pelo "search"
   */
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

      {/* Campo de busca em tempo real */}
      <div className="flex items-end gap-4 mb-6">
        <div className="flex-grow">
          <FormFieldFilter
            label="Buscar pelo nome"
            onFilter={(searchTerm) => {
              // Apenas guardamos em search
              setSearch(searchTerm);
            }}
          />
        </div>

        {/* Botão para abrir modal de filtros */}
        <button
          type="button"
          className="flex items-center gap-2 px-6 h-10 bg-[#1F1E1C] text-neutral-50 text-sm font-medium rounded hover:bg-neutral-800"
          onClick={openFilterModal}
        >
          Filtros Avançados
          <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
        </button>
      </div>

      {/* Modal de filtros avançados  */}

      <GenericFilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        fields={userFilterFields}
        data={data}
        onFilteredResult={handleFilteredResult}
      />

      {/* Listagem de Usuários */}
      <section className="flex flex-col gap-y-5">
        <h2 className="text-2xl font-semibold">Resultados</h2>
        <div className="h-[1px] bg-neutral-400 mb-4" />

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
                key={user.usuarioId}
                id={user.usuarioId}
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
