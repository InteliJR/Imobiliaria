import logo from "../../../assets/landingPage/logo.svg";
import houseUp from "../../../assets/landingPage/houseUp.png";
import logoSimplified from "../../../assets/landingPage/logoSimplified.svg";
import houseDown from "../../../assets/landingPage/houseDown.png";

export default function WelcomeBanner() {
  return (
    <section className="w-full flex flex-col gap-4">
      <div className="w-full relative h-40">
        <img
          src={logo}
          className="w-36 absolute top-0 left-0 z-20"
          alt="Logotipo da K.K. Administradora"
        />
        
        <img // Logo que fica espalhada pela tela
          src={logoSimplified}
          className="w-8 absolute -top-8 -right-1 z-0 -rotate-45 opacity-75"
          alt="Logotipo simplificado da K.K. Administradora"
        />

        <img
          src={houseUp}
          className="w-48 absolute bottom-0 right-0 z-10"
          alt="Imagem estilizada de uma casa"
        />
      </div>

      <div className="w-full relative h-40">
        <p className="absolute bottom-0 left-0 z-20 text-xl whitespace-nowrap font-semibold leading-tight">
          Bem vindo à <br />{" "}
          <span className="font-extrabold">K.K. Administradora</span>
        </p>

        <img // Logo que fica espalhada pela tela
          src={logoSimplified}
          className="w-10 absolute -top-6 -left-6 z-0 rotate-45 opacity-75"
          alt="Logotipo simplificado da K.K. Administradora"
        />

        <img
          src={houseDown}
          className="w-48 absolute bottom-0 right-0 z-10"
          alt="Imagem de uma casa estilizada"
        />
      </div>
    </section>
  );
}
