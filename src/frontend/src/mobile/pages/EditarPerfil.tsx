import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../components/Voltar";
import FormField from "../components/Form/FormField";
import ModalConfirmacao from "../components/ModalConfirmacao";
import Botao from "../../components/Botoes/Botao";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";

export default function EditarPerfil() {
  // Estado do formulário para armazenar dados do usuário
  const [userData, setUserData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dataMock = { // dados mockados
    nome: "Jabesmar Feverêncio",
    telefone: "(11) 12345-6789",
    nacionalidade: "Brasileiro",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    passaporte: "123456789",
    cep: "12345-678",
    logradouro: "Rua Exemplo",
    numeroResidencia: "123",
    complemento: "Apto 45",
    bairro: "Bairro Exemplo",
    estado: "SP",
    cidade: "São Paulo",
  };

  // função para trazer este perfil do banco
  const fetchProfile = () => {
    try {
      setUserData(dataMock); // mocka dados

      console.log("Traz perfil");

      // Requisição...
    } catch (error) {
      console.error(error);

      showErrorToast(error?.response?.data?.message || "Erro ao se conectar com o servidor.");
    }
  };

  useEffect(() => {
    fetchProfile()
  }, []);

  // Tipagem explícita para os parâmetros 'field' e 'value'
  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const showModal = () => setIsModalVisible(true);

  const handleConfirm = () => {
    try {
      setIsModalVisible(false);
      console.log("Perfil salvo com sucesso:", userData);

      setIsModalVisible(false); // fecha o modal

      // Requisição...

      showSuccessToast(response?.data?.message || "Perfil alterado com sucesso.");
    } catch (error) {
      console.error(error);

      showErrorToast(error?.response?.data?.message || "Erro ao se conectar com o servidor.");
    }
  };

  const handleCancel = () => setIsModalVisible(false);

  return (
    <main className="main-custom">
      <Navbar />
      <section className="section-custom">
        <Voltar />
        <h1>Editar Perfil</h1>

        <form className="flex flex-col gap-4 mb-4">
          <FormField
            label="Nome"
            initialValue={userData.nome}
            onChange={(value) => handleInputChange("nome", value)}
          />
          <FormField
            label="Telefone"
            initialValue={userData.telefone}
            onChange={(value) => handleInputChange("telefone", value)}
          />
          <FormField
            label="Nacionalidade"
            initialValue={userData.nacionalidade}
            onChange={(value) => handleInputChange("nacionalidade", value)}
          />
          <FormField
            label="CPF"
            initialValue={userData.cpf}
            onChange={(value) => handleInputChange("cpf", value)}
          />
          <FormField
            label="RG"
            initialValue={userData.rg}
            onChange={(value) => handleInputChange("rg", value)}
          />
          <FormField
            label="Passaporte"
            initialValue={userData.passaporte}
            onChange={(value) => handleInputChange("passaporte", value)}
          />
          <FormField
            label="CEP"
            initialValue={userData.cep}
            onChange={(value) => handleInputChange("cep", value)}
          />
          <FormField
            label="Logradouro"
            initialValue={userData.logradouro}
            onChange={(value) => handleInputChange("logradouro", value)}
          />
          <FormField
            label="Número da Residência"
            initialValue={userData.numeroResidencia}
            onChange={(value) => handleInputChange("numeroResidencia", value)}
          />
          <FormField
            label="Complemento"
            initialValue={userData.complemento}
            onChange={(value) => handleInputChange("complemento", value)}
          />
          <FormField
            label="Bairro"
            initialValue={userData.bairro}
            onChange={(value) => handleInputChange("bairro", value)}
          />
          <FormField
            label="Estado"
            initialValue={userData.estado}
            onChange={(value) => handleInputChange("estado", value)}
          />
          <FormField
            label="Cidade"
            initialValue={userData.cidade}
            onChange={(value) => handleInputChange("cidade", value)}
          />
        </form>

        <Botao label="Salvar" onClick={showModal} />
      </section>

      <Footer />

      {isModalVisible && (
        <ModalConfirmacao
          mensagem="Tem certeza de que deseja salvar as alterações no perfil?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
