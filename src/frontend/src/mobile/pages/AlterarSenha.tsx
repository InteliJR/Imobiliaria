import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../components/Voltar";
import FormField from "../components/Form/FormField";
import Botao from "../../components/Botoes/Botao";
import ModalConfirmacao from "../components/ModalConfirmacao";

export default function Senha() {
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função para exibir o modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Função chamada ao confirmar a ação no modal
  const handleConfirm = () => {
    setIsModalVisible(false);
    console.log("Senha alterada com sucesso:", {
      senhaAntiga,
      novaSenha,
      confirmarSenha,
    });
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

        <form className="flex flex-col gap-4 mb-4">
          <FormField
            label="Senha Antiga"
            onChange={setSenhaAntiga}
            isPassword
          />
          <FormField label="Nova Senha" onChange={setNovaSenha} isPassword />
          <FormField
            label="Confirmar Senha"
            onChange={setConfirmarSenha}
            isPassword
          />
        </form>

        <Botao label="Confirmar" onClick={showModal} />
      </section>

      <Footer />

      {/* Renderiza o modal de confirmação se `isModalVisible` for true */}
      {isModalVisible && (
        <ModalConfirmacao
          mensagem="Tem certeza de que deseja alterar a senha?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
