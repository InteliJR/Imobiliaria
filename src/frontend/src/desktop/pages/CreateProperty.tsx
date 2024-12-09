import { useState } from "react";
import FormField from "../components/Form/FormField";
import Navbar from "../../mobile/components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import axiosInstance from '../../services/axiosConfig.ts';
import { getServiceUrl } from "../../services/apiService.ts";

export default function CreateProperty() {
  const [propertyType, setPropertyType] = useState("Kitnet");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [rent, setRent] = useState("");
  const [condoFee, setCondoFee] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
        console.log({
          propertyType,
          cep,
          address,
          complement,
          neighborhood,
          rent,
          condoFee,
          description
        });

        // Requisição...
        const response = await axiosInstance.post(getServiceUrl('propertyService', '/Imoveis/CriarUmNovoImovel'), {
          TipoImovel: propertyType,
          Cep: cep,
          Condominio: condoFee,
          ValorImovel: rent,
          Bairro: neighborhood,
          Descricao: description,
          Endereco: address,
          Complemento: complement
          // LocatarioId: locatarioId || null, // Esses campos precisam ser adicionados  
          // LocadorId: locadorId || null
        });


        showSuccessToast(response?.data?.message || "Imóvel criado com sucesso!");
      } catch (error: any) {
        console.error(error);
  
        showErrorToast(error?.response?.data?.message || "Erro ao se conectar com o servidor.");
      }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <h1 className="text-3xl font-bold text-yellow-darker mb-6">Adicionar Imóvel</h1>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-6 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-neutral-600">Tipo do Imóvel</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="h-10 w-full flex-grow bg-transparent border border-neutral-200 focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded"
                >
                  <option>Kitnet</option>
                  <option>Apartamento</option>
                  <option>Casa</option>
                  <option>Comercial</option>
                </select>
              </div>

              <div>
                <FormField
                  label="CEP"
                  placeholder="Digite o CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </div>


              <div>
              <FormField
                  label="Endereço"
                  placeholder="Digite o endereço"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
              <FormField
                  label="Complemento"
                  placeholder="Digite o complemento"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </div>

              <div>
              <FormField
                  label="Bairro"
                  placeholder="Bairro do imóvel"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField
                  label="Aluguel (R$)"
                  placeholder=""
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  />
                </div>

                <div>
                  <FormField 
                  label="Condomínio (R$)"
                  placeholder=""
                  value={condoFee}
                  onChange={(e) => setCondoFee(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 font-medium">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-neutral-200 px-2 py-2 text-form-label rounded-md shadow-sm focus:border-brown-500 focus:ring-brown-500"
                  rows={3}
                ></textarea>
                
              </div>
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
