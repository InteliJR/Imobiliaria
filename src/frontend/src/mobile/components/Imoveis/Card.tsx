import React from 'react';

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
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 shadow-md rounded-md overflow-hidden">
      {/* Imagem do Card */}
      <div className="w-full sm:w-1/4">
        <img
          src={imageSrc}
          alt={`Imagem do imóvel ${id}`}
          className="h-[200px] sm:h-full w-full object-cover"
        />
      </div>

      {/* Conteúdo do Card */}
      <div className="w-full sm:w-3/4 p-4 text-[#363430]">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{address}</h3>
        <p className="text-sm sm:text-base text-[#76726A]">
          <span className="font-semibold">Locador:</span> {landlord}
        </p>
        <p className="text-sm sm:text-base text-[#76726A]">
          <span className="font-semibold">Locatário:</span> {tenant || 'Não disponível'}
        </p>
        <p className="text-sm sm:text-base text-[#76726A]">
          <span className="font-semibold">Bairro:</span> {neighborhood}
        </p>
        <p className="text-sm sm:text-base text-[#76726A]">
          <span className="font-semibold">CEP:</span> {postalCode}
        </p>
        <p className="text-sm sm:text-base text-[#76726A]">
          <span className="font-semibold">Tipo de imóvel:</span> {propertyType}
        </p>
        <p className="text-sm sm:text-base text-[#76726A]">
          <span className="font-semibold">Preço:</span> {price}
        </p>
        <p className="text-sm sm:text-base text-[#76726A]">
          <span className="font-semibold">Condomínio:</span> {condominio}
        </p>
      </div>
    </div>
  );
};

export default Card;
