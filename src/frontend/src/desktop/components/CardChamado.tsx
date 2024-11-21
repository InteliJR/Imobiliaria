import React from "react";
import { useNavigate } from "react-router-dom";

interface ProblemCardProps {
  id: number;
  title: string;
  creator: string;
  contact: string;
  description: string;
  date: string;
  time: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  id,
  title,
  creator,
  contact,
  description,
  date,
  time,
}) => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleClick = () => {
    navigate(`/chamado/${id}`);
  };

  return (
    <div
      className="w-full flex flex-col border border-neutral-300 rounded shadow-md p-4 bg-white cursor-pointer transition-transform hover:shadow-lg hover:scale-[1.005] duration-300 ease-in-out"
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-neutral-800">{title}</h3>
        <span className="text-sm text-neutral-600">{`${date} · ${time}`}</span>
      </div>

      {/* Creator and Contact */}
      <p className="text-sm text-neutral-700 mb-4">
        <strong>Criado por:</strong> {creator} &middot; <strong>Contato:</strong> {contact}
      </p>

      {/* Description */}
      <p className="text-sm text-neutral-700 mb-4 truncate">
        {description}
      </p>

      {/* Button */}
      <div className="flex justify-start">
        <button
          onClick={handleClick}
          className="px-4 py-2 text-sm font-medium text-neutral-800 border border-neutral-800 rounded-md hover:bg-neutral-800 hover:text-white transition-colors"
        >
          Visualizar detalhes
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;
