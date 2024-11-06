// main.tsx or main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import './index.css';

// Import desktop components and pages
import Landing from './desktop/pages/Landing';
import Login from './desktop/pages/Login';
import PerfilDesktop from './desktop/pages/Perfil';

// Import mobile components and pages
import LandingMobile from './mobile/pages/Landing';
import LoginMobile from './mobile/pages/Login';
import PerfilMobile from './mobile/pages/Perfil';
import VisualizarImoveis from './mobile/pages/VisualizarImoveis';
import VisualizarChamados from './mobile/pages/VisualizarChamados';
import VisualizarUsuarios from './mobile/pages/VisualizarUsuarios';

const Root = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isDesktop ? <Landing /> : <LandingMobile />} />
        <Route path="/login" element={isDesktop ? <Login /> : <LoginMobile />} />
        <Route path="/perfil" element={isDesktop ? <PerfilDesktop /> : <PerfilMobile />} />
        <Route path="/visualizar-imoveis" element={<VisualizarImoveis />} />
        <Route path="/visualizar-chamados" element={<VisualizarChamados />} />
        <Route path="/visualizar-usuarios" element={<VisualizarUsuarios />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
