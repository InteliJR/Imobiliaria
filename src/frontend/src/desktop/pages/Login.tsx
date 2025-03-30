import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterBig";
import FormField from "../../mobile/components/Form/FormField";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { jwtDecode } from "jwt-decode";
import { useAtom } from 'jotai'; // Importe o useAtom
import { userAtom } from '../../store/atoms'; // Importe o atom

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); // estado para controlar o componente de carregamento
  const navigate = useNavigate();

  // Use o hook useAtom para acessar e atualizar o atom
  const [, setUserData] = useAtom(userAtom);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      // Limpeza dos inputs
      const cleanedEmail = email.trim().toLowerCase();
      const cleanedSenha = senha.trim();
  
      if (!cleanedEmail || !cleanedSenha) {
        showErrorToast("Email e senha são campos obrigatórios");
        return;
      }
  
      // Requisição de login
      const response = await axiosInstance.post("auth/Account/Login", {
        Email: cleanedEmail,
        Senha: cleanedSenha,
      });
  
      // Obtém token JWT e armazena no localStorage
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
  
      // Decodifica o token JWT para obter o papel (role) do usuário
      const decodedToken: any = jwtDecode(token);
      const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      const role = decodedToken[roleClaim];
      localStorage.setItem("userRole", role);
  
      // Busca as informações do usuário após o login
      await getUser();
  
      // Redireciona o usuário com base no papel (role)
      const routes: Record<string, string> = {
        Admin: '/imoveis',
        Locatario: '/home-locatario',
        Locador: '/home-locador',
        Judiciario: '/dashboard',
      };
  
      navigate(routes[role] || '/');
  
    } catch (error: any) {
      console.error(error.response?.data);
      showErrorToast(error.response?.data || "Erro ao tentar fazer login.");
    } finally {
      setLoading(false);
    }
  };
  

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("auth/Account/WhoAmI");
      const UserInfo = response.data;

      const userData1 = {
        nome: UserInfo.nome,
        telefone: UserInfo.telefone || null,
        nacionalidade: UserInfo.nacionalidade || null,
        cpf: UserInfo.cpf || null,
        rg: UserInfo.rg || null,
        passaporte: UserInfo.passaporte || null,
        endereco: UserInfo.endereco || null,
        CNPJ: UserInfo.cnpj || null,
        email: UserInfo.email,
        dataCriacao: new Date(UserInfo.dataCriacao).toLocaleDateString("pt-BR"),
        role: UserInfo.role,
        roleId: UserInfo.roleId || null,
      };

      // Atualiza o atom com os dados do usuário
      setUserData(userData1);

    } catch (error: any) {
      console.error(error.response?.data?.message || "Erro ao buscar o usuário");
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
    }
  };

  return (
    <div className="bg-[#F0F0F0] flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar showMenu={false} />

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm">
          {/* Form */}
          <h2 className="text-start text-title font-strong mb-10">Login</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <FormField
                placeholder="Email"
                label="Email:"
                value={email}
                onChange={setEmail}
              />
            </div>
            <div className="mb-10">
              <FormField
                placeholder="Senha"
                label="Senha:"
                value={senha}
                onChange={setSenha}
                isPassword={true}
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-10 bg-neutral-900 text-neutral-50 font-bold rounded hover:bg-neutral-800 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {loading && <Loading type="spinner" />}

      {/* Footer */}
      <Footer />
    </div>
  );
}