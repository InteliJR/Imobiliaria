import { useNavigate } from "react-router-dom";
import { FaHome, FaClipboardList, FaUsers, FaFileContract } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export type UserRole = 'Admin' | 'Locatario' | 'Locador' | 'Judiciario';

interface NavigationButtonsProps {
  userRole: UserRole;
}

export default function NavigationButtons({ userRole }: NavigationButtonsProps) {
  const navigate = useNavigate();

  const routePermissions = {
    imoveis: ['Admin', 'Locador', 'Judiciario'],
    usuarios: ['Admin'],
    contratos: ['Admin', 'Judiciario'],
    pagamentos: ['Admin', 'Judiciario'],
    chamados: ['Admin']
  };

  const buttons = [
    {
      path: "/imoveis",
      icon: <FaHome className="z-10" />,
      label: "Imóveis",
      roles: routePermissions.imoveis
    },
    {
      path: "/usuarios",
      icon: <FaUsers className="z-10" />,
      label: "Clientes",
      roles: routePermissions.usuarios
    },
    {
      path: "/contratos",
      icon: <FaFileContract className="z-10" />,
      label: "Contratos",
      roles: routePermissions.contratos
    },
    {
      path: "/pagamentos",
      icon: <FaMoneyBillTrendUp className="z-10" />,
      label: "Pagamentos",
      roles: routePermissions.pagamentos
    },
    {
      path: "/chamados",
      icon: <FaClipboardList className="z-10" />,
      label: "Chamados",
      roles: routePermissions.chamados
    }
  ];

  return (
    <div className="flex justify-center gap-6 ms-2">
      {buttons.map((button) => {
        if (button.roles.includes(userRole)) {
          return (
            <button
              key={button.path}
              className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
              onClick={() => navigate(button.path)}
            >
              <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
              {button.icon}
              <span className="z-10">{button.label}</span>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
} 