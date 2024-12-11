import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importando o ícone do WhatsApp

interface WhatsAppBtnProps {
  phoneNumber: string;
  message: string;
}

const WhatsAppBtn: React.FC<WhatsAppBtnProps> = ({ phoneNumber, message }) => {
  // Cria a URL de redirecionamento do WhatsApp
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 flex justify-center items-center bg-green-500 text-white rounded-[100%] hover:bg-green-600 transition duration-300 z-40 drop-shadow-[0_0px_10px_rgba(34,197,94,.5)] text-4xl p-3text-5xl sm:text-5xl sm:p-4"
    >
      {/* Ícone do WhatsApp */}
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppBtn;

/* 
  Como utilizar o componente WhatsAppBtn:

  1. Importe o componente no arquivo onde deseja usá-lo.
     Exemplo: 
     import WhatsAppBtn from "./caminho/do/componente";

  2. Utilize o componente no JSX, passando os props necessários:
     - phoneNumber: O número de telefone com DDD para o WhatsApp (sem espaços, parênteses ou traços).
     - message: A mensagem predefinida que será enviada ao abrir o WhatsApp.

     Exemplo de uso:
     <WhatsAppBtn 
       phoneNumber="5511999999999"
       message="Olá, gostaria de mais informações sobre a plataforma K.K. Administradora."
     />
*/
