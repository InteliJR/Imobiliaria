// main.tsx or main.js (depending on your setup)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  App  from './App'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Profile from './pages/Profile'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)