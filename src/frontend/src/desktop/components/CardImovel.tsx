import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  address: string;
  neighborhood: string;
  postalCode: string;
  propertyType: string;
  landlord: string;
  tenant: string | null;
  imageSrc: string;
  price: string;
  condominio: string;
}

const Card: React.FC<CardProps> = ({
  id,
  address,
  neighborhood,
  postalCode,
  propertyType,
  landlord,
  tenant,
  imageSrc,
  price,
  condominio,
}) => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleClick = () => {
    navigate(`/imovel/${id}`);
  };

  return (
    <div
      className="w-full flex border border-neutral-300 rounded shadow-md overflow-hidden aspect-[6/1] cursor-pointer transition-transform hover:shadow-lg hover:scale-[1.005] duration-300 ease-in-out bg-white"
      onClick={handleClick}
    >
      {/* Image Section */}
      <img
        src={imageSrc}
        alt={address}
        className="w-1/6 h-full object-cover"
      />

      {/* Content Section */}
      <div className="flex-grow p-4">
        {/* Address and Neighborhood */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#7C5A26]">
            {address}
          </h3>
          <span className="text-sm text-[#D1A254]">{neighborhood}</span>
        </div>

        {/* Additional Details */}
        <p className="text-sm text-neutral-700 mb-1">
          <strong>CEP:</strong> {postalCode} - {propertyType}
        </p>
        <p className="text-sm text-neutral-700 mb-1">
          <strong>Locador:</strong>{" "}
          <span className="text-blue-500">{landlord}</span>
        </p>
        <p className="text-sm text-neutral-700 mb-1">
          <strong>Locatário:</strong>{" "}
          {tenant ? tenant : <span className="text-neutral-500">---</span>}
        </p>

        {/* Button */}
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 text-sm font-medium text-neutral-800 border border-neutral-800 rounded-md hover:bg-neutral-800 hover:text-white transition-colors"
        >
          Visualizar detalhes
        </button>
      </div>

      {/* Price Section */}
      <div className="w-1/4 flex items-center justify-end pr-4 text-neutral-600">
        R$ {price} | R$ {condominio}
      </div>
    </div>
  );
};

export default Card;
