import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandlordCard from "./CardUsuario";
import FormField from "../../mobile/components/Form/FormField";
import FilterIcon from "/Filter.svg";
import { showErrorToast } from "../../utils/toastMessage";

export default function ChamadosComponent() {
  const navigate = useNavigate();

  const fetchUsers = () => {
    try {
      console.log("Traz os usuários");

      // Requisição...
    } catch (error) {
      console.error(error);

      showErrorToast(error?.response?.data?.message || "Erro ao se conectar com o servidor.");
    }
  };

  useEffect(() => {
    fetchUsers();
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
      <form className="flex items-end gap-4 mb-6">
        <div className="flex-grow">
          <FormField label="Buscar usuário" onChange={() => {}} />
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
        <div className="flex flex-col gap-6">
          {Array.from({ length: 6 }, (_, index) => {
            // Sample data for each card
            const name = index % 2 === 0 ? "Renan Feitosa" : "Lucas Matheus Nunes";
            const role = "Locador";
            const cpf = `041.675.157-${17 + index}`;
            const rg = `37953.553-${1 + index}`;
            const associatedProperties = 5 + index;

            return (
              <LandlordCard
                key={index}
                id={index + 1}
                name={name}
                role={role}
                cpf={cpf}
                rg={rg}
                associatedProperties={associatedProperties}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
