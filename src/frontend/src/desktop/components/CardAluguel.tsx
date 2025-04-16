// RentCard.tsx
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import PaymentModal, { PaymentData } from "./PaymentModal"; 
import AddPaymentModal from "./AddPaymentModal";

interface RentCardProps {
  id: number;
  contractId: number;
  month: string;
  year: string;
  paid: boolean;
  paymentData?: PaymentData;
}

const RentCard: React.FC<RentCardProps> = ({
  id,
  contractId,
  month,
  year,
  paid,
  paymentData
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);

  // const navigate = useNavigate();

  // Abre modal de visualização de pagamento
  const handleViewPayment = () => {
    setIsModalOpen(true);
  };

  // Fecha modal de visualização
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Abre modal de adicionar pagamento
  const handleAddPayment = () => {
    setIsAddPaymentOpen(true);
  };

  // Fecha modal de adicionar pagamento
  const handleCloseAddPaymentModal = () => {
    setIsAddPaymentOpen(false);
  };

  return (
    <>
      <div className="w-full flex flex-col border border-neutral-300 rounded shadow-md p-4 bg-white transition-transform hover:shadow-lg hover:scale-[1.005] duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-neutral-800">
            Aluguel de {month}/{year}
          </h3>

          {/* Se estiver pago e tiver dados de pagamento, mostra botão "Ver pagamento" */}
          {paid && paymentData && (
            <button
              onClick={handleViewPayment}
              className="px-4 py-2 text-sm font-medium text-neutral-800 border border-neutral-800 rounded-md hover:bg-neutral-800 hover:text-white transition-colors"
            >
              Ver pagamento
            </button>
          )}

          {/* Se NÃO estiver pago, mostra botão "Adicionar pagamento" */}
          {!paid && (
            <button
              onClick={handleAddPayment}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
            >
              Adicionar pagamento
            </button>
          )}
        </div>

        {/* AluguelId, ContratoId e Status */}
        <p className="text-sm text-neutral-700 mb-1">
          <strong>Aluguel ID:</strong> {id}
        </p>
        <p className="text-sm text-neutral-700 mb-1">
          <strong>Contrato ID:</strong> {contractId}
        </p>
        {paid ? (
          <p className="text-sm font-semibold text-green-500">Aluguel pago</p>
        ) : (
          <p className="text-sm font-semibold text-red-500">Pagamento pendente</p>
        )}
      </div>

      {/* Modal de visualização de pagamento */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        paymentData={paymentData}
      />

      {/* Modal de adicionar pagamento */}
      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={handleCloseAddPaymentModal}
        rentId={id} // passamos o ID do aluguel
      />
    </>
  );
};

export default RentCard;
