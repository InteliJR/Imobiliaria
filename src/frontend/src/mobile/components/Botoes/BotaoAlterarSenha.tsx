import React from "react";

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
      className="w-full border-2 border-neutral-900 hover:border-neutral-black hover:shadow-xl  py-3 px-4 rounded-md  shadow-sm transition duration-300"
    >
      <p className="text-neutral-900 font-sans text-lg border-2 text-left">{label}</p>
    </button>
  );
};

export default BotaoAlterarSenha;
