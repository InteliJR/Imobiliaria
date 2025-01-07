import React from "react";
import { Navigate } from "react-router-dom";

type UserRole = "Admin" | "Judiciario" | "Locador" | "Locatario";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole[]; // Array de roles permitidas
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    // Coleta o token e a role do localStorage
    const token = localStorage.getItem("jwtToken");
    const userRole = localStorage.getItem("userRole") as UserRole | null;

    // Sem token -> Redireciona para /login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Sem Role Esperada -> Redireciona para /Unauthorized
    if (requiredRole && (!userRole || !requiredRole.includes(userRole))) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Retorna o elemento filho se todas as condições forem atendidas
    return <>{children}</>;
};

export default ProtectedRoute;
