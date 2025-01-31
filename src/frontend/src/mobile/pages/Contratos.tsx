import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Card from "../../components/CardContratos";
import FormFieldFilter from "../components/Form/FormFieldFilter";
import FilterIcon from "/Filter.svg";
import Voltar from "../../components/Botoes/Voltar";
import Botao from "../../components/Botoes/Botao";
import Loading from "../../components/Loading";
import { showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import { AxiosError } from "axios";
import { GenericFilterModal } from "../../components/Filter/Filter";
import { IFilterField } from "../../components/Filter/InputsInterfaces";
import { IContract } from "../../components/Filter/ConstractInterface";


interface Contrato {
  contratoId: string;
  documentos: string[];
  valorAluguel: number;
  dataEncerramento: string;
  locadorId: string;
  locatarioId: string;
  imovelId: string;
  tipoGarantia: string;
  condicoesEspeciais: string;
  status: string;
  iptu: number;
  dataPagamento: string;
  taxaAdm: number;
  dataRescisao?: string;
  renovado: boolean;
  dataEncerramentoRenovacao?: string;
  valorReajuste?: number;
}

export default function Contratos() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [advancedFiltered, setAdvancedFiltered] = useState<any[]>([]);

  // Busca textual
  const [search, setSearch] = useState("");
  // Controle do modal
  const [isModalOpen, setModalOpen] = useState(false);

  const ContractFilterFields: IFilterField<IContract>[] = [
    {
      name: "locadorId",
      label: "Locador",
      type: "text",
      property: "locadorId",
    },
    {
      name: "locatarioId",
      label: "Locatário",
      type: "text",
      property: "locatarioId",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      property: "status",
      options: ["Ativo", "Inativo"],
    },
    {
      name: "dataEncerramento",
      label: "Data de Encerramento",
      type: "dateRange",
      property: "dataEncerramento",
    },
    {
      name: "imovelId",
      label: "Imóvel",
      type: "text",
      property: "imovelId",
    },
    {
      name: "iptu",
      label: "IPTU",
      type: "numberRange",
      property: "iptu",
    },
    {
      name: "valorAluguel",
      label: "Valor do Aluguel",
      type: "numberRange",
      property: "valorAluguel",
    },
  ];


  const fetchContratos = async () => {
    try {
      setLoading(true); // Inicia o estado de carregamento
      const response = await axiosInstance.get("property/Contratos/PegarTodosOsContratos");
  
      if (response.data) {
        // Transformar o contratoId em número
        response.data.forEach((contrato: any) => {
          contrato.contratoId = Number(contrato.contratoId);
        });
        setContratos(response.data); // Atualiza o estado com os contratos recebidoos
        setFilteredData(response.data); // Atualiza o estado de contratos filtrados
        setData(response.data); // Atualiza o estado de dados
        setAdvancedFiltered(response.data); // Atualiza o estado de contratos filtrados avançados
      } else {
        setContratos([]); // Garante que contratos seja uma lista vazia se não houver dados
      }
  
      setLoading(false); // Finaliza o estado de carregamento
    } catch (error) {
      console.error(error);
  
      if (error instanceof AxiosError) {
        showErrorToast(
          error.response?.data?.message || "Erro ao se conectar com o servidor."
        );
      } else {
        showErrorToast("Erro ao se conectar com o servidor.");
      }
  
      setLoading(false); // Finaliza o estado de carregamento em caso de erro
    }
  };

  useEffect(() => {
    // Se search estiver vazio, "filteredData" = "advancedFiltered"
    if (!search.trim()) {
      setFilteredData(advancedFiltered);
      return;
    }
  
    const searchAsNumber = Number(search);
  
    const finalResult = advancedFiltered.filter((contract: IContract) => {
      return contract.contratoId === searchAsNumber;
    });
  
    setFilteredData(finalResult);
    // console.log("Final result:", finalResult);
  }, [search, advancedFiltered]);


  // Abrir modal
  const openFilterModal = () => {
    setModalOpen(true);
  };

  // Callback do modal que ao clicar em "Buscar" já recebemos a array filtrada
  const handleFilteredResult = (resultado: any[]) => {
    // Esse "resultado" já está filtrado pelos campos avançados
    setAdvancedFiltered(resultado);
  };
  
  useEffect(() => {
    fetchContratos();
  }, []);

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />
        <Botao 
          label="Cadastrar Contrato" 
          onClick={() => navigate("/contratos/criar")} 
        />
        <h2 className="text-2xl font-semibold">Contratos</h2>
        <form
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex w-full gap-2 items-end">
            <div className="w-full">
            <FormFieldFilter
              label="Buscar chamado pelo título"
              onFilter={(searchTerm) => {
                setSearch(searchTerm);
              }}
            />
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
              onClick={openFilterModal}
            >
              Filtrar
              <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>
        </form>

        <GenericFilterModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          fields={ContractFilterFields}
          data={data}
          onFilteredResult={handleFilteredResult}
        />


        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <section className="flex-grow flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">Resultados</h2>
            <div className="h-[1px] bg-black"></div>
            {contratos.length === 0 ? (
              <p className="text-center text-lg text-neutral-500 mt-8 font-bold">
                Nenhum contrato encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((contrato) => (
                  <Card
                    key={contrato.contratoId}
                    id={contrato.contratoId}
                    title={contrato.contratoId}
                    locador={contrato.locadorId}
                    locatario={contrato.locatarioId}
                    status={contrato.status}
                    encerramento={contrato.dataEncerramento}
                    reajuste={contrato.DataReajuste ?? "data não disponível"}
                    location={contrato.imovelId}
                    iptu={contrato.iptu.toFixed(2)}
                    aluguel={contrato.valorAluguel.toFixed(2)}
                  />
                ))}
              </div>
            )}

          coco
          </section>
        )}
      </section>

      <Footer />
    </main>
  );
}
