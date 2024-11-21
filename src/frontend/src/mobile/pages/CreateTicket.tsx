import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import FormField from '../components/Form/FormField';

export default function CreateTicket() {
  const [property, setProperty] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      property,
      type,
      title,
      description,
    });
  };

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
                  <option>Rua Nossa Senhora de Fátima, 80</option>
                  <option>Rua Nossa Senhora de Sabará, 50</option>
                  <option>Rua Nossa Senhora das Graças, 156</option>
                </select>
              </div>

              {/* Seleção de Tipo */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">Tipo</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={`h-10 w-full ${
                    type ? 'bg-transparent border border-black' : 'bg-[#D9D9D9]'
                  } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                >
                  <option value="" disabled>
                    Selecione o tipo de chamado
                  </option>
                  <option>Manutenção Corretiva</option>
                  <option>Manutenção Preditiva</option>
                  <option>Vizinhança</option>
                  <option>Financeiro</option>
                </select>
              </div>

              {/* Campo de Título */}
              <FormField label="Título" type="text" placeholder="Título do chamado" value={title} onChange={(e) => setTitle(e.target.value)} />

              {/* Campo de Descrição */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`h-20 w-full ${
                    description ? 'bg-transparent border border-black' : 'bg-[#D9D9D9]'
                  } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                  rows="10"
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
