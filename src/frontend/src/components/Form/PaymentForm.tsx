import React from "react";
import { Payment } from "../../mobile/pages/ContractView";
import CurrencyInput from "react-currency-input-field";
import Botao from "../Botoes/Botao";
import { IoIosClose } from "react-icons/io";

interface PaymentFormProps {
  newPayment: Partial<Payment>;
  setNewPayment: React.Dispatch<React.SetStateAction<Partial<Payment>>>;
  handleAddPayment: () => void;
  setShowPaymentForm: (value: boolean) => void; // Aceita um booleano
  payers: { id: string; name: string }[]; // Lista de pagantes
  isLoadingPayers: boolean; // Indica se está carregando os pagantes
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  newPayment,
  setNewPayment,
  handleAddPayment,
  setShowPaymentForm,
  payers,
  isLoadingPayers,
}) => {
  const handlePaymentChange = (field: keyof Payment, value: any) => {
    setNewPayment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Exibe o campo "valor_multa" somente se "tipo_pagamento" for "multa"
  const isMulta = newPayment.tipo_pagamento === "multa";

  return (
    <form
      className="flex flex-col relative gap-5 border-2 border-neutral-500 p-4 rounded mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddPayment();
      }}
    >
      <h2 className="text-xl font-semibold">Adicionar Pagamento</h2>

      <button
        className="absolute top-1 right-2 hover:rotate-180 duration-300 ease-in-out"
        onClick={(e) => {
          e.preventDefault();
          setShowPaymentForm(false);
        }}
      >
        <IoIosClose size={40} />
      </button>

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
          onValueChange={(newValue) => handlePaymentChange("valor", parseFloat(newValue || "0"))}
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
        {isLoadingPayers ? (
          <p>Carregando pagantes...</p>
        ) : (
          <select
            id="pagante"
            name="pagante"
            value={newPayment.pagante || ""}
            onChange={(e) => handlePaymentChange("pagante", e.target.value)}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
            required
          >
            <option value="">Selecione um pagante</option>
            {payers.map((payer) => (
              <option key={payer.id} value={payer.id}>
                {payer.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Método de Pagamento */}
      <div className="flex flex-col">
        <label htmlFor="metodo_pagamento">Método de Pagamento:</label>
        <select
          id="metodo_pagamento"
          name="metodo_pagamento"
          value={newPayment.metodo_pagamento || ""}
          onChange={(e) => handlePaymentChange("metodo_pagamento", e.target.value)}
          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          required
        >
          <option value="" disabled>
            Selecione
          </option>
          <option value="pix">Pix</option>
          <option value="boleto">Boleto</option>
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
        </select>
      </div>

      {/* Tipo de Pagamento */}
      <div className="flex flex-col">
        <label htmlFor="tipo_pagamento">Tipo de Pagamento:</label>
        <select
          id="tipo_pagamento"
          name="tipo_pagamento"
          value={newPayment.tipo_pagamento || ""}
          onChange={(e) => handlePaymentChange("tipo_pagamento", e.target.value)}
          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          required
        >
          <option value="" disabled>
            Selecione
          </option>
          <option value="aluguel">Aluguel</option>
          <option value="multa">Multa</option>
          <option value="reforma">Reforma</option>
        </select>
      </div>

      {/* Valor da Multa */}
      {isMulta && (
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
            onValueChange={(newValue) => {
              const multaValue = parseFloat(newValue || "0");
              handlePaymentChange("valor_multa", multaValue);
              handlePaymentChange("multa", multaValue > 0);
            }}
            className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
          />
        </div>
      )}

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
