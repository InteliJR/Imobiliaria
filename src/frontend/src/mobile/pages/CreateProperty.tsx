import React, { useState } from "react";
import FormField from "../components/Form/FormField";
import Navbar from "../components/Navbar/Navbar";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";

export default function CreatePropertyMobile() {
  const [propertyType, setPropertyType] = useState("Kitnet");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      console.log({
        propertyType,
        description,
      });

      // Requisição...

      showSuccessToast(response?.data?.message || "Imóvel criado com sucesso!");
    } catch (error) {
      console.error(error);

      showErrorToast(error?.response?.data?.message || "Erro ao se conectar com o servidor.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <h1 className="text-xl font-bold text-yellow-darker mb-6">Criar Imóvel</h1>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-6 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tipo do Imóvel */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                  Tipo do Imóvel
                </label>
                <select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className={`h-10 flex-grow ${
                    value ? "bg-transparent border border-black" : "bg-[#D9D9D9]"
                  } w-full focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                >
                  <option>Kitnet</option>
                  <option>Apartamento</option>
                  <option>Casa</option>
                  <option>Comercial</option>
                </select>
              </div>

              {/* Campos de Formulário */}
              <FormField label="CEP" type="text" placeholder="CEP do imóvel" />
              <FormField label="Endereço" type="text" placeholder="Endereço do imóvel" />
              <FormField label="Complemento" type="text" placeholder="Complemento do imóvel" />
              <FormField label="Bairro" type="text" placeholder="Bairro do imóvel" />
              <FormField label="Aluguel (R$)" type="text" placeholder="Valor do aluguel" />
              <FormField label="Condomínio (R$)" type="text" placeholder="Valor do condomínio" />

              {/* Descrição */}
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`h-20 flex-grow ${
                    description ? "bg-transparent border border-black" : "bg-[#D9D9D9]"
                  } w-full focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                  rows="3"
                  placeholder="Descrição do imóvel"
                ></textarea>
              </div>

              {/* Botão Confirmar */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none mt-4"
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
