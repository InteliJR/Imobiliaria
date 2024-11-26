import React, { useState } from 'react';
import FormField from '../components/Form/FormField';
import Navbar from '../../mobile/components/Navbar/Navbar';
import Footer from '../../components/Footer/FooterSmall';

export default function CreateProperty() {
  const [propertyType, setPropertyType] = useState("Kitnet");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [rent, setRent] = useState("");
  const [condoFee, setCondoFee] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      propertyType,
      cep,
      address,
      complement,
      neighborhood,
      rent,
      condoFee,
      description,
    });
  };

  return (
    <div>
        <Navbar />
        <div className='mx-10 mt-10'>
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
                        <FormField label="CEP" />
                    </div>

                    <div>
                        <FormField label="Endereço" />
                    </div>

                    <div>
                        <FormField label="Complemento" />
                    </div>

                    <div>
                        <FormField label="Bairro" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <FormField label="Aluguel (R$)" />
                        </div>
                        <div>
                        <FormField label="Condomínio (R$)" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-neutral-600 font-medium">Descrição</label>
                        <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-neutral-200 px-2 py-2 text-form-label rounded-md shadow-sm focus:border-brown-500 focus:ring-brown-500"
                        rows="3"
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