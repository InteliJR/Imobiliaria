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
  taxaAdministratia?: number;
}

export default function PagamentosImovel() {
  const { imovelid } = useParams<{ imovelid: string }>(); // Captura o imovelid da URL
  const { paymentid } = useParams<{ paymentid: string }>();
  const [isEditable, setIsEditable] = useState(false); // Controla se o formulário é editável
  const [payments, setPayments] = useState<Payment[]>([]); // Lista de pagamentos
  const [loadingSkeleton, setLoadingSkeleton] = useState(true); // Loading inicial
  const [loadingSpinner, setLoadingSpinner] = useState(false); // Loading durante salvamento
  const [role] = useAtom(userRoleAtom);

  const fetchPayments = async () => {
    setLoadingSkeleton(true);
    try {
      const requestUrl =
        role === "Admin"
          ? `payment/payment/pagamentos/${paymentid}`
          : `payment/payment/ByImovel/${imovelid}`;

      const response = await axiosInstance.get(requestUrl);

      if (!response.data) {
        console.error("Dados de resposta inválidos");
        return;
      }

      // Verifica o tipo de resposta e normaliza para um array
      const normalizedPayments = Array.isArray(response.data)
        ? response.data
        : [response.data];

      // Define os pagamentos retornados pela API
      setPayments(normalizedPayments);
      console.log("Pagamentos recebidos:", normalizedPayments);
    } catch (error) {
      console.error(error);
      showErrorToast("Não foi possível carregar os pagamentos.");
    } finally {
      setLoadingSkeleton(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    setIsEditable(role === "Admin"); // Somente admin pode editar
  }, [imovelid]);

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
                Pagamentos do Imóvel {imovelid}
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

                    <div className="flex flex-col gap-2 bg-neutral-100 p-4 rounded-md mt-2">
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

                        {/* <p>
                          <strong>Taxa de Condomínio:</strong>{" "}
                          {payment.taxaCondominio?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p> */}

                        <p>
                          <strong>Valor do Aluguel:</strong>{" "}
                          {payment.valorAluguel?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p>

                        <p>
                          <strong>Taxa Administrativa:</strong>{" "}
                          {payment.taxaAdministratia?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) ?? "R$ 0,00"}
                        </p>
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
