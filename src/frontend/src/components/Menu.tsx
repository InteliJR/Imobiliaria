import React from 'react';

interface MenuProps {
  userType: string;
  toggleMenu: () => void;
  isOpen: boolean; // Add isOpen to the props
}

const Menu: React.FC<MenuProps> = ({ userType, toggleMenu, isOpen }) => {
  const renderMenuItems = () => {
    switch (userType) {
      case 'Administrador':
        return (
          <ul className="text-center space-y-8 text-2xl">
            <li>Home</li>
            <li>Dashboard Administrativo Financeiro</li>
            <li>Gestão de Usuários</li>
            <li>Lista de chamados</li>
            <li>Cadastrar imóveis</li>
            <li>Adicionar Contrato</li>
            <li>Notificação Modal</li>
            <li>Perfil</li>
          </ul>
        );
      case 'Jurídico':
        return (
          <ul className="text-center space-y-8 text-2xl">
            <li>Dashboard Financeiro</li>
            <li>Lista Imóveis</li>
            <li>Documentos relacionado as locações</li>
          </ul>
        );
      case 'Locador':
        return (
          <ul className="text-center space-y-8 text-2xl">
            <li>Home</li>
            <li>Perfil</li>
            <li>Visualizar Imóveis</li>
            <li>Dashboard Financeiro</li>
            <li>Documentos das locações</li>
            <li>Redirecionamento pro zipzops</li>
          </ul>
        );
      case 'Locatário':
        return (
          <ul className="text-center space-y-8 text-2xl">
            <li>Home</li>
            <li>Perfil</li>
            <li>Abertura de chamados</li>
            <li>Visualizar Imóveis</li>
            <li>Dashboard Financeiro</li>
            <li>Documentos das locações</li>
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
