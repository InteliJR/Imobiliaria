import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface MenuProps {
  userType: string;
  toggleMenu: () => void;
  isOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ userType, toggleMenu, isOpen }) => {
  const navigate = useNavigate(); // Get the navigate function

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    toggleMenu();
  };

  const renderMenuItems = () => {
    switch (userType) {
      case 'Administrador':
        return (
          <ul className="text-center space-y-8 text-2xl">
            <li onClick={() => handleMenuItemClick('/dashboard')}>Dashboard Financeiro</li>
            <li onClick={() => handleMenuItemClick('/visualizar-usuarios')}>Lista de usuários</li>
            <li onClick={() => handleMenuItemClick('/visualizar-chamados')}>Lista de chamados</li>
            <li onClick={() => handleMenuItemClick('/visualizar-imoveis')}>Lista de imóveis</li>
            <li onClick={() => handleMenuItemClick('/perfil')}>Perfil</li>
            <li onClick={() => handleMenuItemClick('/login')}>Sair</li>
          </ul>
        );
      case 'Jurídico':
        return (
          <ul className="text-center space-y-8 text-2xl">
            <li onClick={() => handleMenuItemClick('/dashboard-financeiro')}>Dashboard Financeiro</li>
            <li onClick={() => handleMenuItemClick('/lista-imoveis')}>Lista Imóveis</li>
            <li onClick={() => handleMenuItemClick('/documentos-locacoes')}>Documentos relacionado as locações</li>
          </ul>
        );
      case 'Locador':
        return (
          <ul className="text-center space-y-8 text-2xl">
            <li onClick={() => handleMenuItemClick('/home')}>Home</li>
            <li onClick={() => handleMenuItemClick('/perfil')}>Perfil</li>
            <li onClick={() => handleMenuItemClick('/visualizar-imoveis')}>Visualizar Imóveis</li>
            <li onClick={() => handleMenuItemClick('/dashboard-financeiro')}>Dashboard Financeiro</li>
            <li onClick={() => handleMenuItemClick('/documentos-locacoes')}>Documentos das locações</li>
            <li onClick={() => handleMenuItemClick('/zipzops')}>Redirecionamento pro zipzops</li>
          </ul>
        );
      case 'Locatário':
        return (
          <ul className="text-center space-y-8 text-2xl">
            <li onClick={() => handleMenuItemClick('/home')}>Home</li>
            <li onClick={() => handleMenuItemClick('/perfil')}>Perfil</li>
            <li onClick={() => handleMenuItemClick('/abertura-chamados')}>Abertura de chamados</li>
            <li onClick={() => handleMenuItemClick('/visualizar-imoveis')}>Visualizar Imóveis</li>
            <li onClick={() => handleMenuItemClick('/dashboard-financeiro')}>Dashboard Financeiro</li>
            <li onClick={() => handleMenuItemClick('/documentos-locacoes')}>Documentos das locações</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-black text-white flex flex-col items-center justify-center">
      {renderMenuItems()}
      <button onClick={toggleMenu} className="absolute top-2 right-4 text-white text-2xl focus:outline-none">
        <img 
          src="/Menu.svg" 
          alt="Close Menu" 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
        />
      </button>
    </div>
  );
};

export default Menu;
