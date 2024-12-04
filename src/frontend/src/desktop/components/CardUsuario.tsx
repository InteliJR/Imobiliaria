import React from "react";
import { useNavigate } from "react-router-dom";

interface LandlordCardProps {
  id: number;
  name: string;
  role: string;
  cpf: string;
  rg: string;
  associatedProperties: number;
}

const LandlordCard: React.FC<LandlordCardProps> = ({
  id,
  name,
  role,
  cpf,
  rg,
  associatedProperties,
}) => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleClick = () => {
    navigate(`/locador/${id}`);
  };

  return (
    <div
      className="w-full flex justify-between items-center border border-neutral-300 rounded shadow-md p-4 bg-white cursor-pointer transition-transform hover:shadow-lg hover:scale-[1.005] duration-300 ease-in-out"
      onClick={handleClick}
    >
      {/* Content Section */}
      <div className="flex flex-col gap-2">
        {/* Name and Role */}
        <h3 className="text-lg font-bold text-[#7C5A26]">
          {name} <span className="text-[#D1A254]">{role}</span>
        </h3>

        {/* CPF and RG */}
        <p className="text-sm text-neutral-700">
          <strong>CPF:</strong> {cpf} &middot; <strong>RG:</strong> {rg}
        </p>

        {/* Button */}
        <button
          onClick={handleClick}
          className="mt-2 px-4 py-2 text-sm font-medium text-neutral-800 border border-neutral-800 rounded-md hover:bg-neutral-800 hover:text-white transition-colors"
        >
          Visualizar detalhes
        </button>
      </div>

      {/* Associated Properties Section */}
      <div className="text-sm text-neutral-600">
        Nº de imóveis associados: {associatedProperties}
      </div>
    </div>
  );
};

export default LandlordCard;
