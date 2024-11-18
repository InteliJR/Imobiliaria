import { useNavigate } from "react-router-dom";
import FeaturesSection from "../../components/Landing/FeaturesSection";
import Navbar from "../../mobile/components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterBig";
import Botao from "../../components/Botoes/Botao";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <div className="flex items-center justify-center h-96 w-screen -ml-4 -mt-6 bg-green-500">
          <img src="" alt="" />
          <div className="bg-gray-100 h-52 w-1 rounded" />
          <img src="" alt="" />
        </div>


        <div className="flex justify-center items-center w-full gap-4 my-10">
        <FeaturesSection />
          <p className="w-[52rem] 2xl:w-[120rem] text-right leading-tight max-w-2xl">
            A plataforma que <span className="font-bold">centraliza </span>
            toda a relação entre locador e locatário, simplificando a gestão de
            imóveis, contratos e pagamentos em um só lugar
          </p>
        </div>

        <Botao
          label="Entrar"
          onClick={() => {
            navigate("/login");
          }}
        />
      </section>

      <Footer />
    </main>
  );
}
