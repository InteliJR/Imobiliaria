import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaFileContract,
} from "react-icons/fa"; // Importing icons
// import Dashboard from '../components/Dashboard';
import Chamados from "../components/Chamados";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import { FaFileInvoiceDollar, FaMoneyBillTrendUp } from "react-icons/fa6";

export default function VisualizarChamados() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F0F0]">
      <Navbar />
      {/* <div className='mt-10 mb-24'>
        <Dashboard />
      </div> */}
      {/* New Row with Clickable Options */}
      <div className="flex justify-center gap-6 ms-2">
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/imoveis")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaHome className="z-10" />
          <span className="z-10">Imóveis</span>
        </button>

        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/usuarios")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaUsers className="z-10" />
          <span className="z-10">Clientes</span>
        </button>

        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/contratos")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaFileContract className="z-10" />
          <span className="z-10">Contratos</span>
        </button>
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden hover:bg-neutral-200 transition duration-200"
          onClick={() => navigate("/alugueis")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaFileInvoiceDollar className="z-10" />
          <span className="z-10 font-bold">Aluguéis</span>
        </button>
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/pagamentos")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaMoneyBillTrendUp className="z-10" />
          <span className="z-10">Pagamentos</span>
        </button>
        <button
          className="relative group flex items-center gap-2 px-4 py-2 text-neutral-800 rounded-md overflow-hidden"
          onClick={() => navigate("/chamados")}
        >
          <span className="absolute inset-0 -m-2 bg-neutral-400 z-0 scale-0 group-hover:scale-100 transition-transform"></span>
          <FaClipboardList className="z-10" />
          <span className="z-10 font-bold">Chamados</span>
        </button>
      </div>
      <div className="h-[1px] bg-neutral-400 mb-4"></div>
      <div className="flex-grow w-full flex justify-center">
        <Chamados />
      </div>

      <Footer />
    </div>
  );
}
