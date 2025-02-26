import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="z-10">
      <div className="bg-neutral-black flex justify-center items-center flex-col pt-10 pb-4 gap-x-8 bg-green-500">
        <div className="flex justify-around items-center px-12 w-full max-w-7xl">
          <div className="flex flex-col ">
            <img src="/LogoFooter.svg" alt="" className="w-64" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-[16px]">Contate-nos</h1>
            <p className="text-white text-[12px]/5 mb-2">
              contato@kekassessoria.com
              <br />
              +55 (11) 96592-2552 <br />
            </p>
            <h1 className="text-white font-bold text-[16px]">Endereço</h1>
            <p className="text-white text-[12px]/5">
              Rua Alvorada 1289, sala 1702 - Vila Olímpia <br />
              04550-070 <br />
              São Paulo, Brasil <br />
            </p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 justify-center mt-6">
          <a
            href="https://www.facebook.com/578139995384085"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookSquare className="text-white text-2xl" />
          </a>
          <a
            href="https://www.instagram.com/kkass_essoria/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white text-2xl" />
          </a>
        </div>
        {/* Footer Text */}
        <p className="text-neutral-500 text-[8px] text-end mt-4 me-4 self-end">
          © 2024 K&amp;K Assessoria e Gestão de Negócios
          <br />
          Todos os Direitos Reservados.
        </p>
      </div>
    </footer>
  );
}
