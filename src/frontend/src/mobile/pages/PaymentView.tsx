import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import Botao from "../../components/Botoes/Botao";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast, showSuccessToast } from "../../utils/toastMessage";

interface Payment {
  valor?: number;
  data?: string;
  pagante?: string;
  metodo_pagamento?: string;
  descricao?: string;
  tipo_pagamento?: string;
  valor_multa?: number;
}

export default function Pagamento() {
  const { id } = useParams(); // Obtém o ID do pagamento pela URL
  const [role, setRole] = useState("admin"); // Simulação da role do usuário
  const [isEditable, setIsEditable] = useState(false); // Controla se o formulário é editável
  const [payment, setPayment] = useState<Partial<Payment>>({});
  const [originalPayment, setOriginalPayment] = useState<Partial<Payment>>({});
  const [loadingSkeleton, setLoadingSkeleton] = useState(true); // Loading inicial
  const [loadingSpinner, setLoadingSpinner] = useState(false); // Loading durante salvamento

  const [payers, setPayers] = useState<{ id: string; name: string }[]>([]);
  const [isLoadingPayers, setIsLoadingPayers] = useState(false);

  const fetchPayment = async () => {
    setLoadingSkeleton(true);
    try {
      const mockPayment = {
        pagamentoId: "pay_001",
        contratoId: "12345",
        valor: 1500,
        data: "2024-01-05",
        pagante: "João Silva",
        metodo_pagamento: "Pix",
        descricao: "Pagamento mensal",
        tipo_pagamento: "Mensalidade",
        multa: true,
        valor_multa: 1500,
      };

      // Aqui deve ficar a requisição para obter este pagamento com base no id
      console.log(`busca o pagamento com o id ${id}`);

      setPayment(mockPayment);
      setOriginalPayment(mockPayment);
    } catch (error) {
      console.error(error);
      showErrorToast("Não foi possível carregar este pagamento");
    } finally {
      setLoadingSkeleton(false);
    }
  };

  // Função para buscar os pagantes
  const fetchPayers = async () => {
    try {
      setIsLoadingPayers(true);
      const response = [
        { id: "1", name: "João Silva" },
        { id: "2", name: "Maria Oliveira" },
      ]; // Simulação da API
      // Aqui deve ficar a requisição à API para trazer todos os pagantes e colocá-los como options do campo de pagante.
      setPayers(response);
    } catch (error) {
      showErrorToast("Erro ao carregar pagantes.");
    } finally {
      setIsLoadingPayers(false);
    }
  };

  useEffect(() => {
    fetchPayment();
    fetchPayers();
    setRole("admin"); // Simula captura da role do usuário
    setIsEditable(role === "admin"); // Somente admin pode editar
  }, [role]);

  const handleFieldChange = (field: keyof Payment, value: any) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingSpinner(true);

    const hasChanges = Object.keys(originalPayment).some(
      (key) => originalPayment[key as keyof Payment] !== payment[key as keyof Payment]
    );

    if (!hasChanges) {
      showErrorToast("Nenhuma alteração foi feita.");
      setLoadingSpinner(false);
      return;
    }

    const isInvalid =
      !payment.valor ||
      payment.valor <= 0 ||
      !payment.data ||
      isNaN(new Date(payment.data).getTime()) ||
      !payment.pagante ||
      payment.pagante.trim() === "" ||
      !payment.metodo_pagamento ||
      payment.metodo_pagamento.trim() === "" ||
      !payment.tipo_pagamento ||
      payment.tipo_pagamento.trim() === "" ||
      (payment.tipo_pagamento === "multa" && (!payment.valor_multa || payment.valor_multa <= 0));

    if (isInvalid) {
      showErrorToast("Preencha todos os campos obrigatórios corretamente.");
      setLoadingSpinner(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showSuccessToast("Pagamento atualizado com sucesso!");
      setOriginalPayment(payment);
    } catch (error) {
      console.error("Erro ao salvar o pagamento:", error);
      showErrorToast("Erro ao salvar o pagamento.");
    } finally {
      setLoadingSpinner(false);
    }
  };

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />

        {loadingSkeleton ? (
          <Loading type="skeleton" />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <form className="w-full max-w-5xl flex flex-col gap-5" onSubmit={handleSave}>
              <h1 className="w-full font-bold text-lg">Pagamento {id}</h1>
              <div className="flex flex-col">
                <label htmlFor="valor">Valor:</label>
                <CurrencyInput
                  id="valor"
                  name="valor"
                  placeholder="R$ 0,00"
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  decimalsLimit={2}
                  maxLength={9}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  value={payment.valor || ""}
                  onValueChange={(newValue) =>
                    handleFieldChange("valor", parseFloat(newValue || "0"))
                  }
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="data">Data:</label>
                <input
                  id="data"
                  type="date"
                  value={payment.data || ""}
                  onChange={(e) => handleFieldChange("data", e.target.value)}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  required
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="pagante">Pagante:</label>
                {isLoadingPayers ? (
                  <p>Carregando pagantes...</p>
                ) : (
                  <select
                    id="pagante"
                    name="pagante"
                    value={payment.pagante || ""}
                    onChange={(e) => handleFieldChange("pagante", e.target.value)}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                    required
                    disabled={!isEditable}
                  >
                    {payers.map((payer) => (
                      <option key={payer.id} value={payer.name}>
                        {payer.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="metodo_pagamento">Método de Pagamento:</label>
                <select
                  id="metodo_pagamento"
                  name="metodo_pagamento"
                  value={payment.metodo_pagamento || ""}
                  onChange={(e) => handleFieldChange("metodo_pagamento", e.target.value)}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  required
                  disabled={!isEditable}
                >
                  <option value="Pix">Pix</option>
                  <option value="Boleto">Boleto</option>
                  <option value="Débito">Débito</option>
                  <option value="Crédito">Crédito</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="tipo_pagamento">Tipo de Pagamento:</label>
                <select
                  id="tipo_pagamento"
                  name="tipo_pagamento"
                  value={payment.tipo_pagamento || ""}
                  onChange={(e) => handleFieldChange("tipo_pagamento", e.target.value)}
                  className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  required
                  disabled={!isEditable}
                >
                  <option value="Mensalidade">Mensalidade</option>
                  <option value="Multa">Multa</option>
                  <option value="Reforma">Reforma</option>
                </select>
              </div>

              {payment.tipo_pagamento === "multa" && (
                <div className="flex flex-col">
                  <label htmlFor="valor_multa">Valor da Multa:</label>
                  <CurrencyInput
                    id="valor_multa"
                    name="valor_multa"
                    placeholder="R$ 0,00"
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    decimalsLimit={2}
                    maxLength={9}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                    value={payment.valor_multa || ""}
                    onValueChange={(newValue) =>
                      handleFieldChange("valor_multa", parseFloat(newValue || "0"))
                    }
                    disabled={!isEditable}
                  />
                </div>
              )}
              <div className="flex flex-col">
                <label htmlFor="descricao">Descrição:</label>
                <textarea
                  id="descricao"
                  value={payment.descricao || ""}
                  onChange={(e) => handleFieldChange("descricao", e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm h-24 resize-none"
                  maxLength={350}
                  disabled={!isEditable}
                />
              </div>

              {/* Botão Salvar Alterações */}
              {isEditable && <Botao label="Salvar Alterações" onClick={handleSave} />}
            </form>
          </div>
        )}
      </section>

      {loadingSpinner && <Loading type="spinner" />}
      <Footer />
    </main>
  );
}
