import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import Botao from "../../components/Botoes/Botao";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast, showSuccessToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig"; // Importe o axiosInstance
import { userRoleAtom } from "../../store/atoms";
import { useAtom } from "jotai";

interface Payment {
  paymentId: number;
  contratoId: number;
  valor: number;
  data: string;
  pagante: string;
  metodoPagamento: string;
  descricao: string;
  tipoPagamento: string;
  multa: boolean;
  valorMulta: number;
  iptu?: number;
  taxaCondominio?: number;
  valorAluguel?: number;
  taxaAdministrativa?: number;
}

interface Property {
  imovelId: number;
  tipoImovel: string;
  cep: string;
  condominio: number;
  valorImovel: number;
  bairro: string;
  endereco: string;
  descricao: string;
  complemento: string;
  taxa: number;
  fotos: string | string[];
}

export default function PagamentosImovel() {
  const { id } = useParams<{ id: string }>(); // Captura o imovelid da URL
  const [isEditable, setIsEditable] = useState(false); // Controla se o formulário é editável
  const [payments, setPayments] = useState<Payment[]>([]); // Lista de pagamentos
  const [loadingSkeleton, setLoadingSkeleton] = useState(true); // Loading inicial
  const [property, setProperty] = useState<Property | null>(null);
  const [imovelId, setImovelId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false); // Controla a abertura do modal
  const [loadingSpinner, setLoadingSpinner] = useState(false); // Loading durante salvamento
  const [role] = useAtom(userRoleAtom);

  const fetchPayments = async () => {
    setLoadingSkeleton(true);
    try {
      const imovelIdParsed = id ? parseInt(id, 10) : 0;
      const requestUrl =
        role === "Admin"
          ? `payment/payment/pagamentos/${imovelIdParsed}`
          : `payment/payment/ByImovel/${imovelIdParsed}`;

      const response = await axiosInstance.get(requestUrl);

      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      // Verifica o tipo de resposta e normaliza para um array
      const normalizedPayments = Array.isArray(response.data)
        ? response.data
        : [response.data];


      if(normalizedPayments.length === 0){
        showErrorToast("Nenhum pagamento encontrado.");
        return;
      }

      // Define os pagamentos retornados pela API
      setPayments(normalizedPayments);
      setImovelId(normalizedPayments[0].imovelId);
      console.log("Pagamentos recebidos:", normalizedPayments);
    } catch (error) {
      console.error(error);
      showErrorToast("Não foi possível carregar os pagamentos.");
    } finally {
      setLoadingSkeleton(false);
    }
  };

  const userRole = localStorage.getItem('userRole');

  const fetchPropertyDetails = async () => {
    try {
      let response;

      if (userRole == "Admin" || userRole == "Judiciario"){
        response = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorId/${imovelId}`
        );
      } 
      else{
        response = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorIdComVerificacao/${imovelId}`
        );
      }

      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      console.log(response.data);

      setProperty(response.data);
    }
    catch (error: any) {
      console.error(error);
      showErrorToast("Não foi possível carregar os detalhes do imóvel.");
    }
  };


  useEffect(() => {
    if (id) {
      fetchPayments();
      setIsEditable(role === "Admin");
    }
  }, [id]);
  
  useEffect(() => {
    if (imovelId !== 0) {
      fetchPropertyDetails();
    }
  }, [imovelId]);
  

  const handleSave = async (payment: Payment) => {
    setLoadingSpinner(true);

    try {
      // Simulação de uma requisição PUT para atualizar o pagamento
      await axiosInstance.put(
        `payment/payment/atualizar-pagamento/${payment.paymentId}`,
        payment
      );
      showSuccessToast("Pagamento atualizado com sucesso!");
      fetchPayments(); // Atualiza a lista de pagamentos após salvar
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
            <div className="flex flex-col gap-4 w-[42rem] m-auto">
              <h1 className="w-full font-bold text-lg">
                Pagamentos do Imóvel {imovelId}
              </h1>

              {payments.length > 0 ? (
                payments.map((payment) => (
                  <form
                    key={payment.paymentId}
                    className="w-full max-w-5xl flex flex-col gap-5 mb-8 p-4 border rounded-lg shadow-sm"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSave(payment);
                    }}
                  >
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
                          setPayments((prev) =>
                            prev.map((p) =>
                              p.paymentId === payment.paymentId
                                ? { ...p, valor: parseFloat(newValue || "0") }
                                : p
                            )
                          )
                        }
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="data">Data:</label>
                      <input
                        id="data"
                        type="date"
                        value={
                          payment.data
                            ? payment.data.split("T")[0] // Extrai apenas a parte da data
                            : ""
                        }
                        onChange={(e) =>
                          setPayments((prev) =>
                            prev.map((p) =>
                              p.paymentId === payment.paymentId
                                ? { ...p, data: e.target.value }
                                : p
                            )
                          )
                        }
                        className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                        required
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="pagante">Pagante:</label>
                      <input
                        id="pagante"
                        type="text"
                        value={payment.pagante || ""}
                        onChange={(e) =>
                          setPayments((prev) =>
                            prev.map((p) =>
                              p.paymentId === payment.paymentId
                                ? { ...p, pagante: e.target.value }
                                : p
                            )
                          )
                        }
                        className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                        required
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="metodoPagamento">
                        Método de Pagamento:
                      </label>
                      <select
                        id="metodoPagamento"
                        name="metodoPagamento"
                        value={payment.metodoPagamento || ""}
                        onChange={(e) =>
                          setPayments((prev) =>
                            prev.map((p) =>
                              p.paymentId === payment.paymentId
                                ? { ...p, metodoPagamento: e.target.value }
                                : p
                            )
                          )
                        }
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
                      <label htmlFor="tipoPagamento">Tipo de Pagamento:</label>
                      <select
                        id="tipoPagamento"
                        name="tipoPagamento"
                        value={payment.tipoPagamento || ""}
                        onChange={(e) =>
                          setPayments((prev) =>
                            prev.map((p) =>
                              p.paymentId === payment.paymentId
                                ? { ...p, tipoPagamento: e.target.value }
                                : p
                            )
                          )
                        }
                        className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                        required
                        disabled={!isEditable}
                      >
                        <option value="Mensalidade">Mensalidade</option>
                        <option value="Multa">Multa</option>
                        <option value="Reforma">Reforma</option>
                      </select>
                    </div>

                    {payment.tipoPagamento === "Multa" && (
                      <div className="flex flex-col">
                        <label htmlFor="valorMulta">Valor da Multa:</label>
                        <CurrencyInput
                          id="valorMulta"
                          name="valorMulta"
                          placeholder="R$ 0,00"
                          decimalSeparator=","
                          groupSeparator="."
                          prefix="R$ "
                          decimalsLimit={2}
                          maxLength={9}
                          className="w-full p-2 h-10 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm"
                          value={payment.valorMulta || ""}
                          onValueChange={(newValue) =>
                            setPayments((prev) =>
                              prev.map((p) =>
                                p.paymentId === payment.paymentId
                                  ? {
                                      ...p,
                                      valorMulta: parseFloat(newValue || "0"),
                                    }
                                  : p
                              )
                            )
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
                        onChange={(e) =>
                          setPayments((prev) =>
                            prev.map((p) =>
                              p.paymentId === payment.paymentId
                                ? { ...p, descricao: e.target.value }
                                : p
                            )
                          )
                        }
                        className="w-full p-2 border rounded-md focus:outline-none border-gray-300 focus:border-blue-500 tracking-wide text-neutral-700 font-light text-sm h-24 resize-none"
                        maxLength={350}
                        disabled={!isEditable}
                      />
                    </div>

                  <div className="mt-4 border rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full flex justify-between items-center p-4 bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200"
                    >
                      <span className="font-semibold text-left">Ver detalhes do pagamento</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="flex flex-col gap-2 bg-neutral-100 p-4">
                        <p>
                          <strong>Valor do Imóvel:</strong>{" "}
                          {property?.valorImovel?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p>

                        <p><strong>Multa:</strong> {payment.multa ? "Sim" : "Não"}</p>

                        <p>
                          <strong>Valor da Multa:</strong>{" "}
                          {payment.valorMulta?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p>

                        <p>
                          <strong>IPTU:</strong>{" "}
                          {payment.iptu?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p>

                        <p>
                          <strong>Taxa de Condomínio:</strong>{" "}
                          {property?.condominio?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p>

                        <p>
                          <strong>Valor do Aluguel:</strong>{" "}
                          {payment.valorAluguel?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p>

                        <p>
                          <strong>Taxa Administrativa:</strong>{" "}
                          {payment.taxaAdministrativa?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p>
                      </div>
                    )}
                  </div>


                    {/* Botão Salvar Alterações */}
                    {isEditable && (
                      <Botao
                        label="Salvar Alterações"
                        onClick={() => handleSave(payment)}
                      />
                    )}
                  </form>
                ))
              ) : (
                <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                  Nenhum pagamento encontrado.
                </p>
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
