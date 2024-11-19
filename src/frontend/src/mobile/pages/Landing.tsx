import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/FooterBig";
import WelcomeBanner from "../components/Landing/WelcomeBanner";
import FeaturesSection from "../components/Landing/FeaturesSection";
import logoSimplified from "../../assets/landingPage/logoSimplified.svg";
import Botao from "../components/Botoes/Botao";

export default function Landing() {
  const navigate = useNavigate();

  console.log("h")

  return (
    <main className="main-custom">
      <Navbar showLoginButton={true} />

      <section className="section-custom">
        <WelcomeBanner />
        <FeaturesSection />

        {/* Div contêiner para o parágrafo e a imagem */}
        <div className="relative">
          <p className="text-right leading-tight z-10 relative">
            A plataforma que <span className="font-bold">centraliza</span> toda
            a relação entre locador e locatário, simplificando a gestão de
            imóveis, contratos e pagamentos em um só lugar
          </p>
          <img
            src={logoSimplified}
            className="w-16 absolute -bottom-6 -left-6 z-0 -rotate-45 opacity-75"
            alt="Logotipo simplificado da K.K. Administradora"
          />
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
