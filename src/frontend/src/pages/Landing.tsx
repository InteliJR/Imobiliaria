import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import WelcomeBanner from "../components/Landing/WelcomeBanner";
import FeaturesSection from "../components/Landing/FeaturesSection";
import logoSimplified from "../assets/landingPage/logoSimplified.svg";

export default function Landing() {
  return (
    <div>
      <Navbar showLoginButton={true} />

      <main className="main-custom">
        <WelcomeBanner />

        <FeaturesSection />

        <div className="relative"> {/* Div para criar um container relativo e posicionar a logo simplificada (absolute)  */}
          <p className="text-right leading-tight">
            A plataforma que <span className="font-bold">centraliza</span> toda
            a relação entre locador e locatário, simplificando a gestão de
            imóveis, contratos e pagamentos em um só lugar
          </p>

          <img // Logo que fica espalhada pela tela
            src={logoSimplified}
            className="w-16 absolute -bottom-6 -left-6 z-0 -rotate-45 opacity-75"
            alt="Logotipo simplificado da K.K. Administradora"
          />
        </div>

        <button
          className="w-full h-10 z-10 bg-gray-600 rounded-md"
          aria-label="Entrar na plataforma"
        >
          Entrar
        </button>
      </main>

      <Footer />
    </div>
  );
}
