import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  locador: string;
  locatario: string;
  status: string;
  encerramento: string;
  location: string;
  iptu: string;
  aluguel: string;
  id: string;
}

const Card: React.FC<CardProps> = ({
  title,
  locador,
  locatario,
  status,
  encerramento,
  location,
  iptu,
  aluguel,
  id,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative p-4 border border-gray-300 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg hover:border-gray-400 transition-all"
      onClick={() => navigate(`/contratos/${id}`)}
    >
      <h3 className="text-lg font-semibold mb-2">Contrato {title}</h3>

      <span className="absolute top-3 right-4 text-sm text-gray-700 mb-1">{status}</span>
      <p className="text-sm text-gray-700 mb-1">Locador: {locador}</p>
      <p className="text-sm text-gray-700 mb-1">Locatário: {locatario}</p>
      <p className="text-sm text-gray-700 mb-1">Encerramento: {encerramento}</p>
      <p className="text-sm text-gray-700 mb-1">Localização: {location}</p>
      <p className="text-sm text-gray-700 mb-1">IPTU: R$ {iptu}</p>
      <p className="text-sm text-gray-700">Aluguel: R$ {aluguel}</p>
    </div>
  );
};

export default Card;
