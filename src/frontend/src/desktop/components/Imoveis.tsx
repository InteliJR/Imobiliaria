import Card from "./CardImovel";
import FormField from "../../mobile/components/Form/FormField";
import FilterIcon from "/Filter.svg";

export default function ChamadosComponent() {
  return (
    <div className="flex flex-col bg-[#F0F0F0] gap-y-5 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-neutral-800">Imóveis</h2>
        <button
          type="button"
          className="h-10 px-6 bg-[#1F1E1C] hover:bg-neutral-800 text-neutral-50 text-sm font-medium rounded"
        >
          Adicionar
        </button>
      </div>

      {/* Formulário */}
      <form className="flex items-end gap-4 mb-6">
        <div className="flex-grow">
          <FormField label="Buscar imóvel" onChange={() => {}} />
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
            // Alternate tenant data to showcase variation
            const tenant = index % 2 === 0 ? "Lucas Matheus Nunes" : null;

            return (
              <Card
                key={index}
                id={index + 1}
                address={`Rua Davi, ${273 + index}`}
                neighborhood="Jardim Palmares"
                postalCode="02328-161"
                propertyType="Sobrado"
                landlord="Lucas Matheus Nunes"
                tenant={tenant}
                imageSrc={`/imovel.png`} // Adjust based on available images
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
