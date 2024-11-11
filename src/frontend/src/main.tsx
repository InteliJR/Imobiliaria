
// main.tsx or main.js (depending on your setup)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import './index.css'

// Import desktop components and pages
import Landing from './desktop/pages/Landing';
import Login from './desktop/pages/Login';
import Perfil from './desktop/pages/Perfil';
import AlterarSenha from './desktop/pages/AlterarSenha';
import EditarPerfil from './desktop/pages/EditarPerfil';
import NotFound from './desktop/pages/NotFound';
import Chamado from './desktop/pages/Chamado'; // Visualizar um chamado

// Import mobile components and pages
import LandingMobile from './mobile/pages/Landing';
import LoginMobile from './mobile/pages/Login';
import PerfilMobile from './mobile/pages/Perfil';
import EditarPerfilMobile from './mobile/pages/EditarPerfil';
import AlterarSenhaMobile from './mobile/pages/AlterarSenha';
import VisualizarImoveis from './mobile/pages/VisualizarImoveis';
import VisualizarChamados from './mobile/pages/VisualizarChamados'; // Visualizar lista de chamados
import ChamadoMobile from './mobile/pages/Chamado'; // Visualizar um chamado
import VisualizarUsuarios from './mobile/pages/VisualizarUsuarios';

const Root = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isDesktop ? <Landing /> : <LandingMobile />} />
        <Route path="/login" element={isDesktop ? <Login /> : <LoginMobile />} />
        <Route path="/perfil" element={isDesktop ? <Perfil /> : <PerfilMobile />} />
        <Route path="/perfil/editar" element={isDesktop ? <EditarPerfil /> : <EditarPerfilMobile />} />
        <Route path="/perfil/alterar-senha" element={isDesktop ? <AlterarSenha /> : <AlterarSenhaMobile/>} />
        {/* <Route path="/profile/:id" element={<Profile />} /> */}
        <Route path="/visualizar-imoveis" element={<VisualizarImoveis />} />
        <Route path="/visualizar-chamados" element={<VisualizarChamados />} />
        <Route path="/chamado/:id" element={isDesktop ? <Chamado /> : <ChamadoMobile/>} />
        <Route path="/visualizar-usuarios" element={<VisualizarUsuarios />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
