import React, { useState } from 'react';
import FormField from '../components/Form/FormField';
import Navbar from '../components/Navbar/Navbar';
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";

export default function AddUser() {
  const [userType, setUserType] = useState("Administrador");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [passport, setPassport] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [nationality, setNationality] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log({
        userType,
        fullName,
        email,
        phone,
        rg,
        cpf,
        passport,
        cep,
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
        nationality,
      });

      // Requisição...

      showSuccessToast(response?.data?.message || "Usuário criado com sucesso.");
    } catch (error) {
      console.error(error);

      showErrorToast(error?.response?.data?.message || "Erro ao se conectar com o servidor.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className='mx-10 mt-10'>
        <h1 className="text-xl font-bold text-yellow-darker mb-6">Adicionar Usuário</h1>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-6 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">Tipo de Usuário</label>
                <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className={`h-10 flex-grow ${userType ? 'bg-transparent border border-black' : 'bg-[#D9D9D9]'} w-full focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                >
                    <option>Administrador</option>
                    <option>Locador</option>
                    <option>Locatário</option>
                </select>


                <FormField label="Nome Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <FormField label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                <FormField label="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <FormField label="RG" value={rg} onChange={(e) => setRg(e.target.value)} />
                <FormField label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                <FormField label="Passaporte" value={passport} onChange={(e) => setPassport(e.target.value)} />
              
              <hr />

                <FormField label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                <FormField label="Logradouro" value={address} onChange={(e) => setAddress(e.target.value)} />
                <FormField label="Número" value={number} onChange={(e) => setNumber(e.target.value)} />
                <FormField label="Complemento" value={complement} onChange={(e) => setComplement(e.target.value)} />
                <FormField label="Bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                <FormField label="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
                <FormField label="Estado" value={state} onChange={(e) => setState(e.target.value)} />
                <FormField label="Nacionalidade" value={nationality} onChange={(e) => setNationality(e.target.value)} />

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:bg-gray-800 mt-4"
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