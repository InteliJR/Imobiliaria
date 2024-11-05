import React from 'react';
import ArrowIcon from '/Arrow.svg'; // Substitua pelo caminho correto do SVG

const ReturnButton: React.FC = () => {
  return (
    <button className="flex items-center gap-[10px] pb-[7px] self-stretch">
      <img src={ArrowIcon} alt="Seta para voltar" className="w-[7px]" />
      <span className="text-normal-text mt-[1.5px]">Voltar</span>
    </button>
  );
};

export default ReturnButton;
