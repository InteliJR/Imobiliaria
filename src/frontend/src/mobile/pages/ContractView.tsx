import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast, showSuccessToast } from "../../utils/toastMessage";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";
import Botao from "../../components/Botoes/Botao"; // Import do componente Botao
import CurrencyInput from "react-currency-input-field";

export default function Contrato() {
  const { id } = useParams(); // Obtém o ID do contrato pela URL
  const [role, setRole] = useState("admin"); // Simulação da role do usuário
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento
  const [loadingPayments, setLoadingPayments] = useState(true); // estado para controlar o carregamento dos pagamentos
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Estado para controlar a visibilidade do formulário de adição de pagamentos

  interface Contract {
    contratoId: string;
    documentos: string[];
    valorAluguel: number;
    dataInicio: string;
    dataEncerramento: string;
    locadorId: string;
    locatarioId: string;
    imovelId: string;
    tipoGarantia: string;
    condicoesEspeciais: string;
    status: string;
    iptu: number;
    dataPagamento: string;
    taxaAdm: number;
    dataRescisao?: string;
    renovado: boolean;
    dataEncerramentoRenovacao?: string;
    valorReajuste?: number;
  }

  interface Payment {
    pagamentoId: string;
    contratoId: string;
    valor: number;
    data: string;
    pagante: string;
    metodo_pagamento: string;
    descricao: string;
    tipo_pagamento: string;
    multa: number;
    valor_multa: number;
  }

  const [contract, setContract] = useState<Contract | null>(null);
  const [originalContract, setOriginalContract] = useState<Contract | null>(
    null
  );
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({});

  const fetchContract = async () => {
    try {
      const response = await axiosInstance.get(
        `property/Contratos/PegarContratoPorId/${id}`
      );

      console.log("Contrato:", response.data);
      setContract(response.data);
      setOriginalContract(response.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      showErrorToast("Erro ao se conectar com o servidor.");
    }
  };

  const fetchPayments = async () => {
    try {
      // Simulação de chamada de API
      const response = await axiosInstance.get(
        `property/Contratos/Pagamentos/${id}`
      );

      console.log("Pagamentos:", response.data);
      setPayments(response.data);

      setLoadingPayments(false);
    } catch (error) {
      console.error(error);
      showErrorToast("Erro ao carregar pagamentos.");
    }
  };

  useEffect(() => {
    // Mock de dados para teste de contrato
    const mockContract: Contract = {
      contratoId: "12345",
      documentos: ["contrato.pdf", "vistoria.pdf"],
      valorAluguel: 1500,
      dataInicio: "2024-01-05",
      dataEncerramento: "2024-12-31",
      locadorId: "locador_001",
      locatarioId: "locatario_001",
      imovelId: "imovel_001",
      tipoGarantia: "Fiador",
      condicoesEspeciais: "Nenhuma",
      status: "Ativo",
      iptu: 300,
      dataPagamento: "2024-01-05",
      taxaAdm: 100,
      renovado: false,
    };

    const mockPayments: Payment[] = [
      {
        pagamentoId: "pay_001",
        contratoId: "12345",
        valor: 1500,
        data: "2024-01-05",
        pagante: "João Silva",
        metodo_pagamento: "Cartão de Crédito",
        descricao: "Pagamento mensal",
        tipo_pagamento: "Mensalidade",
        multa: 0,
        valor_multa: 0,
      },
      {
        pagamentoId: "pay_002",
        contratoId: "12345",
        valor: 1500,
        data: "2024-02-05",
        pagante: "João Silva",
        metodo_pagamento: "Boleto",
        descricao: "Pagamento mensal",
        tipo_pagamento: "Mensalidade",
        multa: 50,
        valor_multa: 50,
      },
    ];

    // Simulando a captura da role do usuário
    setRole("admin");

    setContract(mockContract);
    setOriginalContract(mockContract);
    setPayments(mockPayments);

    // Quando esta página for devidamente integrada ao back:
    // fetchContract();
    // fetchPayments();

    setLoading(false);
    setLoadingPayments(false);
  }, []);

  // Condicional para verificar se o usuário pode editar os campos ou visualizar o formulário de pagamentos
  // É necessário ajustar isto para atender às regras de negócios.
  const isEditable = role === "admin"; // Supondo que só adm pode editar um contrato
  const canAddPayments = role === "admin" || role === "legal"; // Supondo que adm e o jurídico podem editar um contrato

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (contract) {
      const { name, value } = e.target;
      setContract({ ...contract, [name]: value });
    }
  };

  const handlePaymentChange = (
    field: keyof Payment,
    value: string | number
  ) => {
    setNewPayment({ ...newPayment, [field]: value });
  };

  const handleSave = () => {
    if (!contract) {
      showErrorToast("Contrato não carregado.");
      return;
    }

    if (!originalContract) {
      showErrorToast("Dados originais do contrato não disponíveis.");
      return;
    }

    // Verifica se houve mudanças
    const hasChanges = Object.keys(originalContract).some(
      (key) =>
        originalContract[key as keyof Contract] !==
        contract[key as keyof Contract]
    );

    if (!hasChanges) {
      showErrorToast("Nenhuma alteração foi feita.");
      return;
    }

    // Verifica se todos os campos obrigatórios estão preenchidos e válidos
    if (
      !contract.valorAluguel ||
      contract.valorAluguel <= 0 || // ValorAluguel precisa ser maior que zero
      !contract.dataEncerramento ||
      new Date(contract.dataEncerramento) <= new Date() || // Data de encerramento deve ser futura
      !contract.tipoGarantia.trim() // Tipo de garantia não pode ser vazio
    ) {
      showErrorToast("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    // Aqui deve ficar a chamada ao serviço para salvar as alterações

    showSuccessToast("Contrato atualizado com sucesso!");
    setOriginalContract(contract); // seta os dados que foram devidamente atualizados como os originais
    console.log("Salvar contrato:", contract);
  };

  const handleAddPayment = async () => {
    // Verifica se todos os campos obrigatórios estão preenchidos e válidos
    if (
      !newPayment.valor ||
      newPayment.valor <= 0 ||
      !newPayment.data ||
      new Date(newPayment.data) <= new Date() ||
      newPayment.pagante === undefined ||
      newPayment.pagante.trim() === "" ||
      newPayment.metodo_pagamento === undefined ||
      newPayment.metodo_pagamento.trim() === "" ||
      newPayment.tipo_pagamento === undefined ||
      newPayment.tipo_pagamento.trim() === ""
    ) {
      showErrorToast(
        "Preencha todos os campos obrigatórios do pagamento corretamente."
      );
      return;
    }

    try {
      // Simulação da chamada para adicionar o pagamento
      console.log("Adicionar pagamento:", newPayment);

      // Faça a chamada à API para adicionar o pagamento
      await axiosInstance.post(
        `property/Contratos/AdicionarPagamento`,
        newPayment
      );

      // Limpa o formulário de pagamento
      setNewPayment({});

      // Atualiza a lista de pagamentos
      await fetchPayments();
      showSuccessToast("Pagamento adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar pagamento:", error);
      showErrorToast("Erro ao adicionar pagamento.");
    }
  };

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />

        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="w-full max-w-5xl">
              <h1 className="text-title font-strong mb-2">
                Contrato: {contract?.contratoId}
              </h1>
              <form className="flex flex-col gap-5 border-2 border-neutral-500 p-4 rounded">
                {/* Valor do Aluguel */}
                <label className="flex flex-col">
                  <label htmlFor="rentalValue">Valor do Aluguel:</label>
                  <CurrencyInput
                    id="rentalValue"
                    name="valorAluguel"
                    placeholder="R$ 0,00"
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    decimalsLimit={2}
                    maxLength={9}
                    value={contract?.valorAluguel || ""}
                    onValueChange={(newValue) =>
                      setContract((prevContract) => {
                        if (!prevContract) {
                          return null; // Ou defina o comportamento desejado para o caso de prevContract ser null
                        }
                        return {
                          ...prevContract,
                          valorAluguel: parseFloat(newValue || "0"),
                        };
                      })
                    }
                    disabled={!isEditable}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  />
                </label>

                {/* Data de Início */}
                <label className="flex flex-col">
                  <label>Data de Início:</label>
                  <input
                    type="date"
                    name="dataInicio"
                    value={contract?.dataInicio || ""}
                    disabled={true}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  />
                </label>

                {/* Data de Encerramento */}
                <label className="flex flex-col">
                  <label htmlFor="dataEncerramento">
                    Data de Encerramento:
                  </label>
                  <input
                    id="dataEncerramento"
                    type="date"
                    name="dataEncerramento"
                    value={contract?.dataEncerramento || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  />
                </label>
                {/* Tipo de Garantia */}
                <label className="flex flex-col">
                  <label htmlFor="tipoGarantia">Tipo de Garantia:</label>
                  <input
                    id="tipoGarantia"
                    type="text"
                    name="tipoGarantia"
                    value={contract?.tipoGarantia || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  />
                </label>
                {/* Condições Especiais */}
                <label className="flex flex-col">
                  <label htmlFor="condicoesEspeciais">
                    Condições Especiais:
                  </label>
                  <input
                    id="condicoesEspeciais"
                    type="text"
                    name="condicoesEspeciais"
                    value={contract?.condicoesEspeciais || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  />
                </label>

                {/* Status */}
                <label className="flex flex-col">
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={contract?.status || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Encerrado">Encerrado</option>
                    <option value="Rescindido">Rescindido</option>
                    <option value="Renovado">Renovado</option>
                  </select>
                </label>

                {/* IPTU */}
                <label className="flex flex-col">
                  <label htmlFor="iptuValue">IPTU:</label>
                  <CurrencyInput
                    id="iptuValue"
                    name="iptu"
                    placeholder="R$ 0,00"
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    decimalsLimit={2}
                    maxLength={9}
                    value={contract?.iptu || ""}
                    onValueChange={(newValue) =>
                      setContract((prevContract) => {
                        if (!prevContract) {
                          return null; // Ou defina o comportamento desejado para o caso de prevContract ser null
                        }
                        return {
                          ...prevContract,
                          iptu: parseFloat(newValue || "0"),
                        };
                      })
                    }
                    disabled={!isEditable}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  />
                </label>

                {/* Data de Pagamento */}
                <label className="flex flex-col">
                  <label htmlFor="dataPagamento">Data de Pagamento:</label>
                  <input
                    id="dataPagamento"
                    type="date"
                    name="dataPagamento"
                    value={contract?.dataPagamento || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  />
                </label>

                {/* Taxa Administrativa */}
                <label className="flex flex-col">
                  <label htmlFor="adminFee">Taxa Administrativa:</label>
                  <CurrencyInput
                    id="adminFee"
                    name="taxaAdm"
                    placeholder="R$ 0,00"
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    decimalsLimit={2}
                    maxLength={9}
                    value={contract?.taxaAdm || ""}
                    onValueChange={(newValue) =>
                      setContract((prevContract) => {
                        if (!prevContract) {
                          return null;
                        }
                        return {
                          ...prevContract,
                          taxaAdm: parseFloat(newValue || "0"),
                        };
                      })
                    }
                    disabled={!isEditable}
                    className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                  />
                </label>
                {/* Botão Salvar Alterações */}
                {isEditable && (
                  <Botao label="Salvar Alterações" onClick={handleSave} />
                )}
              </form>

              {/* Exibição da lista de pagamentos */}
              <section className="mt-6">
                <h2 className="text-xl font-semibold">Pagamentos</h2>
                {loadingPayments ? (
                  <Loading type="spinner" />
                ) : payments.length === 0 ? (
                  <p className="text-neutral-500">
                    Nenhum pagamento registrado.
                  </p>
                ) : (
                  <ul className="list-disc list-inside">
                    {payments.map((payment) => (
                      <li key={payment.pagamentoId}>
                        <p>
                          <strong>ID:</strong> {payment.pagamentoId},{" "}
                          <strong>Valor:</strong> {payment.valor},{" "}
                          <strong>Data:</strong> {payment.data},{" "}
                          <strong>Pagante:</strong> {payment.pagante}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              {/* Texto para alternar o formulário de pagamento */}
              {canAddPayments && !showPaymentForm && (
                <p
                  className="mt-6 underline tracking-wide text-lg cursor-pointer hover:tracking-[.05em] duration-300 ease-in-out"
                  onClick={() => setShowPaymentForm((prev) => !prev)}
                >
                  Deseja adicionar pagamentos?
                </p>
              )}
              {/* Condicional para exibir o formulário de adição de pagamento */}
              {showPaymentForm && (
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
                        handlePaymentChange(
                          "valor",
                          parseFloat(newValue || "0")
                        )
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
                      onChange={(e) =>
                        handlePaymentChange("data", e.target.value)
                      }
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
                      onChange={(e) =>
                        handlePaymentChange("pagante", e.target.value)
                      }
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
                        handlePaymentChange(
                          "valor_multa",
                          parseFloat(newValue || "0")
                        )
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
                      onChange={(e) =>
                        handlePaymentChange("descricao", e.target.value)
                      }
                      className="w-full p-2 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm h-24 resize-none"
                      maxLength={350}
                    />
                  </div>
                  {/* Botão de Adicionar Pagamento */}
                  <Botao
                    label="Adicionar Pagamento"
                    onClick={handleAddPayment}
                  />
                </form>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
