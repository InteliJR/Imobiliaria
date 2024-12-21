import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}
// Preciso criar um componente react
// Ele receberá um componente filho e uma role Esperada
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    // Depois, preciso coletar a role e o token no localStorage
    const token = localStorage.getItem('jwtToken');
    const userRole = localStorage.getItem('userRole');
    // Aí, preciso fazer condicionais para que:
    
    // Sem token -> /Login
    if(!token) {
        return <Navigate to="/login" replace/>;
    }

    // Sem Role Esperada -> /Unauthorized
    if(requiredRole && userRole !== requiredRole) {
        return <Navigate to="/*" replace />;
    }
    
    // Irá retornar o elemento filho

    return <>{children}</>;
};

export default ProtectedRoute;


