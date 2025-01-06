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
import Contratos from "./desktop/pages/VisualizarContratos";

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
import CreateContract from "./mobile/pages/CreateContract";
import Dashboard from "./mobile/pages/Dashboard";
import HomeLocador from "./mobile/pages/HomeLocador";
import HomeLocatario from "./mobile/pages/HomeLocatario";
// import ChamadosImovel from "./mobile/pages/ChamadosImovel";
import ImovelById from "./mobile/pages/Imovel";
import PagamentosImovel from "./mobile/pages/PagamentosImovel";
import ContratosMobile from "./mobile/pages/Contratos";
import ContractView from "./mobile/pages/ContractView";
import PaymentView from "./mobile/pages/PaymentView";
import ProtectedRoute from "./components/Router/ProtectedRouter";

const Root = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Raiz e Login */}
        <Route path="/" element={isDesktop ? <Landing /> : <LandingMobile />} />
        <Route
          path="/login"
          element={isDesktop ? <Login /> : <LoginMobile />}
        />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
        {/* Imóveis */}
        <Route
          path="/imoveis"
          element={
            <ProtectedRoute requiredRole="Admin">
              {isDesktop ? <VisualizarImoveis /> : <VisualizarImoveisMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/teste"
          element={<PagamentosImovel/>}
        />
        <Route
          path="/imoveis/criar"
          element={isDesktop ? <CreateProperty /> : <CreatePropertyMobile />}
        />
        {/* Chamados */}
        <Route
          path="/chamados"
          element={
            <ProtectedRoute requiredRole="Admin">
              {isDesktop ? (
                <VisualizarChamados />
              ) : (
                <VisualizarChamadosMobile />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/chamados/criar"
          element={
            <ProtectedRoute>
              {isDesktop ? <CreateTicket /> : <CreateTicketMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/chamado/:id"
          element={
            <ProtectedRoute requiredRole="Admin">
              {isDesktop ? <Chamado /> : <ChamadoMobile />}
            </ProtectedRoute>
          }
        />
        {/* Usuários */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute requiredRole="Admin">
              {isDesktop ? (
                <VisualizarUsuarios />
              ) : (
                <VisualizarUsuariosMobile />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/criar"
          element={
            <ProtectedRoute requiredRole="Admin">
              {isDesktop ? <CreateUser /> : <CreateUserMobile />}
            </ProtectedRoute>
          }
        />
        {/* Perfil */} {/* Precisa adicionar "requiredRole" */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              {isDesktop ? <Perfil /> : <PerfilMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil/:id"
          element={
            <ProtectedRoute>
              {isDesktop ? <OutrosPerfis /> : <OutrosPerfisMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil/editar"
          element={
            <ProtectedRoute>
              {isDesktop ? <EditarPerfil /> : <EditarPerfilMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil/alterar-senha"
          element={
            <ProtectedRoute>
              {isDesktop ? <AlterarSenha /> : <AlterarSenhaMobile />}
            </ProtectedRoute>
          }
        />
        {/* Dashboard */} {/* Precisa adicionar "requiredRole" */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home-locador"
          element={
            <ProtectedRoute>
              <HomeLocador />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home-locatario"
          element={
            <ProtectedRoute>
              <HomeLocatario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/imovel/:imovelId"
          element={
            // ESTE COMPONENTE NÃO É 'MOBILE' 
            <ProtectedRoute>
              <ImovelById /> 
            </ProtectedRoute>
          }
        />

        {/* Contratos e pagamentos */}
        <Route
          path="/pagamento/:id"
          element={
            <ProtectedRoute>
              <PaymentView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contratos/:id"
          element={
            <ProtectedRoute>
              <ContractView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contratos"
          element={
            <ProtectedRoute>
              {isDesktop ? <Contratos /> : <ContratosMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/contratos/criar"
          element={
            <ProtectedRoute>
              <CreateContract />
            </ProtectedRoute>
          }
        />
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
