import { useState, useEffect } from "react";
import FormField from "../components/Form/FormField";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Loading from "../../components/Loading";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import getTokenData from "../../services/tokenConfig";
import axios from "axios";
import { userAtom } from "../../store/atoms";
import { useAtom } from "jotai";

export default function CreateTicket() {
  const [property, setProperty] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [houseNames, setHouseNames] = useState("");
  const [loading, setLoading] = useState(false); // estado para controlar o componente de carregamento
  const [userData] = useAtom(userAtom);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar campos obrigatórios
    if (!property || !title || !description) {
      showErrorToast("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const tokenData = getTokenData();

      console.log(tokenData.UserID);

      const data = {
        idImovel: parseInt(property),
        titulo: title,
        solicitanteId: parseInt(tokenData.UserID),
        dataSolicitacao: new Date().toISOString(),
        descricao: description,
        tipoChamado: ticketType,
      };

      const response = await axiosInstance.post(
        "property/Chamados/CriarUmNovoChamado",
        data
      );

      console.log(response.data);

      // Limpa o formulário
      setProperty("");
      setTicketType("");
      setTitle("");
      setDescription("");
      setHouseNames("");

      showSuccessToast("Chamado aberto com sucesso!");
    } catch (error: any) {
      console.error("Error creating ticket:", error);

      if (axios.isAxiosError(error)) {
        // Erro com resposta do servidor (ex: 400, 500)
        if (error.response) {
          const errorPayload = error.response.data; // Captura o payload de resposta
          const errorMessage = errorPayload.message || "Erro ao processar a requisição.";
          showErrorToast(errorMessage);

          // Log detalhado do payload de erro
          console.error("Payload de erro:", errorPayload);
        }
        // Erro de rede (ex: servidor indisponível)
        else if (error.request) {
          showErrorToast("Erro de rede. Verifique sua conexão e tente novamente.");
        }
        // Erro inesperado
        else {
          showErrorToast("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
      }
      // Erro genérico (não relacionado ao Axios)
      else if (error instanceof Error) {
        showErrorToast(error.message);
      }
      // Erro desconhecido
      else {
        showErrorToast("Erro ao se conectar com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  const allHousesNames = async () => {
    try {
      let imoveisResponse;
  
      // Verifica o papel do usuário para decidir qual endpoint chamar
      if (userData?.role === "Locatario") {
        // Se o usuário for um Locatário, busca apenas os imóveis associados a ele
        imoveisResponse = await axiosInstance.get(
          `property/Imoveis/PegarImovelPorIdDoLocatario/${userData.roleId}`
        );
      } else {
        // Para outros papéis (Admin, Locador, etc.), busca todos os imóveis
        imoveisResponse = await axiosInstance.get(
          "property/Imoveis/PegarTodosImoveis"
        );
      }
  
      const imoveis = imoveisResponse.data;
  
      console.log("Imóveis encontrados:", imoveis);
  
      // Cria um array com os endereços dos imóveis
      const houseNamesArray = imoveis.map(
        (imovel: { endereco: string }) => imovel.endereco
      );
  
      // Junta os endereços em uma string separada por ";"
      const houseNamesString = houseNamesArray.join("; ");
      setHouseNames(houseNamesString);
  
      console.log("Endereços dos imóveis:", houseNamesArray);
  
      // Cria um dicionário onde a chave é o ID do imóvel e o valor é o endereço
      const houseDictionary = imoveis.reduce(
        (acc: { [key: string]: string }, imovel: { imovelId: string; endereco: string }) => {
          acc[imovel.imovelId] = imovel.endereco;
          return acc;
        },
        {}
      );
  
      console.log("Dicionário de imóveis:", houseDictionary);
  
      // Atualiza o estado com o dicionário de imóveis
      setHouseNames(houseDictionary);
  
    } catch (error) {
      console.error("Erro ao buscar os imóveis:", error);
  
      // Exibe uma mensagem de erro ao usuário
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Erro ao buscar os imóveis.";
        showErrorToast(errorMessage);
      } else if (error instanceof Error) {
        showErrorToast(error.message);
      } else {
        showErrorToast("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    }
  };

  useEffect(() => {

    allHousesNames();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <h1 className="text-3xl font-bold text-yellow-darker mb-6">
          Criar Chamado
        </h1>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-6 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-neutral-600">Imóvel</label>
                <select
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="h-10 w-full flex-grow bg-transparent border border-neutral-200 focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded"
                >
                  <option value="" disabled>
                    Selecione um imóvel
                  </option>
                  {Object.entries(houseNames).map(([id, address]) => (
                    <option key={id} value={id}>
                      {address}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campo: Tipo de Chamado */}
              <div>
                <label className="block text-neutral-600">
                  Tipo de Chamado
                </label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="h-10 w-full flex-grow bg-transparent border border-neutral-200 focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded"
                >
                  <option value="" disabled>
                    Selecione o tipo de chamado
                  </option>
                  <option>Manutenção</option>
                  <option>Financeiro</option>
                  <option>Administrativo</option>
                  <option>Outros</option>
                </select>
              </div>

              {/* Campo: Título */}
              <div>
                <FormField
                  label="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite o título do chamado"
                />
              </div>

              {/* Campo: Descrição */}
              <div>
                <label className="block text-neutral-600 font-medium">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o problema ou solicitação"
                  className="mt-1 block w-full border border-neutral-200 px-2 py-2 text-form-label rounded-md shadow-sm focus:border-brown-500 focus:ring-brown-500"
                  rows={7}
                ></textarea>
              </div>

              {/* Botão de Confirmação */}
              <div className="w-full max-w-xl py-6 bg-white rounded-lg space-y-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-yellow-darker text-white rounded-md hover:bg-yellow-dark transition duration-300 focus:outline-none focus:bg-yellow-dark mt-4"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loading type="spinner" />}
      <Footer />
    </div>
  );
}
