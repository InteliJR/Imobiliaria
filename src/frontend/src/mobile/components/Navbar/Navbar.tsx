import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import Menu from '../Menu'; // Ajuste o caminho se necessário

interface NavbarProps {
  showLoginButton?: boolean; // Prop opcional para exibir o botão "Entrar"
}

export default function Navbar({ showLoginButton = false }: NavbarProps) { // Usar a prop com valor padrão
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa o useNavigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Exemplo de tipo de usuário, você obteria isso dinamicamente em seu aplicativo
  const userType = 'Administrador'; 

  const handleLoginClick = () => {
    navigate('/login'); // Redireciona para a página de Login
  };

  return (
    <div>
      <div className="bg-neutral-black flex justify-between items-center px-4 py-4 min-h-20">
        <div>
          <img src="/Logo.svg" alt="Logo" />
        </div>
        <div>
          {showLoginButton ? (
            <button className="text-white cursor-pointer" onClick={handleLoginClick}>Entrar</button> // Chama a função de redirecionamento
          ) : (
            <button onClick={toggleMenu} className="focus:outline-none">
              <img 
                src="/Menu.svg" 
                alt="Menu" 
                className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
              />
            </button>
          )}
        </div>
      </div>

      {/* Menu hamburguer em tela cheia */}
      {isOpen && <Menu userType={userType} toggleMenu={toggleMenu} isOpen={isOpen} />}
    </div>
  );
}
