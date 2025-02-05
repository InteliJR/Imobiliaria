import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FeaturesSection from "../../components/Landing/FeaturesSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../components/FooterBig";
import Botao from "../components/Botao";
import WhatsAppBtn from "../../components/Botoes/WhatsAppBtn";
// Importações das imagens
import whiteLogo from "../../assets/landingPage/desktop/whiteLogo.svg";
import logoSimplified from "../../assets/landingPage/logoSimplified.svg";
import house1 from "../../assets/landingPage/desktop/house1.jpg";
import house2 from "../../assets/landingPage/desktop/house2.jpg";
import house3 from "../../assets/landingPage/desktop/house3.jpg";
import house4 from "../../assets/landingPage/desktop/house4.jpg";
import house5 from "../../assets/landingPage/desktop/house5.jpg";

export default function Landing() {
  const navigate = useNavigate();

  // Array de imagens
  const images = [house1, house2, house3, house4, house5];

  // Estado para armazenar o índice da imagem atual
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hook para alternar a imagem a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 segundos

    // Limpar intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main className="main-custom">
      <Navbar showLoginButton={true} />

      <section className="section-custom">
        {/* Div com plano de fundo dinâmico */}
        <div
          className="flex items-center justify-center h-96 w-screen -ml-4 -mt-6 relative"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1.5s ease-in-out", // Transição suave
          }}
        >

          <img src={whiteLogo} className="w-80 z-10" alt="Logotipo branca" />

          <div className="bg-gray-100 h-52 w-1 rounded mx-12 z-10" />{/* Linha central que seprar a logo do texto */}

          <p className="text-3xl whitespace-nowrap text-white z-10">
            Bem vindo à <br />
            <span className="font-bold text-4xl">K.K. Administradora</span>
          </p>
        </div>

        <div className="flex justify-center items-center w-full gap-4 mb-10 mt-5 z-20">
          <FeaturesSection />

          <p className="w-[52rem] 2xl:w-[120rem] text-right leading-tight max-w-2xl">
            A plataforma que <span className="font-bold">centraliza </span>
            toda a relação entre locador e locatário, simplificando a gestão de
            imóveis, contratos e pagamentos em{" "}
            <span className="underline">um só lugar.</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center w-full mb-8 mt-4">
          <div className="flex max-w-5xl items-center justify-center relative mb-5 z-10">
            <p className="text-right w-1/2 z-10">
              Nós transformamos toda a sua experiência de gestão e aluguel de
              imóveis. Aqui, <span className="font-bold">locadores</span> e <span className="font-bold">locatários</span> encontram um espaço seguro e
              eficiente para gerenciar contratos, pagamentos e comunicações,
              tudo em um único lugar.
            </p>

            <div className="bg-gray-900 h-32 w-1 mx-10 rounded z-10" /> {/* Linha central */}

            <p className="text-left w-1/2 z-10">
              Com funcionalidades automatizadas e personalizadas para <span className="font-bold">
                suas
                necessidades
              </span>, nossa missão é facilitar cada etapa do processo,
              garantindo mais transparência e tranquilidade para você.
            </p>
          
            <img
              // Imagem deecorativa 
              src={logoSimplified}
              className="w-26 absolute -top-16 left-80 z-0 rotate-12 opacity-50"
              alt="Logotipo simplificado da K.K. Administradora"
            />
          </div>

          <p className="max-w-2xl text-center z-10 mt-5">
            <span className="underline">Simplifique</span> sua gestão com a <span className="font-bold">K.K. Administradora</span> e transforme a
            forma como você cuida dos seus imóveis!
          </p>
        </div>

        <Botao
          label="Entrar"
          onClick={() => {
            navigate("/login");
          }}
        />

          <div className="fixed bottom-8 left-8 z-50">
            <WhatsAppBtn
              phoneNumber="5511965922552"
              message="Olá, gostaria de mais informações sobre a plataforma K.K. Administradora."
            />
          </div>

        <img
          // Imagem deecorativa 
          src={logoSimplified}
          className="w-32 absolute -bottom-20 left-1 z-0 -rotate-45 opacity-50"
          alt="Logotipo simplificado da K.K. Administradora"
        />
        <img
          // Imagem deecorativa 
          src={logoSimplified}
          className="w-20 absolute bottom-10 right-16 z-0 rotate-12 opacity-75 -scale-x-100"
          alt="Logotipo simplificado da K.K. Administradora"
        />
      </section>

      <Footer />
    </main>
  );

}


