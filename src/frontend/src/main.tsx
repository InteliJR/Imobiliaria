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
import EditarPerfil from "./desktop/pages/EditarPerfil";
import NotFound from "./desktop/pages/NotFound";
import VisualizarImoveis from "./desktop/pages/VisualizarImoveis";
import VisualizarChamados from "./desktop/pages/VisualizarChamados";
import VisualizarUsuarios from "./desktop/pages/VisualizarUsuarios";
import Contratos from "./desktop/pages/VisualizarContratos";
import VisualizarAlugueis from "./desktop/pages/VisualizarAlugueis";

// Import mobile components and pages
import LandingMobile from "./mobile/pages/Landing";
import LoginMobile from "./mobile/pages/Login";
import PerfilMobile from "./mobile/pages/Perfil";
import OutrosPerfisMobile from "./mobile/pages/OutrosPerfis";
import EditarPerfilMobile from "./mobile/pages/EditarPerfil";
import AlterarSenha from "./mobile/pages/AlterarSenha";
import VisualizarImoveisMobile from "./mobile/pages/VisualizarImoveis";
import CreateProperty from "./desktop/pages/CreateProperty";
import VisualizarChamadosMobile from "./mobile/pages/VisualizarChamados";
import Chamado from "./mobile/pages/Chamado";
import VisualizarUsuariosMobile from "./mobile/pages/VisualizarUsuarios";
import CreateUser from "./desktop/pages/CreateUser";
import CreateTicket from "./desktop/pages/CreateTicket";
import CreatePropertyMobile from "./mobile/pages/CreateProperty";
import CreateUserMobile from "./mobile/pages/CreateUser";
import CreateTicketMobile from "./mobile/pages/CreateTicket";
import CreateContract from "./mobile/pages/CreateContract";
import Dashboard from "./mobile/pages/dashboard/Dashboard";
import HomeLocador from "./mobile/pages/HomeLocador";
import HomeLocatario from "./mobile/pages/HomeLocatario";
import ImovelById from "./mobile/pages/Imovel";
import PagamentosImovel from "./mobile/pages/PagamentosImovel";
import ContratosMobile from "./mobile/pages/Contratos";
import ContractView from "./mobile/pages/ContractView";
import ContractViewLoc from "./mobile/pages/ContractView-loc";
import PaymentView from "./mobile/pages/PaymentView";
import ProtectedRoute from "./components/Router/ProtectedRouter";
import UnauthorizedPage from "./desktop/pages/UnauthorizedPage";
import ImovelByIdAdm from "./mobile/pages/Imovel-adm";
import AlugueisImovel from "./mobile/pages/AlugueisImovel"

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
            <ProtectedRoute requiredRole={["Admin", "Judiciario"]}>
              {isDesktop ? <VisualizarImoveis /> : <VisualizarImoveisMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/pagamentos"
          element={
            <ProtectedRoute requiredRole={["Admin", "Judiciario"]}>
              <PagamentosImovel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/imoveis/criar"
          element={
            <ProtectedRoute requiredRole={["Admin"]}>
              {isDesktop ? <CreateProperty /> : <CreatePropertyMobile />}
            </ProtectedRoute>
          }
        />
        {/* Chamados */}
        <Route
          path="/chamados"
          element={
            <ProtectedRoute requiredRole={["Admin"]}>
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
            <ProtectedRoute requiredRole={["Admin", "Locatario"]}>
              {isDesktop ? <CreateTicket /> : <CreateTicketMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/chamado/:id"
          element={
            <ProtectedRoute requiredRole={["Admin", "Judiciario"]}>
               <Chamado/>
            </ProtectedRoute>
          }
        />
        {/* Usuários */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute requiredRole={["Admin"]}>
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
            <ProtectedRoute requiredRole={["Admin"]}>
              {isDesktop ? <CreateUser /> : <CreateUserMobile />}
            </ProtectedRoute>
          }
        />
        {/* Perfil */} {/* Precisa adicionar "requiredRole" */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <>{isDesktop ? <Perfil /> : <PerfilMobile />}</>
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil/:id"
          element={
            <ProtectedRoute requiredRole={["Admin"]}>
              <>{isDesktop ? <OutrosPerfis /> : <OutrosPerfisMobile />}</>
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
            <ProtectedRoute requiredRole={["Admin"]}>
              <AlterarSenha />
            </ProtectedRoute>
          }
        />
        {/* Dashboard */} {/* Precisa adicionar "requiredRole" */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole={["Admin", "Judiciario"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home-locador"
          element={
            <ProtectedRoute requiredRole={["Locador"]}>
              <HomeLocador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home-locatario"
          element={
            <ProtectedRoute requiredRole={["Locatario"]}>
              <HomeLocatario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/imovel/:imovelId"
          element={
            // ESTE COMPONENTE NÃO É 'MOBILE'
            <ProtectedRoute
              requiredRole={["Admin", "Locatario", "Locador", "Judiciario"]}
            >
              <ImovelById />
            </ProtectedRoute>
          }
        />
        <Route
          path="/imovel-adm/:imovelId"
          element={
            // ESTE COMPONENTE NÃO É 'MOBILE'
            <ProtectedRoute requiredRole={["Admin"]}>
              <ImovelByIdAdm />
            </ProtectedRoute>
          }
        />
        {/* Contratos e pagamentos */}
        <Route
          path="/pagamento/:imovelid"
          element={
            <ProtectedRoute
              requiredRole={["Admin", "Locatario", "Locador", "Judiciario"]}
            >
              <PaymentView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pagamento-for-admin/:paymentid"
          element={
            <ProtectedRoute requiredRole={["Admin"]}>
              <PaymentView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contratos/:id"
          element={
            <ProtectedRoute requiredRole={["Admin", "Judiciario"]}>
              <ContractView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contratos-loc/:id"
          element={
            <ProtectedRoute requiredRole={["Locatario", "Locador"]}>
              <ContractViewLoc />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contratos"
          element={
            <ProtectedRoute requiredRole={["Admin", "Judiciario"]}>
              {isDesktop ? <Contratos /> : <ContratosMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/contratos/criar"
          element={
            <ProtectedRoute requiredRole={["Admin"]}>
              <CreateContract />
            </ProtectedRoute>
          }
        />
        {/* Página de Lista Aluguéis */}
        <Route
          path="alugueis"
          element={
            <ProtectedRoute requiredRole={["Admin", "Judiciario"]}>
              <AlugueisImovel />
            </ProtectedRoute>
          }
        />
        {/* Tela de visualizar alugueis por imovel */}
        <Route
          path="/visualizar/alugueis/:id"
          element={
            <ProtectedRoute requiredRole={["Admin", "Judiciario"]}>
              <VisualizarAlugueis />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
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
