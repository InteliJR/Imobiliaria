// PaymentModal.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";

export interface PaymentData {
  pagamentoId: number;
  valor: number;
  data: string;
  status: boolean;
  contratoId: number;
  descricao: string;
  metodoPagamento: string;
  multa: boolean;
  pagante: string;
  tipoPagamento: string;
  valorMulta: number;
  boletoDoc: string | null;
  mes: string;
  ano: string;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData?: PaymentData;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  paymentData,
}) => {
  // Armazena o link atualizado do PDF após a assinatura
  const [updatedBoletoDoc, setUpdatedBoletoDoc] = useState<string | null>(null);

  // Função para assinar o PDF – sempre declarada independente do `isOpen`
  const signPdf = async (pdfUrl: string) => {
    try {
      // Formata a string para enviar ao endpoint que assina
      const fileName = pdfUrl.replace(
        "https://storage.googleapis.com/administradora-kk.appspot.com/",
        ""
      );

      // Faz a requisição para assinar
      const response = await axiosInstance.get(
        `payment/Rent/assinarComprovantes?contractUrl=${fileName}`
      );
      // console.log("Resposta da assinatura:", response);

      // Define a nova URL do PDF
      setUpdatedBoletoDoc(response.data);
    } catch (error) {
      console.error("Erro ao assinar o PDF:", error);
      setUpdatedBoletoDoc(null);
    }
  };

  // Quando o modal abrir e houver um boletoDoc, chamamos a função de assinar
  useEffect(() => {
    if (isOpen && paymentData?.boletoDoc) {
      signPdf(paymentData.boletoDoc);
    }
  }, [isOpen, paymentData?.boletoDoc]);

  // Evita renderizar hooks de forma condicional:
  // Primeiro chamamos useEffect e useState, depois usamos if/return.
  if (!isOpen || !paymentData) return null;

  // Desestrutura os campos
  const {
    valor,
    data,
    status,
    contratoId,
    descricao,
    metodoPagamento,
    multa,
    pagante,
    tipoPagamento,
    valorMulta,
    boletoDoc,
    mes,
    ano,
  } = paymentData;

  // Link do PDF que será exibido no iframe (o assinado, se existir)
  const pdfToDisplay = updatedBoletoDoc || boletoDoc;

  return (
    // Backdrop escuro
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Container do modal */}
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Informações de Pagamento</h2>

        <div className="space-y-2 text-sm text-neutral-700">
          <p>
            <strong>Contrato ID:</strong> {contratoId}
          </p>
          <p>
            <strong>Mês/Ano:</strong> {mes}/{ano}
          </p>
          <p>
            <strong>Valor:</strong> R$ {valor}
          </p>
          <p>
            <strong>Data do Pagamento:</strong> {data}
          </p>
          <p>
            <strong>Descrição:</strong> {descricao}
          </p>
          <p>
            <strong>Método de Pagamento:</strong> {metodoPagamento}
          </p>
          <p>
            <strong>Multa:</strong> {multa ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Pagante:</strong> {pagante}
          </p>
          <p>
            <strong>Tipo de Pagamento:</strong> {tipoPagamento}
          </p>
          <p>
            <strong>Valor da Multa:</strong> R$ {valorMulta}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {status ? (
              <span className="text-green-500">Pago</span>
            ) : (
              <span className="text-red-500">Pendente</span>
            )}
          </p>

          {/* Exibição do boleto PDF */}
          {pdfToDisplay ? (
            <div className="mt-4">
              <strong>Boleto:</strong>
              <iframe
                src={pdfToDisplay}
                title="Boleto PDF"
                className="w-full h-64 border rounded mt-2"
                onError={(e) => {
                  e.currentTarget.outerHTML =
                    "<p class='text-red-500'>Não foi possível visualizar o comprovante.</p>";
                }}
              />
            </div>
          ) : (
            <p className="text-red-500 mt-2">
              Não foi possível visualizar o comprovante.
            </p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-700 rounded-md hover:bg-neutral-700 hover:text-white transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
