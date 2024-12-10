import { useState, useEffect } from "react";
import FormField from "../components/Form/FormField";
import Navbar from "../../mobile/components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import getTokenData from "../../services/tokenConfig";

export default function CreateTicket() {
  const [property, setProperty] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [houseNames, setHouseNames] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!property || !title || !description) {
      showErrorToast("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {

      // /Chamados/CriarUmNovoChamado
      // {
      //   "idImovel": 0,
      //   "titulo": "string",
      //   "solicitanteId": 0,
      //   "dataSolicitacao": "2024-12-10T03:02:45.474Z",
      //   "descricao": "string",
      //   "tipoChamado": "string",
      //   "status": "string"
      // }


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


      const response = await axiosInstance.post('property/Chamados/CriarUmNovoChamado', data);

      console.log(response.data);

      showSuccessToast("Chamado aberto com sucesso!");

    } catch (error) {
      console.error('Error creating ticket:', error);
      showErrorToast(
        error instanceof Error ? error.message : "Erro ao se conectar com o servidor."
      );
    }
  };

  const allHousesNames = async () => {

    try{

      const imoveisResponse = await axiosInstance.get('property/Imoveis/PegarTodosImoveis');

      const imoveis = imoveisResponse.data;

      console.log(imoveis)
      

      const houseNamesArray = imoveis.map((imovel: { endereco: any; }) => imovel.endereco);
      setHouseNames(houseNamesArray.join("; "));

    console.log(houseNamesArray);
    const houseDictionary = imoveis.reduce((acc: { [key: string]: string }, imovel: { imovelId: string; endereco: string }) => {
      acc[imovel.imovelId] = imovel.endereco;
      return acc;
    }, {});

    console.log(houseDictionary);

    setHouseNames(houseDictionary)
    
    } catch(error){
      console.error('Error getting the houses:', error);

    }
  }

  useEffect(() => {
    allHousesNames();
  }, []);


  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <h1 className="text-3xl font-bold text-yellow-darker mb-6">Criar Chamado</h1>
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
                  <option value="" disabled>Selecione um imóvel</option>
                    {Object.entries(houseNames).map(([id, address]) => (
                    <option key={id} value={id}>{address}</option>
                    ))}
                </select>
              </div>

              {/* Campo: Tipo de Chamado */}
              <div>
                <label className="block text-neutral-600">Tipo de Chamado</label>
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
                <label className="block text-neutral-600 font-medium">Descrição</label>
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
      <Footer />
    </div>
  );
}
