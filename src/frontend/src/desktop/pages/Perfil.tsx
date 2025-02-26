import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterBig";
import Voltar from "../../components/Botoes/Voltar";
import VisualizarItem from "../../mobile/components/VisualizarItem";
import Botao from "../../components/Botoes/Botao";
import BotaoAlterarSenha from "../../components/Botoes/BotaoAlterarSenha";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { useState, useEffect } from "react";

export default function PerfilDesktop() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    nome: string | null;
    telefone: string | null;
    nacionalidade: string | null;
    cpf: string | null;
    rg: string | null;
    passaporte: string | null;
    endereco: string | null;
    CNPJ: string | null;
    email: string | null;
    dataCriacao: string | null;
    role: string | null;
  }>({
    nome: null,
    telefone: null,
    nacionalidade: null,
    cpf: null,
    rg: null,
    passaporte: null,
    endereco: null,
    CNPJ: null,
    email: null,
    dataCriacao: null,
    role: null,
  });

  const profileEdit = () => {
    navigate("/perfil/editar");
  };

  const passwordEdit = () => {
    navigate("/perfil/alterar-senha");
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("auth/Account/WhoAmI");
      const UserInfo = response.data;

      if (UserInfo.role === "Admin" || UserInfo.role === "Judiciario") {
        const notApplicable = "N/A";

        setUserData({
          nome: UserInfo.nome,
          telefone: notApplicable,
          nacionalidade: notApplicable,
          cpf: notApplicable,
          rg: notApplicable,
          passaporte: notApplicable,
          endereco: notApplicable,
          CNPJ: notApplicable,
          email: UserInfo.email,
          dataCriacao: new Date(UserInfo.dataCriacao).toLocaleDateString(
            "pt-BR"
          ),
          role: UserInfo.role,
        });
      } else {
        setUserData({
          nome: UserInfo.nome,
          telefone: UserInfo.telefone,
          nacionalidade: UserInfo.nacionalidade,
          cpf: UserInfo.cpf,
          rg: UserInfo.rg,
          passaporte: UserInfo.passaporte,
          endereco: UserInfo.endereco,
          CNPJ: UserInfo.cnpj,
          email: UserInfo.email,
          dataCriacao: new Date(UserInfo.dataCriacao).toLocaleDateString(
            "pt-BR"
          ),
          role: UserInfo.role,
        });
      }

      setLoading(false);
    } catch (error: any) {
      console.error(error.response?.data?.message || "Erro ao buscar o usuário");
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main className="main-custom-desktop">
      <Navbar />

      <section className="section-custom-desktop container mx-auto px-8">
        <Voltar />

        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {userData.nome || " "}
                </h1>
                <h2 className="text-lg text-gray-600">{userData.role || " "}</h2>
              </div>

              <Botao label="Editar Perfil" onClick={profileEdit} />

              <BotaoAlterarSenha label="Alterar Senha" onClick={passwordEdit} />
            </div>

            <div className="lg:w-2/3 border-2 border-neutral-900 p-8 rounded">
              <h1 className="mb-6 text-xl font-bold">Informações Pessoais</h1>

              <div className="grid grid-cols-2 gap-4">
                <VisualizarItem
                  label="E-mail"
                  informacao={userData.email || " "}
                />
                <VisualizarItem
                  label="Telefone"
                  informacao={userData.telefone || " "}
                />
                <VisualizarItem
                  label="Data de Criação"
                  informacao={userData.dataCriacao || " "}
                />
                <VisualizarItem
                  label="Nacionalidade"
                  informacao={userData.nacionalidade || " "}
                />
                <VisualizarItem
                  label="CPF"
                  informacao={userData.cpf || " "}
                />
                <VisualizarItem
                  label="RG"
                  informacao={userData.rg || " "}
                />
                <VisualizarItem
                  label="Passaporte"
                  informacao={userData.passaporte || " "}
                />
                <VisualizarItem
                  label="Endereço"
                  informacao={userData.endereco || " "}
                />
                <VisualizarItem
                  label="CNPJ"
                  informacao={userData.CNPJ || " "}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
