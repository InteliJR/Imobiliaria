import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterBig";
import WelcomeBanner from "../../components/Landing/WelcomeBanner";
import FeaturesSection from "../../components/Landing/FeaturesSection";
import logoSimplified from "../../assets/landingPage/logoSimplified.svg";
import Botao from "../../components/Botoes/Botao";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="main-custom">
      <Navbar showLoginButton={true} />

      <section className="section-custom items-center">
        <div className="max-w-2xl">
          <WelcomeBanner />
          <FeaturesSection />

          {/* Div contêiner para o parágrafo e a imagem */}
          <div className="relative">
            <div className="relative z-10">
              <p className="text-right leading-tight my-4">
                A plataforma que <span className="font-bold">centraliza </span>
                toda a relação entre locador e locatário, simplificando a gestão
                de imóveis, contratos e pagamentos em um só lugar
              </p>

              <Botao
                label="Entrar"
                onClick={() => {
                  navigate("/login");
                }}
              />
            </div>

            <img
              src={logoSimplified}
              className="w-16 absolute bottom-11 -left-4 z-0 -rotate-45 opacity-75"
              alt="Logotipo simplificado da K.K. Administradora"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
