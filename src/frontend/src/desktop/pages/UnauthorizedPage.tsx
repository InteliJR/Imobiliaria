import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/"); // Redireciona para a página inicial ou outra rota desejada
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded-md max-w-md w-full">
                <h1 className="text-xl font-semibold text-neutral-800 mb-4">
                    Acesso Negado
                </h1>
                <p className="text-sm text-neutral-600 mb-6">
                    Você não tem permissão para acessar esta página. Entre em contato com o administrador ou volte para a página inicial.
                </p>
                <button
                    onClick={handleGoBack}
                    className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none"
                >
                    Voltar para a Página Inicial
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
