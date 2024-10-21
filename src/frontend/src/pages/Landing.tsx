import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

// Importação das imagens
import logo from "../assets/landingPage/logo.svg";
import houseUp from "../assets/landingPage/houseUp.png";
import houseDown from "../assets/landingPage/houseDown.png";
import houseBg from "../assets/landingPage/houseBg.jpg"; // Importe a imagem aqui

export default function Landing() {
  return (
    <div>
      <Navbar />

      <main className="flex flex-col gap-4 mx-4 my-6">
        <div className="w-full flex justify-between items-start">
          <img src={logo} className="w-36" alt="Imagem com a logotipo" />
          <img src={houseUp} className="w-44" alt="Imagem estilizada de uma casa" />
        </div>

        <div className="w-full flex justify-between items-end">
          <p>Bem vindo à <br /> <span className="font-bold">K.K. Administradora</span></p>
          <img src={houseDown} className="w-44" alt="Imagem estilizada de uma casa" />
        </div>

        <div
          className="w-full h-14 flex justify-center mt-2 bg-no-repeat bg-cover rounded-md"
          style={{ backgroundImage: `url(${houseBg})`, backgroundPosition: 'center calc(100% + 40px)'  }} // Definindo o background com style
        >
          <div className="flex-1 flex justify-center items-center">
            <p className="font-bold text-white">Agilidade</p>
          </div>

          <div className="flex-1 flex justify-center items-center border-l-2 border-r-2 border-white-900">
            <p className="font-bold text-white">Segurança</p>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <p className="font-bold text-white">Simplicidade</p>
          </div>
        </div>

        <p className="text-right leading-tight">A plataforma que <span className="font-bold">centraliza</span> toda a relação entre locador e locatário, simplificando a gestão de imóveis, contratos e pagamentos em um só lugar</p>

        <button className="w-full h-10 bg-gray-600 rounded-md">Entrar</button>
      </main>

      <Footer />
    </div>
  );
}
