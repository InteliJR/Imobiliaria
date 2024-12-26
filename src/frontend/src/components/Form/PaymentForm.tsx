import React from "react";
import CurrencyInput from "react-currency-input-field";
import Botao from "../Botoes/Botao";

interface Payment {
  valor?: number;
  data?: string;
  pagante?: string;
  metodo_pagamento?: string;
  descricao?: string;
  tipo_pagamento?: string;
  valor_multa?: number;
}

interface PaymentFormProps {
  newPayment: Partial<Payment>;
  setNewPayment: React.Dispatch<React.SetStateAction<Partial<Payment>>>;
  handleAddPayment: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  newPayment,
  setNewPayment,
  handleAddPayment,
}) => {
  const handlePaymentChange = (field: keyof Payment, value: any) => {
    setNewPayment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form
      className="flex flex-col gap-5 border-2 border-neutral-500 p-4 rounded mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddPayment();
      }}
    >
      <h2 className="text-xl font-semibold">Adicionar Pagamento</h2>

      {/* Valor */}
      <div className="flex flex-col">
        <label htmlFor="paymentValue">Valor:</label>
        <CurrencyInput
          id="paymentValue"
          name="paymentValue"
          placeholder="R$ 0,00"
          decimalSeparator=","
          groupSeparator="."
          prefix="R$ "
          decimalsLimit={2}
          maxLength={9}
          value={newPayment.valor || ""}
          onValueChange={(newValue) =>
            handlePaymentChange("valor", parseFloat(newValue || "0"))
          }
          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
        />
      </div>

      {/* Data */}
      <div className="flex flex-col">
        <label htmlFor="paymentDate">Data:</label>
        <input
          id="paymentDate"
          type="date"
          name="data"
          value={newPayment.data || ""}
          onChange={(e) => handlePaymentChange("data", e.target.value)}
          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          required
        />
      </div>

      {/* Pagante */}
      <div className="flex flex-col">
        <label htmlFor="pagante">Pagante:</label>
        <input
          id="pagante"
          type="text"
          name="pagante"
          value={newPayment.pagante || ""}
          onChange={(e) => handlePaymentChange("pagante", e.target.value)}
          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          required
        />
      </div>

      {/* Método de Pagamento */}
      <div className="flex flex-col">
        <label htmlFor="metodo_pagamento">Método de Pagamento:</label>
        <input
          type="text"
          id="metodo_pagamento"
          name="metodo_pagamento"
          value={newPayment.metodo_pagamento || ""}
          onChange={(e) =>
            handlePaymentChange("metodo_pagamento", e.target.value)
          }
          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          required
        />
      </div>

      {/* Tipo de Pagamento */}
      <div className="flex flex-col">
        <label htmlFor="tipo_pagamento">Tipo de Pagamento:</label>
        <input
          type="text"
          id="tipo_pagamento"
          name="tipo_pagamento"
          value={newPayment.tipo_pagamento || ""}
          onChange={(e) =>
            handlePaymentChange("tipo_pagamento", e.target.value)
          }
          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          required
        />
      </div>

      {/* Valor da Multa */}
      <div className="flex flex-col">
        <label htmlFor="fineValue">Valor da Multa:</label>
        <CurrencyInput
          id="fineValue"
          name="fineValue"
          placeholder="R$ 0,00"
          decimalSeparator=","
          groupSeparator="."
          prefix="R$ "
          decimalsLimit={2}
          maxLength={9}
          value={newPayment.valor_multa || ""}
          onValueChange={(newValue) =>
            handlePaymentChange("valor_multa", parseFloat(newValue || "0"))
          }
          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
        />
      </div>

      {/* Descrição */}
      <div className="flex flex-col">
        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={newPayment.descricao || ""}
          onChange={(e) => handlePaymentChange("descricao", e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm h-24 resize-none"
          maxLength={350}
        />
      </div>

      {/* Botão de Adicionar Pagamento */}
      <Botao label="Adicionar Pagamento" onClick={handleAddPayment} />
    </form>
  );
};

export default PaymentForm;
