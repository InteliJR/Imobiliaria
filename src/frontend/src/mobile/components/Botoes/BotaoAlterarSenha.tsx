import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";

interface BotaoAlterarSenhaProps {
  label: string;
  onClick: () => void;
}

const BotaoAlterarSenha: React.FC<BotaoAlterarSenhaProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center border-2 border-neutral-500 hover:border-neutral-700 hover:shadow-xl py-3 px-4 rounded-lg shadow-sm transition duration-300"
    >
      <RiLockPasswordLine size={25} className="text-neutral-500 mr-2"/>
      <p className="text-neutral-900 font-sans text-lg border-2 text-left">
        {label}
      </p>
    </button>
  );
};

export default BotaoAlterarSenha;
