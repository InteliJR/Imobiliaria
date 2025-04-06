import { useState } from "react";
import FormField from "../components/Form/FormField";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Loading from "../../components/Loading";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import { AxiosError } from "axios";
import axiosInstance from "../../services/axiosConfig";

export default function AddClient() {
  const [userType, setUserType] = useState("Administrador");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [passport, setPassport] = useState("");
  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [nationality, setNationality] = useState("");
  const [loading, setLoading] = useState(false);

  const userTypeRoutes: { [key: string]: string } = {
    "Administrador": "/auth/User/CriarUsuarioAdmin",
    "Locador": "/auth/User/CriarUsuarioLocador",
    "Locatário": "/auth/User/CriarUsuarioLocatario",
    "Judiciário": "/auth/User/CriarUsuarioJudiciario",
  };

  // console.log(userType);
  
  let fullNameField = '';
  if (userType === "Locatário") {
    fullNameField = "NomeCompletoLocatario";
  } else if (userType === "Locador") {
    fullNameField = "NomeCompletoLocador";
  } else {
    fullNameField = "NomeCompleto";
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    // Validação de campos obrigatórios
    if (!fullName.trim()) {
      showErrorToast("O campo 'Nome Completo' é obrigatório.");
      setLoading(false);
      return;
    }
  
    let requestBody: any = {
      [fullNameField]: fullName, // O campo será dinâmico, conforme o tipo de usuário
      email,
      cpf,
      nacionalidade: nationality,
      numeroTelefone: phone,
      cnpj: null,
      endereco: `${address}, ${number}, ${city}, ${state}`,
      passaporte: passport || null,
      rg,
    };
  
    // console.log(fullName);
  
    const endpoint = userTypeRoutes[userType];
    if (!endpoint) {
      showErrorToast("Tipo de usuário inválido.");
      setLoading(false);
      return;
    }
  
    try {
      await axiosInstance.post(`${endpoint}?email=${email}`, requestBody);
      showSuccessToast("Usuário criado com sucesso.");
      // Limpar o formulário
      setUserType("Administrador");
      setFullName("");
      setEmail("");
      setPhone("");
      setRg("");
      setCpf("");
      setPassport("");
      setCep("");
      setAddress("");
      setNumber("");
      setComplement("");
      setNeighborhood("");
      setCity("");
      setState("");
      setNationality("");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        showErrorToast(
          error?.response?.data?.message ||
            "Erro ao se conectar com o servidor."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="mx-10 mt-10">
        <h1 className="text-3xl font-bold text-yellow-darker mb-6">
          Adicionar Cliente
        </h1>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-6 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl text-neutral-700">Dados Pessoais</h2>
              <div>
                <label className="block text-neutral-600">Tipo de Usuário</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="h-10 w-full flex-grow bg-transparent border border-neutral-200 focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded"
                >
                  <option>Administrador</option>
                  <option>Locador</option>
                  <option>Locatário</option>
                  <option>Judiciário</option>
                </select>
              </div>
                {userType === "Judiciário" || userType === "Administrador"? (
                  <>
                    <FormField
                      label="Nome Completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <FormField
                      label="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <FormField
                      label="Nome Completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <FormField
                      label="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormField
                      label="Telefone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <FormField
                      label="RG"
                      value={rg}
                      onChange={(e) => setRg(e.target.value)}
                    />
                    <FormField
                      label="CPF"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                    <FormField
                      label="Passaporte"
                      value={passport}
                      onChange={(e) => setPassport(e.target.value)}
                    />
                    <hr />
                    <h2 className="text-xl text-neutral-700">Endereço</h2>
                    <FormField
                      label="CEP"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                    <FormField
                      label="Logradouro"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Número"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                      <FormField
                        label="Complemento"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                      />
                    </div>
                    <FormField
                      label="Bairro"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <FormField
                        label="Estado"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <FormField
                      label="Nacionalidade"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    />
                  </>
                )}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-yellow-darker text-white rounded-md hover:bg-yellow-dark transition duration-300 focus:outline-none focus:bg-yellow-dark mt-4"
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loading type="spinner" />}
      <Footer />
    </div>
  );
}
