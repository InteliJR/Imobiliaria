import React from "react";

interface BotaoProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Botao: React.FC<BotaoProps> = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {label}
    </button>
  );
};

export default Botao;
