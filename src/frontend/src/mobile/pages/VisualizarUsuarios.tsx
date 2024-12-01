import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Usuarios/Card";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Voltar from "../components/Voltar";
import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";


export default function MainPage() {
  const [userData, setUserData] = useState({
    nome: null,
    telefone: null,
    nImoveis: null,
    role: null,
    desde: null,
  });
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const getAllInfo = async () => {
    try {
      const responseAuth = await axiosInstance.get('auth/User/PegarTodosUsuarios');
      const responseProperty = await axiosInstance.get('property/Imoveis/PegarTodosImoveis');
  
      if (!responseAuth.data || !responseProperty.data) {
        console.error("Dados de resposta inválidos");
        return;
      }
  
      // Você pode manter ou ajustar o filtro de usuários conforme necessário
      const usersWithRelevantRoles = responseAuth.data;
  
      const combinedData = usersWithRelevantRoles.map((user) => {
        // Filtrar imóveis relacionados ao usuário usando roleId
        const imoveis = responseProperty.data.filter((imovel) => {
          const isLocador = Number(imovel.locadorId) === Number(user.roleId);
          const isLocatario = Number(imovel.locatarioId) === Number(user.roleId);
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
    } catch (error) {
      console.error("Erro ao obter informações de usuários ou imóveis:", error.message);
    }
  };
  
  
  
  useEffect(() => {
    getAllInfo();
  }, []);

  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 min-h-screen">
      <Navbar />
      <main className="px-4 gap-y-5 mt-4 flex flex-col">
        <Voltar />
        <button
          type="submit"
          className="w-full h-10 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
        >
          Adicionar usuário
        </button>

        {/* Formulário */}
        <section className="flex flex-col gap-y-5">
          <h2 className="text-2xl font-semibold">Usuários</h2>
          <form className="grid grid-cols-1 gap-4">
            {/* Linha com FormField e botão Filtrar ocupando toda a largura */}
            <div className="flex w-full gap-2 items-end">
                <div className="w-full">
                <FormFieldFilter
                  label="Buscar usuário"
                  onFilter={(searchTerm) => {
                    console.log(searchTerm);
                    const filtered = data.filter(user =>
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
        </section>

        {/* Cards */}
        <section className="flex-grow flex flex-col gap-y-5">
          <h2 className="text-2xl font-semibold">Resultados</h2>
          <div className="h-[1px] bg-black"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((user, index) => {
              const roleLower = user.role.toLowerCase();
              const status = roleLower === "admin" ? "Admin" :
                   roleLower === "judiciario" ? "Judiciario" :
                   roleLower === "locador" ? "Locador" :
                   roleLower === "locatario" ? "Locatário" :
                   "Desconhecido";
                   
                return (
                <Card
                  key={index}
                  id={user.usuarioId}
                  title={user.nome || "Nome não disponível"}
                  line1={user.nImoveis || "Número de imóveis não disponível"}
                  line2={user.endereco || "Endereço não disponível"}
                  line3={user.dataCriacao || "Data de criação não disponível"}
                  status={status}
                />
                );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
