import ProblemCard from "../components/CardChamado";
import FormField from "../../mobile/components/Form/FormField";
import FilterIcon from "/Filter.svg";

export default function ChamadosComponent() {
  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-neutral-800">Chamados</h2>
        <button
          type="button"
          className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
        >
          Abrir Chamado
        </button>
      </div>

      {/* Formulário */}
      <form className="flex items-end gap-4 mb-6">
        <div className="flex-grow">
          <FormField label="Buscar chamado" onChange={() => {}} />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center hover:bg-neutral-800 gap-2 px-6 h-10 bg-[#1F1E1C] text-neutral-50 text-sm font-medium rounded"
        >
          Filtrar
          <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
        </button>
      </form>

      {/* Cards */}
      <section className="flex flex-col gap-y-5">
        <h2 className="text-2xl font-semibold">Resultados</h2>
        <div className="h-[1px] bg-neutral-400 mb-4"></div>
        <div className="flex flex-col gap-6">
          {Array.from({ length: 6 }, (_, index) => {
            const date = "24/10/2024";
            const time = `19:${20 + index}h`;
            const creator = index % 2 === 0 ? "Thiago Gomes" : "Lucas Matheus Nunes";
            const contact = index % 2 === 0 ? "(11) 92162-9135" : "(11) 98765-4321";
            const description =
              "Estou enfrentando um problema de infiltração no apartamento, especificamente na parede da sala que faz divisa com o banheiro do vizinho. Percebi que a parede está ficando úmida, e a pintura começou a descascar. Em dias mais úmidos, o mofo tem se espalhado rapidamente e já começa a exalar um cheiro forte.";

            return (
              <ProblemCard
                key={index}
                id={index + 1}
                title={`Problema de infiltração no apartamento ${index + 1}`}
                creator={creator}
                contact={contact}
                description={description}
                date={date}
                time={time}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
