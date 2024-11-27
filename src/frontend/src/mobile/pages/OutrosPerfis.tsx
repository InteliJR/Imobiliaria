import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../components/Voltar";
import VisualizarItem from "../components/VisualizarItem";
import Botao from "../../components/Botoes/Botao";
import BotaoAlterarSenha from "../../components/Botoes/BotaoAlterarSenha";
import ModalConfirmacao from "../components/ModalConfirmacao";

export default function Perfil() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate(); // Obtendo a função navigate

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

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />

        <h1 className="text-title font-strong mb-2">Nome do Usuário</h1>

        <Botao label="Editar Perfil" onClick={profileEdit} />

        <div className="flex flex-col gap-4 border-2 border-neutral-900 p-4 rounded">
          <h1 className="mb-1 font-strong text-lg">Informações Pessoais</h1>

          <VisualizarItem label="Tipo do usuário" informacao="Comum" />
          <VisualizarItem
            label="E-mail"
            informacao="emailDoUsuario@gmail.com"
          />
          <VisualizarItem label="Telefone" informacao="(11) 12345-6789" />
          <VisualizarItem label="Data de Criação" informacao="25/09/2024" />
          <VisualizarItem label="Senha" informacao="senhaDoUsuario4321" />
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