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
  const [isEditable, setIsEditable] = useState(false); // Simulação da role do usuário
  const [payment, setPayment] = useState([]);
  const [originalpayment, setOriginalPayment] = useState([]); // mais tarde será usado para detectar se houve alguma mudança
  const [loadingSkeleton, setLoadingSkeleton] = useState(true); // estado para controlar o componente de carregamento do skeleton que é para quando os dados estão sendo trazidos
  const [loadingSpinner, setLoadingSpinner] = useState(false); // estado para controlar o componente de carregamento do tipo spinner para quando for feita alguma modificação

  const fetchPayment = async () => {
    setLoadingSkeleton(true);
    try {
      setLoadingSkeleton(false);
    } catch (error) {
      console.error(error);
      showErrorToast("Não foi possível carregar este pagamento");
    }
  };

  useEffect(() => {
    const mockPayment = {
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
    };

    setPayment(mockPayment);
    setOriginalPayment(mockPayment);

    // fetchPayment()
    setRole("admin"); // Simulando a captura da role do usuário
    // É necessário ajustar isto para atender às regras de negócios.
    setIsEditable(role === "admin"); // Supondo que só adm pode editar um pagamento
  }, []);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    setLoadingSpinner(true);

    // Verifica se houve mudanças
    const hasChanges = Object.keys(originalpayment).some(
      (key) => originalpayment[key as keyof payment] !== payment[key as keyof payment]
    );

    if (!hasChanges) {
      showErrorToast("Nenhuma alteração foi feita.");
      return;
    }

    // Verifica se todos os campos obrigatórios estão preenchidos e válidos
    if (true) {
      showErrorToast("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    // Aqui deve ficar a chamada ao serviço para salvar as alterações

    showSuccessToast("Pagamento atualizado com sucesso!");
    setOriginalPayment(payment); // seta os dados que foram devidamente atualizados como os originais
    console.log("Salvar pagamento:", payment);

    setLoadingSpinner(false);
  };

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />

        <h1>Pagamento {id}</h1>

        {loadingSkeleton ? (
          <Loading type="skeleton" />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <form className="w-full max-w-5xl">
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
