import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

interface MenuProps {
  userType: string;
  toggleMenu: () => void;
  isOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ userType, toggleMenu, isOpen }) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({
    transform: "translateX(-100%)", // Começa fora da tela
    transition: "transform 0.5s ease-in-out",
  });

  // Atualiza o estilo do menu com base no estado isOpen
  useEffect(() => {
    if (isOpen) {
      setMenuStyle({
        transform: "translateX(0)", // Entra na tela
        transition: "transform 0.5s ease-in-out",
      });
    } else {
      setMenuStyle({
        transform: "translateX(-100%)", // Sai da tela
        transition: "transform 0.5s ease-in-out",
      });
    }
  }, [isOpen]);

  // Fecha o menu ao clicar fora
  const handleClickOutside = (event: React.MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      toggleMenu();
    }
  };

  // Renderiza os itens do menu com base no tipo de usuário
  const renderMenuItems = () => {
    switch (userType) {
      case "Administrador":
        return (
          <>
            <li>
              <button onClick={() => navigate("/home")}>Início</button>
            </li>
            <li>
              <button onClick={() => navigate("/dashboard")}>
                Dashboard Administrativo Financeiro
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/gestao-usuarios")}>
                Gestão de Usuários
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/lista-chamados")}>
                Lista de chamados
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/cadastrar-imoveis")}>
                Cadastrar imóveis
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/adicionar-contrato")}>
                Adicionar Contrato
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/perfil")}>Perfil</button>
            </li>
          </>
        );
      case "Jurídico":
        return (
          <>
            <li>
              <button onClick={() => navigate("/dashboard-financeiro")}>
                Dashboard Financeiro
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/lista-imoveis")}>
                Lista Imóveis
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/documentos-locacao")}>
                Documentos relacionados às locações
              </button>
            </li>
          </>
        );
      case "Locador":
        return (
          <>
            <li>
              <button onClick={() => navigate("/home")}>Início</button>
            </li>
            <li>
              <button onClick={() => navigate("/perfil")}>Perfil</button>
            </li>
            <li>
              <button onClick={() => navigate("/visualizar-imoveis")}>
                Visualizar Imóveis
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/dashboard-financeiro")}>
                Dashboard Financeiro
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/documentos-locacao")}>
                Documentos das locações
              </button>
            </li>
          </>
        );
      case "Locatário":
        return (
          <>
            <li>
              <button onClick={() => navigate("/home")}>Início</button>
            </li>
            <li>
              <button onClick={() => navigate("/perfil")}>Perfil</button>
            </li>
            <li>
              <button onClick={() => navigate("/abertura-chamados")}>
                Abertura de chamados
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/visualizar-imoveis")}>
                Visualizar Imóveis
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/dashboard-financeiro")}>
                Dashboard Financeiro
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/documentos-locacao")}>
                Documentos das locações
              </button>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-60 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
      onClick={handleClickOutside}
    >
      <div
        ref={menuRef}
        style={menuStyle} // Aplica o estilo inline para a animação
        className="bg-white text-black h-full w-[70%] p-8 shadow-2xl rounded-r-lg"
      >
        <ul className="space-y-6 text-center text-xl">{renderMenuItems()}</ul>
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-black text-3xl focus:outline-none"
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default Menu;
