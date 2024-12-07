import Navbar from "../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../components/Voltar";
import VisualizarItem from "../components/VisualizarItem";


export default function Chamado() {
 

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />

        <h1 className="text-title font-strong">Chamado: Cano de esgoto estou...</h1>

        <div className="relative flex flex-col gap-5 border-2 border-neutral-500 p-4 rounded">
          {/* Locatário */}
          <div>
            <h2 className="text-neutral-600">Locatário</h2>
            <p className="text-neutral-600">
              Nome: <span className="text-neutral-900">Jabesmar Feverêncio</span>
            </p>
            <p className="text-neutral-600">
              Contato: <span className="text-neutral-900">(12) 34567-8910</span>
            </p>
          </div>
          
          {/* Locador */}
          <div>
            <h2 className="text-neutral-600">Locador</h2>
            <p className="text-neutral-600">
              Nome: <span className="text-neutral-900">Giuseppe Osvaldo</span>
            </p>
            <p className="text-neutral-600">
              Contato: <span className="text-neutral-900">(12) 34567-8910</span>
            </p>
          </div>

          {/* Tipo de manutenção */}
          <VisualizarItem label="Tipo" informacao="Manuteção Corretiva" />

          {/* Endereço do Imóvel */}
          <VisualizarItem
            label="Imóvel"
            informacao="Rua dos Bobos, 154 - Lontra Nova"
          />

          {/* Data da solicitação do chamado */}
          <VisualizarItem label="Data da solicitação" informacao="25/09/2024" />

          {/* Período do chamado */}
          <div>
            <h2 className="text-neutral-600">Período</h2>
            <div className="flex flex-row gap-10">
              <p className="text-neutral-600">
                Início <span className="text-neutral-900">21/05/2020</span>
              </p>
              <p className="text-neutral-600">
                Fim <span className="text-neutral-900">21/05/2020</span>
              </p>
            </div>
          </div>

          {/* Descrição do chamado */}
          <div>
            <h2 className="text-neutral-600">Descrição</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>

          {/* Status do chamado */}
          <p className="absolute top-1 right-2 text-neutral-600 italic">Aberto</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
