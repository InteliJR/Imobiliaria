import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

interface MenuProps {
  userType: string;
  toggleMenu: () => void;
  isOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ userType, toggleMenu, isOpen }) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({
    transform: "translateX(-100%)",
    transition: "transform 0.5s ease-in-out",
  });

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen && !isClosing) {
      setMenuStyle({
        transform: "translateX(0)",
        transition: "transform 0.5s ease-in-out",
      });
    } else if (isClosing) {
      setMenuStyle({
        transform: "translateX(-100%)",
        transition: "transform 0.5s ease-in-out",
      });
    } else {
      setMenuStyle({
        transform: "translateX(-100%)",
        transition: "none",
      });
    }
  }, [isOpen, isClosing]);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleToggleMenu();
    }
  };

  const handleToggleMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        toggleMenu();
        setIsClosing(false);
      }, 500);
    } else {
      toggleMenu();
    }
  };

  const handleLogout = () => {
    // lógica de logout
    console.log("sair da conta")
    navigate("/");
  };

  const redirect = (url: string) => {
    navigate(url);
    handleToggleMenu();
  };

  const renderMenuItems = () => {
    switch (userType) {
      case "Administrador":
        return (
          <>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/home")}
              >
                Início
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/gestao-usuarios")}
              >
                Gestão de Usuários
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/lista-chamados")}
              >
                Lista de chamados
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/cadastrar-imoveis")}
              >
                Cadastrar imóvel
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/adicionar-contrato")}
              >
                Adicionar Contrato
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/perfil")}
              >
                Perfil
              </button>
            </li>
          </>
        );
      case "Jurídico":
        return (
          <>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/dashboard-financeiro")}
              >
                Dashboard Financeiro
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/lista-imoveis")}
              >
                Lista de Imóveis
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/documentos-locacao")}
              >
                Documentos
              </button>
            </li>
          </>
        );
      case "Locador":
        return (
          <>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/home")}
              >
                Início
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/perfil")}
              >
                Perfil
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/visualizar-imoveis")}
              >
                Visualizar Imóveis
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/dashboard-financeiro")}
              >
                Dashboard Financeiro
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/documentos-locacao")}
              >
                Documentos das locações
              </button>
            </li>
          </>
        );
      case "Locatário":
        return (
          <>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/home")}
              >
                Início
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/perfil")}
              >
                Perfil
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/abertura-chamados")}
              >
                Abrir chamado
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/visualizar-imoveis")}
              >
                Visualizar Imóveis
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/dashboard-financeiro")}
              >
                Dashboard
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/documentos-locacao")}
              >
                Documentos
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
      className={`fixed inset-0 z-50 bg-black bg-opacity-40 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
      onClick={handleClickOutside}
    >
      <nav
        ref={menuRef}
        style={menuStyle}
        className="flex flex-col justify-between bg-neutral-black text-[#fefefe] h-full w-[60%] shadow-2xl rounded-r-lg"
      >
        <ul className="flex flex-col justify-between text-center text-xl  mt-3">
          {renderMenuItems()}
        </ul>
        <div className="flex items-center w-full h-16">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center flex-1 hover:-translate-y-1 transition-all duration-200 ease-in-out"
            title="Sair da Conta"
          >
            <BiLogOut color="#fefefe" size={35} />
          </button>

          {/* linha vertical decorativa */}
          <div className="w-px h-4/5 bg-[#fefefe] drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]" />

          <button
            onClick={handleToggleMenu}
            className="flex items-center justify-center flex-1 hover:-translate-y-1 transition-all duration-200 ease-in-out"
            title="Fechar Menu"
          >
            <MdClose color="#fefefe" size={35} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
