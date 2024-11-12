import React from "react";

interface BotaoProps {
  label: string;
  onClick: () => void;
}

const Botao: React.FC<BotaoProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-neutral-900 hover:bg-neutral-black hover:shadow-xl text-neutral-100 py-3 px-4 rounded-lg font-sans text-lg shadow-sm z-10 transition duration-300"
    >
      {label}
    </button>
  );
};

export default Botao;
