// import Dashboard from "../components/Dashboard";
import Imoveis from "../components/Imoveis";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import NavigationButtons, { UserRole } from "../../components/Navigation/NavigationButtons";
import { userRoleAtom } from "../../store/atoms";
import { useAtomValue } from "jotai";

export default function VisualizarImoveis() {
  // TODO: Replace this with actual user role from your authentication system
  const userRole = useAtomValue(userRoleAtom);

  return (
    <div className=" flex flex-col min-h-screen bg-[#F0F0F0]">
      <Navbar />
      <NavigationButtons userRole={userRole as UserRole} />
      <div className="h-[1px] bg-neutral-400 mb-4"></div>
      <div className="flex-grow w-full flex justify-center">
        <Imoveis />
      </div>

      <Footer />
    </div>
  );
}
