import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";

interface MenuProps {
  userType: string;
  toggleMenu: () => void;
  isOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ userType, toggleMenu, isOpen }) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({
    transform: isDesktop ? "translateX(100%)" : "translateX(-100%)",
    transition: "transform 0.5s ease-in-out",
  });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && !isClosing) {
      setMenuStyle({
        transform: isDesktop ? "translateX(0)" : "translateX(0)",
        transition: "transform 0.5s ease-in-out",
      });
    } else if (isClosing) {
      setMenuStyle({
        transform: isDesktop ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform 0.5s ease-in-out",
      });
    } else {
      setMenuStyle({
        transform: isDesktop ? "translateX(100%)" : "translateX(-100%)",
        transition: "none",
      });
    }
  }, [isOpen, isClosing, isDesktop]);

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
    console.log("sair da conta");
    navigate("/");
  };

  const redirect = (url: string) => {
    navigate(url);
    handleToggleMenu();
  };

  /*
    Tipos de usuários:

    - admin (administrador)
    - legal (jurídico)
    - lessor (locador)
    - tenant (locatário)
  */

  const userRole = localStorage.getItem("userRole");

  if (userRole == "Admin") {
    userType = "Admin";
  } else if (userRole == "Judiciario") {
    userType = "Judiciario";
  } else if (userRole == "Locatario") {
    userType = "Locatario";
  } else if (userRole == "Locador") {
    userType = "Locador";
  }

  const renderMenuItems = () => {
    console.log("Este é o valor de userType: ", userType);
    switch (userType) {
      case "Admin":
        return (
          <>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/imoveis")}
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
                onClick={() => redirect("/usuarios")}
              >
                Usuários
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/usuarios/criar")}
              >
                Novo Usuário
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/chamados")}
              >
                Chamados
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/imoveis/criar")}
              >
                Cadastrar Imóvel
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/contratos/criar")}
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
      case "Judiciario":
        return (
          <>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/dashboard")}
              >
                Início
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/imoveis")}
              >
                Imóveis
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/contratos")}
              >
                Documentos
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
      case "Locador":
        return (
          <>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/home-locador")}
              >
                Início
              </button>
            </li>
            {/* <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/imovel/:imovelId")}
              >
                Imóveis
              </button>
            </li> */}
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/dashboard")}
              >
                Dashboard
              </button>
            </li>
            {/* <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/documentos")}
              >
                Documentos
              </button>
            </li> */}
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
      case "Locatario":
        return (
          <>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/home-locatario")}
              >
                Início
              </button>
            </li>
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/chamados/criar")}
              >
                Abrir chamado
              </button>
            </li>
            {/* <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/imovel/:imovelId")}
              >
                Imóveis
              </button>
            </li> */}
            <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/dashboard")}
              >
                Dashboard
              </button>
            </li>
            {/* <li className="w-full h-16 hover:h-20 hover:bg-[#181716] transition-all duration-300 ease-in-out">
              <button
                className="w-full h-full h-10 drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]"
                onClick={() => redirect("/documentos-locacao")}
              >
                Documentos
              </button>
            </li> */}
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
        className={`fixed ${
          isDesktop ? "inset-y-0 right-0" : "inset-y-0 left-0"
        } flex flex-col justify-between bg-neutral-black text-[#fefefe] h-full w-2/5 shadow-2xl rounded-lg lg:w-80`}
      >
        <ul className="flex flex-col justify-between text-center text-xl mt-3">
          {renderMenuItems()}
        </ul>
        <div className="flex items-center w-full h-16 lg:flex-row-reverse">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center flex-1 hover:-translate-y-1 transition-all duration-200 ease-in-out"
            title="Sair da Conta"
          >
            {isDesktop ? (
              <RiLogoutBoxRLine color="#fefefe" size={30} />
            ) : (
              <BiLogOut color="#fefefe" size={35} />
            )}
          </button>

          <div className="w-px h-4/5 bg-[#fefefe] drop-shadow-[0_0px_10px_rgba(255,255,255,.5)]" />

          <button
            onClick={handleToggleMenu}
            className="flex items-center justify-center flex-1 hover:-translate-y-1 transition-all duration-200 ease-in-out"
            title="Fechar Menu"
          >
            {isDesktop ? (
              <MdClose color="#fefefe" size={35} />
            ) : (
              <MdClose color="#fefefe" size={35} />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
