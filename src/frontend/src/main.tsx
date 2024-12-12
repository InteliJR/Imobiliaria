// main.tsx or main.js (depending on your setup)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Import desktop components and pages
import Landing from "./desktop/pages/Landing";
import Login from "./desktop/pages/Login";
import Perfil from "./desktop/pages/Perfil";
import OutrosPerfis from "./desktop/pages/OutrosPerfis";
import AlterarSenha from "./desktop/pages/AlterarSenha";
import EditarPerfil from "./desktop/pages/EditarPerfil";
import NotFound from "./desktop/pages/NotFound";
import Chamado from "./desktop/pages/Chamado";
import VisualizarImoveis from "./desktop/pages/VisualizarImoveis";
import VisualizarChamados from "./desktop/pages/VisualizarChamados";
import VisualizarUsuarios from "./desktop/pages/VisualizarUsuarios";

// Import mobile components and pages
import LandingMobile from "./mobile/pages/Landing";
import LoginMobile from "./mobile/pages/Login";
import PerfilMobile from "./mobile/pages/Perfil";
import OutrosPerfisMobile from "./mobile/pages/OutrosPerfis";
import EditarPerfilMobile from "./mobile/pages/EditarPerfil";
import AlterarSenhaMobile from "./mobile/pages/AlterarSenha";
import VisualizarImoveisMobile from "./mobile/pages/VisualizarImoveis";
import CreateProperty from "./desktop/pages/CreateProperty";
import VisualizarChamadosMobile from "./mobile/pages/VisualizarChamados";
import ChamadoMobile from "./mobile/pages/Chamado";
import VisualizarUsuariosMobile from "./mobile/pages/VisualizarUsuarios";
import CreateUser from "./desktop/pages/CreateUser";
import CreateTicket from "./desktop/pages/CreateTicket";
import CreatePropertyMobile from "./mobile/pages/CreateProperty";
import CreateUserMobile from "./mobile/pages/CreateUser";
import CreateTicketMobile from "./mobile/pages/CreateTicket";
import Dashboard from "./mobile/pages/Dashboard";
import HomeLocadorMobile from "./mobile/pages/HomeLocador";
import HomeLocatarioMobile from "./mobile/pages/HomeLocatario";

const Root = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isDesktop ? <Landing /> : <LandingMobile />} />
        <Route path="/login" element={isDesktop ? <Login /> : <LoginMobile />} />

        <Route
          path="/imoveis"
          element={isDesktop ? <VisualizarImoveis /> : <VisualizarImoveisMobile />}
        />
        <Route
          path="/imoveis/criar"
          element={isDesktop ? <CreateProperty /> : <CreatePropertyMobile />}
        />

        <Route
          path="/chamados"
          element={isDesktop ? <VisualizarChamados /> : <VisualizarChamadosMobile />}
        />
        <Route
          path="/chamados/criar"
          element={isDesktop ? <CreateTicket /> : <CreateTicketMobile />}
        />
        <Route path="/chamado/:id" element={isDesktop ? <Chamado /> : <ChamadoMobile />} />

        <Route
          path="/usuarios"
          element={isDesktop ? <VisualizarUsuarios /> : <VisualizarUsuariosMobile />}
        />
        <Route path="/usuarios/criar" element={isDesktop ? <CreateUser /> : <CreateUserMobile />} />

        <Route path="/perfil" element={isDesktop ? <Perfil /> : <PerfilMobile />} />
        <Route path="/perfil/:id" element={isDesktop ? <OutrosPerfis /> : <OutrosPerfisMobile />} />
        <Route
          path="/perfil/editar"
          element={isDesktop ? <EditarPerfil /> : <EditarPerfilMobile />}
        />
        <Route
          path="/perfil/alterar-senha"
          element={isDesktop ? <AlterarSenha /> : <AlterarSenhaMobile />}
        />

        {/* <Route path="/profile/:id" element={<Profile />} /> */}
       
        <Route path="/chamado/:id" element={isDesktop ? <Chamado /> : <ChamadoMobile />} />
        <Route path="/dash" element={<Dashboard />} />

        <Route path="/home-locador" element={<HomeLocadorMobile />} />

        <Route path="/home-locatario" element={<HomeLocatarioMobile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
