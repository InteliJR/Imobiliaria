// CreateNextMonthsModal.tsx
import React, { useState } from "react";
import axiosInstance from "../../services/axiosConfig";

interface CreateNextMonthsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractId: string | number;  // Pode ser string se veio do useParams
  onSuccess?: () => void;       // Se quiser recarregar a lista ou fazer algo depois de criar
}

const CreateNextMonthsModal: React.FC<CreateNextMonthsModalProps> = ({
  isOpen,
  onClose,
  contractId,
  onSuccess
}) => {
  const [numberOfMonths, setNumberOfMonths] = useState("1"); // string p/ input

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Faz requisição POST
      await axiosInstance.post(`payment/Rent/criar/proximoMes/${contractId}/${numberOfMonths}`, {});

      // Se quiser executar algo após sucesso
      if (onSuccess) {
        onSuccess();
      }

      // Fecha o modal
      onClose();
    } catch (error) {
      console.error("Erro ao criar próximos meses:", error);
      // Trate o erro ou exiba uma mensagem de erro
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-sm mx-4">
        <h2 className="text-lg font-bold mb-4">Adicionar Próximos Meses</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="months" className="block text-sm font-medium mb-1">
              Quantidade de meses a adicionar
            </label>
            <input
              id="months"
              type="number"
              min={1}
              value={numberOfMonths}
              onChange={(e) => setNumberOfMonths(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-700 rounded-md hover:bg-neutral-700 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-neutral-50 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNextMonthsModal;
