// main.tsx or main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import './index.css';

// Import desktop components and pages
import App from './desktop/App';
import Landing from './desktop/pages/Landing';
import Login from './desktop/pages/Login';

// Import mobile components and pages
import AppMobile from './mobile/App';
import LandingMobile from './mobile/pages/Landing';
import LoginMobile from './mobile/pages/Login';

const Root = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isDesktop ? <App /> : <AppMobile />} />
        <Route path="/landing" element={isDesktop ? <Landing /> : <LandingMobile />} />
        <Route path="/login" element={isDesktop ? <Login /> : <LoginMobile />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
