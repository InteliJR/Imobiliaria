import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { ContractForm } from "../../components/Form/ContractForm"; // Importando o componente
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import type { Contract, Payment } from "../../types/contract";

export default function Contrato() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [contract, setContract] = useState<Contract | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Estados para propriedades, locadores e locatários (caso sejam necessários)
  const [properties] = useState([]);
  const [lessors] = useState([]);
  const [renters] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [selectedLessorId, setSelectedLessorId] = useState("");
  const [selectedRenterId, setSelectedRenterId] = useState("");
  const [isLoadingProperty  ] = useState(false);
  const [isLoadingLessor] = useState(false);
  const [isLoadingRenter] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        console.log("🔄 Buscando contrato para o imóvel ID:", id);
        const response = await axiosInstance.get(`property/Contratos/PegarContratoPorImovelIdComVerificacao/${id}`);
        const contractData = response.data;
        let allDocuments = [];
        if (typeof contractData.documentos === "string" && contractData.documentos.length > 0) {
          allDocuments = contractData.documentos.split(",").map((documento: string) =>
            decodeURIComponent(
              documento.replace("https://storage.googleapis.com/administradora-kk.appspot.com/", "")
            )
          );
        }
  
        // console.log("Este é o valor de allDocuments: ", allDocuments)
  
        if (allDocuments.length > 0) {
          try {
            const responseDocumentos = await axiosInstance.post(
              "property/Contratos/AssinarPdfs",
              allDocuments
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
            return;
          }
        }
  
        // Atualizar o estado com o contrato assinado
        setContract(contractData);
        console.log("✅ Resposta do backend (contrato):", response.data);
        setSelectedPropertyId(contractData.imovelId);
        setSelectedLessorId(contractData.locadorId);
        setSelectedRenterId(contractData.locatarioId);

        if (!response.data) {
          throw new Error("Nenhum contrato encontrado para o imóvel especificado.");
        }

        console.log("📌 Contrato armazenado no estado:", response.data);
        setLoading(false);
      } catch (error: any) {
        console.error("❌ Erro ao carregar contrato:", error.response ? error.response.data : error.message);
        showErrorToast("Erro ao carregar contrato.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPayments = async () => {
      try {
        console.log("🔄 Buscando pagamentos para o imóvel ID:", id);
        const response = await axiosInstance.get(`payment/payment/ByImovel/${id}`);

        console.log("✅ Resposta do backend (pagamentos):", response.data);
        setPayments(response.data);
      } catch (error: any) {
        console.error("❌ Erro ao carregar pagamentos:", error.response ? error.response.data : error.message);
      } finally {
        setLoadingPayments(false);
      }
    };

    if (id) {
      fetchContract();
      fetchPayments();
    } else {
      console.error("❌ ID do imóvel não encontrado.");
    }
  }, [id]);

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
                isEditable={false}
                properties={properties}              
                selectedPropertyId={selectedPropertyId}
                lessors={lessors}
                renters={renters}
                selectedLessorId={selectedLessorId}
                selectedRenterId={selectedRenterId}
                isLoadingProperty={isLoadingProperty}
                isLoadingLessor={isLoadingLessor}
                isLoadingRenter={isLoadingRenter}
                status={contract?.status || "defaultStatus"}
                DataReajuste={contract?.dataReajuste || null}
                onInputChange={(e) => console.log("Input alterado:", e.target.value)}
                onValueChange={(value) => console.log("Valor alterado:", value)}
                handleSave={() => console.log("Salvar contrato")}
              />

              <section className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Pagamentos</h2>
                {loadingPayments ? (
                  <Loading type="spinner" />
                ) : payments.length === 0 ? (
                  <p className="text-neutral-500">Nenhum pagamento ainda.</p>
                ) : (
                  <ul className="list-disc list-inside overflow-y-auto" style={{ maxHeight: "300px" }}>
                    {payments
                      .slice()
                      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                      .map((payment) => (
                        <li key={payment.paymentId} className="mt-1">
                          <p className="inline">
                            <strong>Valor: R$</strong> {payment.valor}, <strong>Data:</strong> {payment.data}, <strong>Pagante:</strong> {payment.pagante}
                          </p>
                        </li>
                      ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
