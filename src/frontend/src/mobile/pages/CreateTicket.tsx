import { useState, useEffect } from "react";
import Navbar from '../components/Navbar/Navbar';
import FormField from '../components/Form/FormField';
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from "../../services/axiosConfig";
import getTokenData from "../../services/tokenConfig";

export default function CreateTicket() {
  const [property, setProperty] = useState('');
  const [ticketType, setTicketType] = useState("");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
        <h1 className="text-xl font-bold text-yellow-darker mb-6">Novo Chamado</h1>
        <div className="min-h-screen flex flex-col items-center">
          <div className="w-full max-w-xl py-6 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Seleção de Imóvel */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">Imóvel</label>
                <select
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className={`h-10 w-full ${
                    property ? 'bg-transparent border border-black' : 'bg-[#D9D9D9]'
                  } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                >
                  <option value="" disabled>
                    Selecione um imóvel
                  </option>
                  <option value="">Selecione um imóvel</option>
                    {Object.entries(houseNames).map(([id, address]) => (
                    <option key={id} value={id}>{address}</option>
                    ))}
                </select>
              </div>

              {/* Seleção de Tipo */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">Tipo</label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className={`h-10 w-full ${
                    ticketType ? 'bg-transparent border border-black' : 'bg-[#D9D9D9]'
                  } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
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

              {/* Campo de Título */}
              <FormField 
                label="Título" 
                value={title} 
                onChange={setTitle} 
                placeholder="Título do chamado" 
              />

              {/* Campo de Descrição */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`h-20 w-full ${
                    description ? 'bg-transparent border border-black' : 'bg-[#D9D9D9]'
                  } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                  rows={10}
                  placeholder="Descreva o problema ou solicitação"
                ></textarea>
              </div>

              {/* Botão Criar */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none mt-4"
              >
                Criar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
