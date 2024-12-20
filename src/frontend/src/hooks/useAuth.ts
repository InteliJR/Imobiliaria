import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// solicita um role como param e obtém o role do user no storage do navegador 
const useAuth = (requiredRole: string) => {
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem('userRole');

  // verifica se o role do user é o mesmo role requerido para a página, se não for, redireciona para unauthorized
  useEffect(() => {
    if (!userRole || userRole !== requiredRole) {
      navigate('/');   // !! Trocar '/' por uma rota como '/notfound' ou '/unauthorized'  
    }
  }, [requiredRole, userRole, navigate]);
};

export default useAuth; // !! importe e chame o metodo "useAuth('Role') para verificar a permissao de uma role para visualizar a page