// AddPaymentModal.tsx
import React, { useState } from "react";
import axiosInstance from "../../services/axiosConfig";
import { toast } from "react-toastify";

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  rentId: number; // O ID do aluguel (RentId) que desejamos atualizar
}

// Define os campos do formulário com o mesmo nome do endpoint (camelCase x form field)
const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
  isOpen,
  onClose,
  rentId
}) => {
  const [valor, setValor] = useState<string>("0");
  const [metodoPagamento, setMetodoPagamento] = useState<string>("PIX");
  const [descricao, setDescricao] = useState<string>("");
  const [valorMulta, setValorMulta] = useState<string>("0");
  const [multa, setMulta] = useState<boolean>(false);
  const [tipoPagamento, setTipoPagamento] = useState<string>("Aluguel");
  const [pagante, setPagante] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  // Handler de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("Valor", valor);
      formData.append("MetodoPagamento", metodoPagamento);
      formData.append("Descricao", descricao);
      formData.append("ValorMulta", valorMulta);
      formData.append("Multa", multa.toString());
      formData.append("TipoPagamento", tipoPagamento);
      formData.append("Pagante", pagante);
      formData.append("RentId", rentId.toString());

      // Se tiver arquivo, adicionamos
      if (file) {
        // Campo "files" no endpoint
        formData.append("files", file);
      }

      // Endpoint: 'https://localhost:57327/Rent/atualizarComoPago'
      // Ajuste se necessário
      const response = await axiosInstance.post("payment/Rent/atualizarComoPago", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log("Pagamento atualizado com sucesso:", response.data);

      if (!response.data) {
        toast.error("Erro ao se conectar com o servidor.");
        return;
      }

      // Fechar modal ao concluir
      toast.success("Pagamento adicionado com sucesso");
      // Regarrega a página para atualizar os dados
      // Timeout para dar tempo de exibir o toast
        setTimeout(() => {
            window.location.reload();
        }, 2000);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Adicionar Pagamento</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-neutral-700">
          <div>
            <label className="block font-medium mb-1">Valor</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Método de Pagamento</label>
            <input
              type="text"
              value={metodoPagamento}
              onChange={(e) => setMetodoPagamento(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Valor da Multa</label>
            <input
              type="number"
              value={valorMulta}
              onChange={(e) => setValorMulta(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={multa}
              onChange={(e) => setMulta(e.target.checked)}
              className="mr-2"
            />
            <label className="font-medium">Multa?</label>
          </div>

          <div>
            <label className="block font-medium mb-1">Tipo de Pagamento</label>
            <input
              type="text"
              value={tipoPagamento}
              onChange={(e) => setTipoPagamento(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Pagante</label>
            <input
              type="text"
              value={pagante}
              onChange={(e) => setPagante(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Comprovante (PDF, imagem, etc.)</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
              className="w-full"
              accept="application/pdf,image/*"
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;
