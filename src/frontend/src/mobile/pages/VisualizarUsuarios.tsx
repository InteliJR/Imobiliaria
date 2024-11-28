import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Usuarios/Card";
import FormField from "../components/Form/FormField";
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

  const getAllInfo = async () => {
    try {
      const response = await axiosInstance.get(`auth/User/PegarTodosUsuarios`);
      console.log(response.data);

      const response2 = await axiosInstance.get(`property/Imoveis/PegarTodosImoveis`);

      console.log(response2.data);

      // Resposta PegarTodosUsuarios
      // {
      //   "usuarioId": 2,
      //   "roleId": 1,
      //   "role": "Admin",
      //   "nome": "Lucas Legal",
      //   "cpf": null,
      //   "telefone": null,
      //   "nacionalidade": null,
      //   "endereco": null,
      //   "cnpj": null,
      //   "passaporte": null,
      //   "rg": null,
      //   "email": "hilewok988@acroins.com",
      //   "ativo": true,
      //   "dataCriacao": "2024-10-30T21:08:48.006427",
      //   "imovelId": 0
      // }

      // Resposta PegarTodosImoveis
        //       bairro
        // : 
        // "Centro"
        // cep
        // : 
        // "01234-567"
        // complemento
        // : 
        // "Apto 301"
        // condominio
        // : 
        // 500
        // descricao
        // : 
        // "Apartamento bem localizado"
        // endereco
        // : 
        // "Rua das Flores, 100"
        // imovelId
        // : 
        // 11
        // tipoImovel
        // : 
        // "Apartamento"
        // valorImovel
        // : 
        // 300000

        // Unir os dois arrays

        const combinedData = response.data
          .map((user: { imovelId: number, role: string }) => {
            if (user.role === "Admin" || user.role === "Judiciario") {
              return { ...user, endereco: null, descricao: null, valorImovel: null };
            }
            const imovel = response2.data.find((imovel: { imovelId: number }) => imovel.imovelId === user.imovelId);
            return imovel ? { ...user, ...imovel } : null;
          }).filter((item: any) => item !== null);
        
        // Formatar a dataCriacao para data e só ano e mes
        combinedData.forEach((item: any) => {
          item.dataCriacao = new Date(item.dataCriacao).toLocaleDateString();
        });
        
        setData(combinedData);
        
        console.log("Resultado foda");
        console.log(combinedData);

    } catch (error) {
      console.error(error);
    }
  }

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
                <FormField
                  label="Buscar usuário"
                  onChange={() => {}} // Função onChange vazia
                />
              </div>
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
            {data.map((user, index) => {
                const status: "Locador" | "Locatário" | "Admin" | "Judiciario" =
                user.role === "Admin" ? "Admin" : user.role === "Judiciario" ? "Judiciario" : index % 2 === 0 ? "Locador" : "Locatário";
              return (
              <Card
                key={index}
                id={user.usuarioId}
                title={user.nome}
                line1={user.nImoveis}
                line2={user.endereco}
                line3={user.dataCriacao}
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
