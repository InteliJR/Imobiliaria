import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from "./Menu"; // Ajuste o caminho se necessário

interface NavbarProps {
  showLoginButton?: boolean; // Prop opcional para exibir o botão "Entrar"
  showMenu?: boolean; // Prop opcional para exibir o menu
}

export default function NavBar({
  showLoginButton = false,
  showMenu = true,
}: NavbarProps) {
  // Usar a prop com valor padrão
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa o useNavigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Exemplo de tipo de usuário, você obteria isso dinamicamente em seu aplicativo
  const userType = "tenant";

  const handleLoginClick = () => {
    navigate("/login"); // Redireciona para a página de Login
  };

  return (
    <div>
      <div className="bg-neutral-black flex justify-between items-center px-4 py-4 min-h-20">
        <div>
          <a href="/">
          
            <img src="/Logo.svg" alt="Logo" /> <a href="/"></a>
          </a>
        </div>
        <div>
          {showLoginButton ? (
            <button
              className="text-white cursor-pointer"
              onClick={handleLoginClick}
            >
              Entrar
            </button>
          ) : showMenu ? (
            <button onClick={toggleMenu} className="focus:outline-none">
              <GiHamburgerMenu size={35} className="text-[#fefefe] hover:text-[#ccc] transition-all duration-300 ease-in-out"/>
            </button>
          ) : null}
        </div>
      </div>

      {/* Menu hamburguer em tela cheia */}
      {isOpen && (
        <Menu userType={userType} toggleMenu={toggleMenu} isOpen={isOpen} />
      )}
    </div>
  );
}
