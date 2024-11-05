// main.tsx or main.js (depending on your setup)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  App  from './App'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Unauthorized from './pages/Unauthorized'
import Admin from './pages/Admin'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/admin" element={<Admin />} />
        <Route path="/unauthorized" element={<Unauthorized />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
) // Rotas /admin e /unauthorized são para teste de proteção das rotas