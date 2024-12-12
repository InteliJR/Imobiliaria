import React from 'react';

interface CardProps {
  title: string;
  line1: string;
  line2: string;
  line3: string;
  imageUrl: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, line1, line2, line3, imageUrl, onClick }) => {
  return (
    <div className="flex flex-row-reverse shadow-[2px_2px_4px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden h-[120px]" onClick={onClick}>
      {/* Imagem do Card */}
      <div className="w-1/4">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover rounded-r" />
      </div>
      
      {/* Conteúdo do Card */}
      <div className="w-3/4 p-4 text-[#363430]">
        <h3 className="text-form-label mb-2 text-[#363430]">{title}</h3>
        <p className="text-normal-text mb-1">
          <span className="text-[#76726A]">Locatário:</span> {line1}
        </p>
        <p className="text-normal-text mb-1">
          <span className="text-[#76726A]">Imóvel:</span> {line2}
        </p>
        <p className="text-normal-text">
          <span className="text-[#76726A]">Início:</span> {line3}
        </p>
      </div>
    </div>
  );
};

export default Card;
