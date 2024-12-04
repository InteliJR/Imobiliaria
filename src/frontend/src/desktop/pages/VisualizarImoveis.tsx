import { useNavigate } from "react-router-dom";
import { FaHome, FaClipboardList, FaUsers } from "react-icons/fa"; // Importing icons
import Dashboard from "../components/Dashboard";
import Imoveis from "../components/Imoveis";
import Navbar from "../../mobile/components/Navbar/NavBar";

export default function VisualizarImoveis() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F0F0F0]">
      <Navbar />
      <div className="mt-16 mb-24">
        <Dashboard />
      </div>
      {/* New Row with Clickable Options */}
      <div className="flex justify-start gap-6 ms-2">
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/visualizar-imoveis")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaHome className="z-10" />
          <span className="z-10">Imóveis</span>
        </button>
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/visualizar-chamados")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaClipboardList className="z-10" />
          <span className="z-10">Chamados</span>
        </button>
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/visualizar-usuarios")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaUsers className="z-10" />
          <span className="z-10">Clientes</span>
        </button>
      </div>
      <div className="h-[1px] bg-neutral-400 mb-4"></div>
      <Imoveis />
    </div>
  );
}
