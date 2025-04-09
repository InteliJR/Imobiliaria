import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import { ContractForm } from "../../components/Form/ContractForm";
import PaymentForm from "../../components/Form/PaymentForm";
import Loading from "../../components/Loading";
import { showErrorToast, showSuccessToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { useAtom } from "jotai";
import { userRoleAtom } from "../../store/atoms";
import { Property, Lessor, Renter } from '../../types';
import { toast } from "react-toastify";

export interface Contract {
  dataReajuste?: any;
  contratoId?: string;
  documentos?: string[];
  valorAluguel?: number;
  dataInicio?: string;
  dataEncerramento?: string;
  locadorId?: string;
  locatarioId?: string;
  imovelId?: string;
  tipoGarantia?: string;
  condicoesEspeciais?: string;
  status?: any;
  iptu?: number;
  dataPagamento?: string;
  taxaAdm?: number;
  DataRescisao?: string;
  renovado?: boolean;
  DataEncerramentoRenovacao?: string;
  valorReajuste?: number;
}

export interface Payment {
  paymentId: string;
  contratoId: string;
  valor: number;
  data: string;
  pagante: string;
  MetodoPagamento: string;
  descricao: string;
  TipoPagamento: string;
  multa: boolean; // Alterado para boolean
  valor_multa: number;
}

function ContractView() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o ID do contrato pela URLe
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento
  const [loadingSpinner, setLoadingSpinner] = useState(false); // estado para controlar o componente de carregamento
  const [loadingPayments, setLoadingPayments] = useState(true); // estado para controlar o carregamento dos pagamentos
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Estado para controlar a visibilidade do formulário de adição de pagamentos
  // Estados relacionados à busca em outras tabelas
  const [isLoadingLessor, setIsLoadingLessor] = useState(false);
  const [isLoadingRenter, setIsLoadingRenter] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const [isLoadingPayers] = useState(false);
  const [payers] = useState([]); // Lista de pagantes
  const [lessors, setLessors] = useState<Lessor[]>([]);
  const [renters, setRenters] = useState<Renter[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedLessorId, setSelectedLessorId] = useState<string | null>(null);
  const [selectedRenterId, setSelectedRenterId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [canAddPayments, setCanAddPayments] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  // const userRole = localStorage.getItem("userRole");
  const [userRole] = useAtom(userRoleAtom);

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


  const fetchSelectOptions = async () => {
    try {
      setIsLoadingLessor(true);
      setIsLoadingRenter(true);
      setIsLoadingProperty(true);
      
      const [lessorResponse, renterResponse, propertyResponse] = await Promise.all([
        axiosInstance.get("auth/Locador/PegarTodosLocadores"),
        axiosInstance.get("auth/Locatario/PegarTodosLocatarios"),
        axiosInstance.get("property/Imoveis/PegarTodosImoveis")
      ]);

      // Extract the actual arrays from the API response structure
      const lessorsData = lessorResponse.data?.$values || [];
      const rentersData = renterResponse.data?.$values || [];
      const propertiesData = propertyResponse.data || [];

      // console.log('Lessors raw data:', JSON.stringify(lessorResponse.data, null, 2));
      // console.log('First lessor example:', JSON.stringify(lessorsData[0], null, 2));
      // console.log('Renters raw data:', JSON.stringify(renterResponse.data, null, 2));
      // console.log('First renter example:', JSON.stringify(rentersData[0], null, 2));

      setLessors(lessorsData);
      setRenters(rentersData);
      setProperties(propertiesData);

      // console.log('Lessors data:', lessorsData);
      // console.log('Renters data:', rentersData);
      // console.log('Properties data:', propertiesData);
    } catch (error) {
      console.error('Error fetching select options:', error);
      // showErrorToast("Erro ao carregar lessors, locatários e properties.");
      toast.error("Erro ao carregar lessors, locatários e properties.");
      // Set empty arrays on error
      setLessors([]);
      setRenters([]);
      setProperties([]);
    } finally {
      setIsLoadingLessor(false);
      setIsLoadingRenter(false);
      setIsLoadingProperty(false);
    }
  };

  const fetchContract = async (): Promise<Contract | null> => {
    try {
      const response = await axiosInstance.get(`property/Contratos/PegarContratoPorId/${id}`);
      // console.log("Contrato:", response.data);

      let contractData = response.data;
      // console.log("Contrato:", contractData);

      // Se 'documentos' for uma string, transformá-la em um array
      let allDocuments: string[] = [];
      if (typeof contractData.documentos === "string" && contractData.documentos.length > 0) {
        allDocuments = contractData.documentos.split(";").map((documento: string) =>
          decodeURIComponent(
            documento.replace("https://storage.googleapis.com/administradora-kk.appspot.com/", "")
          )
        );
      }

      allDocuments = allDocuments.map((documento) => {
        // Se conter o link da imobiliaria-kk, remove
        if (documento.startsWith("https://storage.googleapis.com/imobiliaria-kk.appspot.com/")) {
          return documento.replace(
            "https://storage.googleapis.com/imobiliaria-kk.appspot.com/",
            ""
          );
        } 
        // Se conter o link da administradora-kk, remove
        else if (documento.startsWith("https://storage.googleapis.com/administradora-kk.appspot.com/")) {
          return documento.replace(
            "https://storage.googleapis.com/administradora-kk.appspot.com/",
            ""
          );
        }
      
        return documento;
      });

      // console.log("Documentos:", allDocuments);
      


      if (allDocuments.length > 0) {
        try {
          const responseDocumentos = await axiosInstance.post(
            "property/Contratos/AssinarPdfs",
            allDocuments.map((doc: string) => 
              doc.replace("https://storage.googleapis.com/administradora-kk.appspot.com/", "")
            )
          );

          if (!responseDocumentos.data) {
            // console.log("Dados de resposta inválidos do endpoint de assinatura");
            throw new Error("Erro ao assinar documentos.");
          }

          // Atualizar o contrato com os documentos assinados
          contractData.documentos = responseDocumentos.data;
        } catch (error) {
          console.error("Erro ao assinar documentos:", error);
          showErrorToast("Erro ao assinar documentos.");
          return contractData;
        }
      }

      // Atualizar o estado com o contrato assinado
      setContract(contractData);

      // Define os valores iniciais dos selects
      setSelectedPropertyId(contractData.imovelId);
      setSelectedLessorId(contractData.locadorId);
      setSelectedRenterId(contractData.locatarioId);

      setLoading(false);
      return contractData;
    } catch (error) {
      console.error("Erro ao carregar contrato:", error);
      showErrorToast("Erro ao carregar contrato.");
    }
    return null;
  };

  const fetchPayments = async (imovelId: number) => {
    try {
      // Simulação de chamada de API
      const response = await axiosInstance.get(`payment/payment/ByImovel/${imovelId}`);
//payment/payment/criar-pagamentos
      // console.log("Pagamentos:", response.data);
      setPayments(response.data);

      setLoadingPayments(false);
    } catch (error) {
      console.error(error);
      // showErrorToast("Erro ao carregar pagamentos.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingPayments(true);
  
      try {
        // Primeiro, faça a requisição para os contratos e aguarde a resposta
        const contractData = await fetchContract();
        if (!contractData) {
         return;
        }
  
        // Após a requisição de contrato, faça a requisição de pagamentos
        if (contractData.imovelId) {
          await fetchPayments(Number(contractData.imovelId));
        } else {
          console.error("imovelId is undefined or invalid.");
        }
        
        // Se necessário, adicione outras requisições aqui
        await fetchSelectOptions();
  
      } catch (error) {
        console.error("Erro durante a requisição de dados:", error);
      } finally {
        setLoading(false);
        setLoadingPayments(false);
      }
    };
  
    // Verifique se userRole está definido para evitar chamadas desnecessárias
    if (userRole) {
      fetchData();
      setIsEditable(userRole === "Admin");
      setCanAddPayments(userRole === "Admin");
    }
  }, [userRole, contract?.imovelId]);  // Garanta que o contract ou imovelId mudem de forma controlada
  
  // Condicional para verificar se o usuário pode editar os campos ou visualizar o formulário de pagamentos
  // É necessário ajustar isto para atender às regras de negócios.

  const renderPaymentForm = () => {
    const canAddPayments = userRole === "Admin";
    if (canAddPayments) {
      return <PaymentForm
        newPayment={newPayment}
        setNewPayment={setNewPayment}
        handleAddPayment={handleAddPayment}
        setShowPaymentForm={setShowPaymentForm}
        payers={payers}
        isLoadingPayers={isLoadingPayers}
      />;
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (contract) {
      const { name, value } = e.target;
      setContract(prevContract => ({ ...prevContract, [name]: value }));
    }
  };
  
  const handleValueChange = (field: string, value: number | string | string[]) => {
    setContract(prevContract => ({ ...prevContract, [field]: value }));
  };
  

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!contract || !id) {
      showErrorToast("Contrato não encontrado.");
      return;
    }
  
    setLoadingSpinner(true);
  
    // Verifica se houve mudanças nos campos
    const updatedFields: Partial<Contract> = {};
    Object.keys(contract).forEach((key) => {
      const originalValue = originalContract?.[key as keyof Contract];
      const currentValue = contract[key as keyof Contract];
  
      const normalize = (value: any) => {
        if (typeof value === "string") return value.trim();
        if (typeof value === "number") return value;
        if (typeof value === "boolean") return value;
        return value;
      };
  
      // Compara os valores normalizados, considerando undefined como não alterado
      if (normalize(originalValue) !== normalize(currentValue)) {
        updatedFields[key as keyof Contract] = currentValue;
      }
    });
  
    // Verificação adicional para propriedades selecionadas
    if (selectedPropertyId !== originalContract?.imovelId) {
      updatedFields.imovelId = selectedPropertyId!;
    }
    if (selectedLessorId !== originalContract?.locadorId) {
      updatedFields.locadorId = selectedLessorId!;
    }
    if (selectedRenterId !== originalContract?.locatarioId) {
      updatedFields.locatarioId = selectedRenterId!;
    }
  
    if (Object.keys(updatedFields).length === 0) {
      showErrorToast("Nenhuma alteração foi feita.");
      setLoadingSpinner(false);
      return;
    }
  
    // Ajusta os campos dependendo do status
    if (contract.status === "Rescindido") {
      updatedFields.DataRescisao = contract.DataRescisao || new Date().toISOString().split("T")[0];
      delete updatedFields.DataEncerramentoRenovacao;
    } else if (contract.status === "Renovado") {
      updatedFields.DataEncerramentoRenovacao = contract.DataEncerramentoRenovacao || new Date().toISOString().split("T")[0];
      delete updatedFields.DataRescisao;
    } else {
      delete updatedFields.DataRescisao;
      delete updatedFields.DataEncerramentoRenovacao;
    }
  
    try {
      // Inclui o contratoId no objeto de atualização
      const updateData = {
        ...updatedFields,
        contratoId: parseInt(id)
      };

      await axiosInstance.put(`property/Contratos/AtualizarContrato/${id}`, updateData);
  
      // Atualiza o estado original com os novos dados
      setOriginalContract({ ...contract, ...updatedFields });
      toast.success("Contrato atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      toast.error("Erro ao atualizar o contrato.");
    } finally {
      setLoadingSpinner(false);
    }
  };
  
  

  const handleAddPayment = async () => {

    if (!newPayment.contratoId) {
      // Atribuir o contratoId se não estiver preenchido
      newPayment.contratoId = id; // ID do contrato da URL
    }

    setLoadingSpinner(true);

    // Verifica se todos os campos obrigatórios estão preenchidos e válidos
    const isInvalid =
      !newPayment.valor || // Valor deve ser maior que 0
      newPayment.valor <= 0 ||
      !newPayment.data || // Data deve ser preenchida e no futuro
      isNaN(new Date(newPayment.data).getTime()) || // Valida se é uma data válida
      !newPayment.pagante || // Pagante não pode ser vazio
      newPayment.pagante.trim() === "" ||
      !newPayment.MetodoPagamento || // Método de pagamento não pode ser vazio
      newPayment.MetodoPagamento.trim() === "" ||
      !newPayment.TipoPagamento || // Tipo de pagamento não pode ser vazio
      newPayment.TipoPagamento.trim() === "" ||
      (newPayment.TipoPagamento === "multa" && // Para tipo "multa", valor_multa deve ser maior que 0
        (!newPayment.valor_multa || newPayment.valor_multa <= 0));

    if (isInvalid) {
      showErrorToast("Preencha todos os campos obrigatórios do pagamento corretamente.");
      setLoadingSpinner(false);
      return;
    }

    try {
      // Realiza a requisição para adicionar o pagamento
      const response = await axiosInstance.post("payment/payment/criar-pagamentos", newPayment);
      if (response.status === 200) {
        showSuccessToast("Pagamento adicionado com sucesso!");
        setNewPayment({ data: getTodayDate() }); // Reseta o estado do novo pagamento
        console.log(response.data);
        // fetchPayments(); // Atualiza a lista de pagamentos
      }
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
                status={contract?.status || "defaultStatus"} // Forneça um valor padrão
                DataReajuste={contract?.dataReajuste || null} 
                // reajust={dataReajuste}
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
                          key={payment.paymentId}
                          className="mt-1 cursor-pointer hover:underline duration-300 ease-in-out"
                          onClick={() => handleRedirect(`/pagamento/${payment.paymentId}`)}
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
                renderPaymentForm()
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

export default ContractView;
