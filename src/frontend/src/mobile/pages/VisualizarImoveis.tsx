import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Imoveis/Card";
import FormField from "../components/Form/FormField";
import FilterIcon from "/Filter.svg";
import Voltar from "../components/Voltar";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";

export default function Properties() {
  const [loading, setLoading] = useState(true); // estado para controlar o componente de carregamento

  const fetchProperties = () => {
    try {
      console.log("Traz os imóveis");

      // Requisição...
    } catch (error: any) {
      console.error(error);

      showErrorToast(
        error?.response?.data?.message || "Erro ao se conectar com o servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />
        <button
          type="submit"
          className="w-full h-10 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
        >
          Cadastrar Imóvel
        </button>
        <h2 className="text-2xl font-semibold">Imóveis</h2>
        <form className="grid grid-cols-1 gap-4">
          {/* Linha com FormField e botão Filtrar ocupando toda a largura */}
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
              <FormField
                label="Buscar imóvel"
                onChange={() => {}} // Função onChange vazia
                value={""}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
            >
              Filtrar
              {/* Ícone SVG importado */}
              <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>
        </form>
        {/* Cards */}
        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <section className="flex-grow flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">Resultados</h2>
            <div className="h-[1px] bg-black"></div>
            {Array.from({ length: 6 }).length === 0 ? ( // Substitua por uma verificação da sua fonte de dados
              <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                Nenhum usuário encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }, (_, index) => (
                  <Card
                    key={index}
                    title={`Imóvel ${index + 1}`}
                    line1="Lucas Matheus Nunes"
                    line2="Bubuntantã"
                    line3="07/01/2024 - Em aberto"
                    imageUrl="/imovel.png"
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
