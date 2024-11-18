import FeaturesSection from "../../components/Landing/FeaturesSection";
import Navbar from "../../mobile/components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterBig";
import Botao from "../../components/Botoes/Botao";

export default function Landing() {
  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <div className="flex items-center justify-center h-96 w-screen -ml-4 -mt-6 bg-green-500">
          <img src="" alt="" />
          <div className="bg-gray-100 h-40 w-1 rounded" />
          <img src="" alt="" />
        </div>

        <FeaturesSection />

        <div className="flex justify-center w-full">
          <p className="text-right leading-tight my-4 max-w-2xl">
            A plataforma que <span className="font-bold">centraliza</span>
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
