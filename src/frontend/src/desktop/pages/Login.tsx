import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/FooterBig";
import FormField from "../../mobile/components/Form/FormField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toastMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Requisição de login
      navigate("/visualizar-imoveis");
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
