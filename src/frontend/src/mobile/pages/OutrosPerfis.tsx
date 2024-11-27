import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../components/Voltar";
import VisualizarItem from "../components/VisualizarItem";
import Botao from "../../components/Botoes/Botao";
import BotaoAlterarSenha from "../../components/Botoes/BotaoAlterarSenha";
import ModalConfirmacao from "../components/ModalConfirmacao";
import axiosInstance from "../../services/axiosConfig";

export default function Perfil() {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    role: null,
  });

  const profileEdit = () => {
    navigate("/perfil/editar/:id"); // Navega para a página de edição de perfil passando o id do usuário em questão
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    console.log("Resetar senha deste usuário");
    // Lógica de integração com o back
  };

  // Função chamada ao cancelar a ação no modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Const get user
  const getUser = async () => {
    // Pegar id na url
    const id = window.location.pathname.split("/").pop();

    console.log(id);

    try{
      const response = await axiosInstance.get(`auth/User/PegarUsuario?userId=${id}`);
      console.log(response.data);

      // Alterar os valores dos campos com os dados do usuário

      const UserInfo = response.data;

      if(UserInfo.role == "Admin" || UserInfo.role == "Judiciario"){
          setUserData({
          nome: UserInfo.nome,
          telefone: null,
          nacionalidade: UserInfo.national,
          cpf: null,
          rg: null,
          passaporte: null,
          endereço: null,
          CNPJ: null,
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

        <h1 className="text-title font-strong mb-2">{userData.nome}</h1>

        <Botao label="Editar Perfil" onClick={profileEdit} />

        <div className="flex flex-col gap-4 border-2 border-neutral-900 p-4 rounded">
          <h1 className="mb-1 font-strong text-lg">Informações Pessoais</h1>

          <VisualizarItem label="Tipo do usuário" informacao={userData.role} />
          <VisualizarItem
            label="E-mail"
            informacao={userData.email}
          />
          <VisualizarItem label="Telefone" informacao={userData.telefone} />
          <VisualizarItem label="Data de Criação" informacao={userData.dataCriacao} />
        </div>

        <BotaoAlterarSenha label="Resetar Senha" onClick={showModal} />
      </section>

      <Footer />

      {isModalVisible && (
        <ModalConfirmacao
          mensagem="Tem certeza de que deseja resetar a senha deste usuário?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
