import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import { ContractForm } from "../../components/Form/ContractForm";
import PaymentForm from "../../components/Form/PaymentForm";
import Loading from "../../components/Loading";
import { showErrorToast, showSuccessToast } from "../../utils/toastMessage";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";

export interface Contract {
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

export interface Payment {
  pagamentoId: string;
  contratoId: string;
  valor: number;
  data: string;
  pagante: string;
  metodo_pagamento: string;
  descricao: string;
  tipo_pagamento: string;
  multa: boolean; // Alterado para boolean
  valor_multa: number;
}

export default function Contrato() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o ID do contrato pela URL
  const [role, setRole] = useState("admin"); // Simulação da role do usuário
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento
  const [loadingSpinner, setLoadingSpinner] = useState(false); // estado para controlar o componente de carregamento
  const [loadingPayments, setLoadingPayments] = useState(true); // estado para controlar o carregamento dos pagamentos
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Estado para controlar a visibilidade do formulário de adição de pagamentos

  // Função para obter a data de hoje
  const getTodayDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Formato aaaa-mm-dd
  };

  const [contract, setContract] = useState<Contract | null>(null);
  const [originalContract, setOriginalContract] = useState<Contract | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    data: getTodayDate(), // Inicializa com a data de hoje
  });

  // Estados relacionados à busca em outras tabelas
  const [isLoadingLessor, setIsLoadingLessor] = useState(false);
  const [isLoadingRenter, setIsLoadingRenter] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const [isLoadingPayers, setIsLoadingPayers] = useState(false);
  const [payers, setPayers] = useState([]); // Lista de pagantes
  const [lessors, setLessors] = useState([]); // Lista de lessors
  const [renters, setRenters] = useState([]); // Lista de locatários
  const [properties, setProperties] = useState([]);
  const [selectedLessorId, setSelectedLessorId] = useState<string | null>(null);
  const [selectedRenterId, setSelectedRenterId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const fetchContract = async () => {
    try {
      const response = await axiosInstance.get(`property/Contratos/PegarContratoPorId/${id}`);

      console.log("Contrato:", response.data);
      setContract(response.data);
      setOriginalContract(response.data);

      // Define os valores iniciais dos selects
      setSelectedPropertyId(response.data.imovelId);
      setSelectedLessorId(response.data.locadorId);
      setSelectedRenterId(response.data.locatarioId);

      setLoading(false);
    } catch (error) {
      console.error(error);
      showErrorToast("Erro ao se conectar com o servidor.");
    }
  };

  const fetchPayments = async () => {
    try {
      // Simulação de chamada de API
      const response = await axiosInstance.get(`property/Contratos/Pagamentos/${id}`);

      console.log("Pagamentos:", response.data);
      setPayments(response.data);

      setLoadingPayments(false);
    } catch (error) {
      console.error(error);
      showErrorToast("Erro ao carregar pagamentos.");
    }
  };

  const fetchSelectOptions = async () => {
    try {
      setIsLoadingLessor(true);
      setIsLoadingRenter(true);
      setIsLoadingProperty(true);
      const lessorsResponse = await axiosInstance.get("auth/Lessor/PegarTodosLessors");
      const rentersResponse = await axiosInstance.get("auth/Renter/PegarTodosRenters");
      const propertiesResponse = await axiosInstance.get(
        "property/Properties/PegarTodosProperties"
      );
      setLessors(lessorsResponse.data || []);
      setRenters(rentersResponse.data || []);
      setProperties(propertiesResponse.data || []);
      console.log(lessorsResponse.data, rentersResponse.data, propertiesResponse.data);
    } catch (error) {
      showErrorToast("Erro ao carregar lessors, locatários e properties.");
    } finally {
      setIsLoadingLessor(false);
      setIsLoadingRenter(false);
      setIsLoadingProperty(false);
    }
  };

  // Carrega os pagantes para as options do formulário de adição de pagamentos
  const fetchPayers = async () => {
    try {
      setIsLoadingPayers(true);
      const response = await axiosInstance.get("auth/Payers/PegarTodosPayers"); // Endpoint hipotético
      setPayers(response.data || []);
      console.log("Pagantes:", response.data);
    } catch (error) {
      showErrorToast("Erro ao carregar pagantes.");
    } finally {
      setIsLoadingPayers(false);
    }
  };

  useEffect(() => {
    // Mock de dados para teste de contrato
    const mockContract: Contract = {
      contratoId: "12345",
      documentos: [
        "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
        "urlInvalida",
      ],
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
        multa: false,
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
        multa: true,
        valor_multa: 50,
      },
    ];

    // Quando esta página for devidamente integrada ao back:
    // fetchContract();
    // fetchPayments();
    // fetchSelectOptions(); // busca imóveis, lessors e locatários para dispor nos campos de select
    // fetchPayers(); // Chamada à API para carregar os pagantes

    // Simulando a captura da role do usuário
    setRole("admin");

    setContract(mockContract);
    setOriginalContract(mockContract);
    setPayments(mockPayments);

    // Define os valores iniciais dos selects
    setSelectedPropertyId(mockContract.imovelId);
    setSelectedLessorId(mockContract.locadorId);
    setSelectedRenterId(mockContract.locatarioId);

    setLoading(false);
    setLoadingPayments(false);
  }, []);

  // Condicional para verificar se o usuário pode editar os campos ou visualizar o formulário de pagamentos
  // É necessário ajustar isto para atender às regras de negócios.
  const isEditable = role === "admin"; // Supondo que só adm pode editar um contrato
  const canAddPayments = role === "admin" || role === "legal"; // Supondo que adm e o jurídico podem editar um contrato

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (contract) {
      const { name, value } = e.target;
      setContract({ ...contract, [name]: value });
    }
  };

  const handleValueChange = (field: string, value: number | string | string[]) => {
    if (contract) {
      setContract({ ...contract, [field]: value });
    }
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!contract) {
      showErrorToast("Contrato não encontrado.");
      return;
    }
  
    setLoadingSpinner(true);
  
    // Verifica se houve mudanças
    const hasChanges = Object.keys(originalContract || {}).some(
      (key) => originalContract![key as keyof Contract] !== contract[key as keyof Contract]
    );
  
    if (!hasChanges) {
      showErrorToast("Nenhuma alteração foi feita.");
      setLoadingSpinner(false);
      return;
    }
  
    // Verifica se todos os campos obrigatórios estão preenchidos e válidos
    if (
      !contract.valorAluguel ||
      contract.valorAluguel <= 0 || // Valor do aluguel precisa ser maior que zero
      !contract.dataEncerramento ||
      new Date(contract.dataEncerramento) <= new Date() || // Data de encerramento deve ser futura
      !contract.tipoGarantia.trim() || // Tipo de garantia não pode ser vazio
      !contract.iptu ||
      contract.iptu <= 0 || // IPTU deve ser positivo
      !contract.taxaAdm ||
      contract.taxaAdm <= 0 || // Taxa administrativa deve ser positiva
      !contract.dataPagamento || // Data de pagamento deve estar preenchida
      !selectedPropertyId?.trim() || // Um imóvel precisa ser selecionado
      !selectedLessorId?.trim() || // Um locador precisa ser selecionado
      !selectedRenterId?.trim() // Um locatário precisa ser selecionado
    ) {
      showErrorToast("Preencha todos os campos obrigatórios corretamente.");
      setLoadingSpinner(false);
      return;
    }
  
    // Ajusta os campos dependendo do status
    const updatedContract = { ...contract };
  
    if (updatedContract.status === "Rescindido") {
      updatedContract.dataRescisao = updatedContract.dataRescisao || new Date().toISOString().split("T")[0];
      delete updatedContract.dataEncerramentoRenovacao;
    } else if (updatedContract.status === "Renovado") {
      updatedContract.dataEncerramentoRenovacao =
        updatedContract.dataEncerramentoRenovacao || new Date().toISOString().split("T")[0];
      delete updatedContract.dataRescisao;
    } else {
      delete updatedContract.dataRescisao;
      delete updatedContract.dataEncerramentoRenovacao;
    }
  
    // Aqui deve ficar a chamada ao serviço para salvar as alterações
    showSuccessToast("Contrato atualizado com sucesso!");
    setOriginalContract(updatedContract); // Seta os dados que foram devidamente atualizados como os originais
    console.log("Salvar contrato:", updatedContract);
    setLoadingSpinner(false);
  };
  

  const handleAddPayment = async () => {
    setLoadingSpinner(true);

    // Verifica se todos os campos obrigatórios estão preenchidos e válidos
    const isInvalid =
      !newPayment.valor || // Valor deve ser maior que 0
      newPayment.valor <= 0 ||
      !newPayment.data || // Data deve ser preenchida e no futuro
      isNaN(new Date(newPayment.data).getTime()) || // Valida se é uma data válida
      !newPayment.pagante || // Pagante não pode ser vazio
      newPayment.pagante.trim() === "" ||
      !newPayment.metodo_pagamento || // Método de pagamento não pode ser vazio
      newPayment.metodo_pagamento.trim() === "" ||
      !newPayment.tipo_pagamento || // Tipo de pagamento não pode ser vazio
      newPayment.tipo_pagamento.trim() === "" ||
      (newPayment.tipo_pagamento === "multa" && // Para tipo "multa", valor_multa deve ser maior que 0
        (!newPayment.valor_multa || newPayment.valor_multa <= 0));

    if (isInvalid) {
      showErrorToast("Preencha todos os campos obrigatórios do pagamento corretamente.");
      setLoadingSpinner(false);
      return;
    }

    try {
      // Simulação da chamada para adicionar o pagamento
      console.log("Adicionar pagamento:", newPayment);

      // Faça a chamada à API para adicionar o pagamento
      await axiosInstance.post(`property/Contratos/AdicionarPagamento`, newPayment);

      // Limpa o formulário de pagamento
      setNewPayment({});

      // Atualiza a lista de pagamentos
      await fetchPayments();
      showSuccessToast("Pagamento adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar pagamento:", error);
      showErrorToast("Erro ao adicionar pagamento.");
    } finally {
      setLoadingSpinner(false);
    }
  };

  const handleRedirect = (url: string) => navigate(url);

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
              <ContractForm
                contract={contract}
                isEditable={isEditable}
                properties={properties}
                lessors={lessors}
                renters={renters}
                selectedPropertyId={selectedPropertyId}
                selectedLessorId={selectedLessorId}
                selectedRenterId={selectedRenterId}
                isLoadingProperty={isLoadingProperty}
                isLoadingLessor={isLoadingLessor}
                isLoadingRenter={isLoadingRenter}
                onInputChange={handleInputChange}
                onValueChange={handleValueChange}
                setSelectedPropertyId={setSelectedPropertyId}
                setSelectedLessorId={setSelectedLessorId}
                setSelectedRenterId={setSelectedRenterId}
                handleSave={handleSave}
              />

              {/* Exibição da lista de pagamentos */}
              <section className="mt-6">
                <h2 className="text-xl font-semibold">Pagamentos</h2>
                {loadingPayments ? (
                  <Loading type="spinner" />
                ) : payments.length === 0 ? (
                  <p className="text-neutral-500">Nenhum pagamento ainda.</p>
                ) : (
                  <ul
                    className="list-disc list-inside overflow-y-auto"
                    style={{ maxHeight: "300px" /* Define a altura máxima do container */ }}
                  >
                    {payments
                      .slice() // Cria uma cópia do array para evitar mutações no original
                      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()) // Ordena as datas do mais recente para o mais antigo
                      .map((payment) => (
                        <li
                          key={payment.pagamentoId}
                          className="mt-1 cursor-pointer hover:underline duration-300 ease-in-out"
                          onClick={() => handleRedirect(`/pagamento/${payment.pagamentoId}`)}
                        >
                          <p className="inline">
                            <strong>Valor: R$</strong> {payment.valor}, <strong>Data:</strong>{" "}
                            {payment.data}, <strong>Pagante:</strong> {payment.pagante}
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
                <PaymentForm
                  newPayment={newPayment}
                  setNewPayment={setNewPayment}
                  handleAddPayment={handleAddPayment}
                  setShowPaymentForm={setShowPaymentForm}
                  payers={payers}
                  isLoadingPayers={isLoadingPayers}
                />
              )}
            </div>
          </div>
        )}
      </section>

      {loadingSpinner && <Loading type="spinner" />}
      <Footer />
    </main>
  );
}
