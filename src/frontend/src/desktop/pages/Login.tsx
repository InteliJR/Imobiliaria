import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterBig";
import FormField from "../../mobile/components/Form/FormField";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); // estado para controlar o componente de carregamento
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      // Requisição de login
      const response = await axiosInstance.post("auth/Account/Login", {
        Email: email,
        Senha: senha,
      });

      // Obtém token JWT se autenticação bem sucedida e armazena no localStorage
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);

      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken);
      const roleClaim =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"; // Era usado para impedir visualização de rotas protegidas
      const role = decodedToken[roleClaim]; // Era usado para impedir visualização de rotas protegidas
      localStorage.setItem("userRole", role); // Era usado para impedir visualização de rotas protegidas
      
      if(role === 'Admin') {
        navigate('/imoveis');
      }
      else if (role === 'Locatario') {
        navigate('/home-locatario');
      }
      else if (role === 'Locador') {
        navigate('/home-locador');
      }
      else if (role === 'Judiciario') {
        navigate('/dashboard');
      }
      else {
        navigate('/');
      }

    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F0F0F0] flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar showMenu={false}/>

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
