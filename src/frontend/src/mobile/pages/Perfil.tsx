import { Route, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../components/Voltar";
import VisualizarItem from "../components/VisualizarItem";
import Botao from "../../components/Botoes/Botao";
import BotaoAlterarSenha from "../../components/Botoes/BotaoAlterarSenha";
import axiosInstance from "../../services/axiosConfig";
import { useState, useEffect } from "react";

export default function Perfil() {
  const navigate = useNavigate(); // Obtendo a função navigate
  const [userData, setUserData] = useState({
    nome: null,
    telefone: null,
    nacionalidade: null,
    cpf: null,
    rg: null,
    passaporte: null,
    endereço: null,
    CNPJ: null,
    email: null,
    dataCriacao: null,
    role: null
  });

  const profileEdit = () => {
    navigate("/perfil/editar"); // Navega para a página de edição de perfil
  };

  const passwordEdit = () => {
    navigate("/perfil/alterar-senha"); // Navega para a página de alteração de senha
  };

  // Integracao com o back

  const getUser = async () => {
    try{
        const response = await axiosInstance.get(`auth/Account/WhoAmI`);
        console.log(response.data);

        // Alterar os valores dos campos com os dados do usuário

        const UserInfo = response.data;

        if(UserInfo.role == "Admin" || UserInfo.role == "Judiciario"){

          const notApplicable = "Não aplicável";
          
          setUserData({
          nome: UserInfo.nome,
          telefone: notApplicable,
          nacionalidade: notApplicable,
          cpf: notApplicable,
          rg: notApplicable,
          passaporte: notApplicable,
          endereço: notApplicable,
          CNPJ: notApplicable,
          email: UserInfo.email,
          dataCriacao: new Date(UserInfo.dataCriacao).toLocaleDateString('pt-BR'), // formatar para dd/mm/yyyy
          role: UserInfo.role
          });
          } else{
          setUserData({
            nome: UserInfo.nome,
            telefone: UserInfo.telefone,
            nacionalidade: UserInfo.nacionalidade,
            cpf: UserInfo.cpf,
            rg: UserInfo.rg,
            passaporte: UserInfo.passaporte,
            endereço: UserInfo.endereco,
            CNPJ: UserInfo.cnpj,
            email: UserInfo.email,
            dataCriacao: new Date(UserInfo.dataCriacao).toLocaleDateString('pt-BR'),
            role: UserInfo.role
          })
          }



    } catch(erro: any){
        console.log(erro.response?.data?.message || "Erro ao buscar o usuário");
    }
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />

        <div>
          <h1 className="text-title font-strong">{userData.nome || " "}</h1>
          <h2 className="text-sm text-gray-700">{userData.role || " "}</h2>
        </div>

        <Botao label="Editar Perfil" onClick={profileEdit} />

        <div className="flex flex-col gap-4 border-2 border-neutral-900 p-4 rounded">
          <h1 className="mb-1 font-strong text-lg">Informações Pessoais</h1>

          <VisualizarItem
            label="E-mail"
            informacao={userData.email || " "}
          />
          <VisualizarItem label="Telefone" informacao={userData.telefone || " "} />
          <VisualizarItem label="Data de Criação" informacao={userData.dataCriacao || " "} />
          <VisualizarItem label="Nacionalidade" informacao={userData.nacionalidade || " "} />
          <VisualizarItem label="CPF" informacao={userData.cpf || " "} />
          <VisualizarItem label="RG" informacao={userData.rg || " "} />
          <VisualizarItem label="Passaporte" informacao={userData.passaporte || " "} />
          <VisualizarItem label="Endereço" informacao={userData.endereço || " "} />
          <VisualizarItem label="CNPJ" informacao={userData.CNPJ || " "} />
        </div>

        <BotaoAlterarSenha label="Alterar Senha" onClick={passwordEdit} />
      </section>

      <Footer />
    </main>
  );
}
