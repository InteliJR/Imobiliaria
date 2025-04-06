import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import FormField from "../components/Form/FormField";
import Botao from "../../components/Botoes/Botao";
import Loading from "../../components/Loading";
import ModalConfirmacao from "../../components/ModalConfirmacao";
import axiosInstance from "../../services/axiosConfig";
import { toast } from "react-toastify";
export default function Senha() {
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // estado para controlar o componente de carregamento

  // Função para exibir o modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Função chamada ao confirmar a ação no modal
  const handleConfirm = async () => {
    setIsModalVisible(false);
    setLoading(true);
    try {
      if (senhaAntiga === "" || novaSenha === "" || confirmarSenha === "") {
        // console.log("Preencha todos os campos");
        return false;
      }

      if (novaSenha !== confirmarSenha) {
        // console.log("As senhas não coincidem");
        return false;
      }

      const response = await axiosInstance.post(
        `auth/User/AlterarSenhaUsuario?oldPassword=${senhaAntiga}&newPassword=${confirmarSenha}`
      );

      // console.log(response.data);

      toast.success(
        response?.data?.message || "Senha alterada com sucesso."
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );

      // console.error(error?.response?.data?.message || "Erro ao alterar a senha");
    } finally {
      setLoading(false);
    }
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

        <div className="w-full flex justify-center items-center">
          <form className="flex flex-col gap-4 mb-4 w-[42rem]">
            <FormField
              label="Senha Antiga"
              value={senhaAntiga}
              onChange={setSenhaAntiga}
              isPassword
            />
            <FormField
              label="Nova Senha"
              value={novaSenha}
              onChange={setNovaSenha}
              isPassword
            />
            <FormField
              label="Confirmar Nova Senha"
              value={confirmarSenha}
              onChange={setConfirmarSenha}
              isPassword
            />
          </form>
        </div>

        <Botao label="Confirmar" onClick={showModal} />
      </section>

      {loading && <Loading type="spinner" />}

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
