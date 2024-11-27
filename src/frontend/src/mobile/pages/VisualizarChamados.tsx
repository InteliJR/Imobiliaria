import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../components/Chamados/Card";
import FormField from "../components/Form/FormField";
import FilterIcon from "/Filter.svg";
import Voltar from "../components/Voltar";

export default function MainPage() {
  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 min-h-screen">
      <Navbar />
      <main className="px-4 gap-y-5 mt-4 flex flex-col">
        <Voltar />
        <button
          type="submit"
          className="w-full h-10 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
        >
          Abrir chamado
        </button>

        {/* Formulário */}
        <section className="flex flex-col gap-y-5">
          <h2 className="text-2xl font-semibold">Chamados</h2>
          <form className="grid grid-cols-1 gap-4">
            {/* Linha com FormField e botão Filtrar ocupando toda a largura */}
            <div className="flex w-full gap-2 items-end">
              <div className="w-full">
                <FormField label="Buscar chamado" onChange={() => {}} />
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
        </section>

        {/* Cards */}
        <section className="flex-grow flex flex-col gap-y-5">
          <h2 className="text-2xl font-semibold">Resultados</h2>
          <div className="h-[1px] bg-black"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, index) => {
              const status: "Aberto" | "Fechado" =
                index % 2 === 0 ? "Aberto" : "Fechado";
              return (
                <Card
                  key={index}
                  id={index + 1} // Adiciona o id para cada chamado
                  title={`Chamado ${index + 1}`}
                  line1="Lucas Matheus Nunes"
                  line2="Bubuntantã"
                  line3="07/01/2024"
                  status={status}
                />
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
