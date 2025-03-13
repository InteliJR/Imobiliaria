import React from "react";

interface CardProps {
  aluguelId: number;
  title: string;
  line1: string;
  line2: string;
  line3: string;
  status: "Em aberto" | "Pago";
}

const Card: React.FC<CardProps> = ({
  aluguelId,
  title,
  line1,
  line2,
  line3,
  status,
}) => {

  return (
    <div
      className="flex border border-neutral-300 shadow-[2px_2px_4px_rgba(0,0,0,0.4)] 
                 rounded-[4px] overflow-hidden h-[120px] cursor-pointer
                 transition-transform hover:shadow-[2px_2px_4px_rgba(0,0,0,0.8)] 
                 hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-default"  
    >
      {/* Conteúdo do Card */}
      <div className="w-3/4 p-4 text-[#363430]">
        <h3 className="text-form-label mb-2 text-[#363430]">{title}</h3>
        <p className="text-normal-text mb-1">
          <span className="text-[#76726A]">Contrato:</span> {line1}
        </p>
        <p className="text-normal-text mb-1">
          <span className="text-[#76726A]">Mês:</span> {line2}
        </p>
      </div>

      {/* Status do Card */}
      <div className="w-[30%] flex items-start text-form-label p-4 text-[#76726A] italic justify-center">
      {status == "Pago" ? (
          <p className="text-sm font-semibold text-green-500">Aluguel pago</p>
        ) : (
          <p className="text-sm font-semibold text-red-500">Pagamento pendente</p>
        )}
      </div>
    </div>
  );
};

export default Card;
