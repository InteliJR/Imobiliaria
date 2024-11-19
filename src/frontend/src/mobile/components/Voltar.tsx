import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '/Arrow.svg';

const Voltar: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <button 
      onClick={handleBack} 
      className="flex items-center gap-2 pb-2 self-stretch hover:opacity-80 focus:outline-none"
      aria-label="Voltar para a página anterior"
    >
      <img src={ArrowIcon} alt="Seta para voltar" className="w-[7px]" />
      <span className="text-normal-text mt-[1.5px]">Voltar</span>
    </button>
  );
};

export default Voltar;
