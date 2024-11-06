import React from "react";

interface VisualizarItemProps {
  label: string;
  informacao: string;
}

const VisualizarItem: React.FC<VisualizarItemProps> = ({
  label,
  informacao,
}) => {
  return (
    <div>
      <h1 className="text-neutral-600 font-normal-text">{label}</h1>
      <h2 className="font-normal-text leading-4">{informacao}</h2>
    </div>
  );
};

export default VisualizarItem;
