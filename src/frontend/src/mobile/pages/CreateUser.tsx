import { useState } from "react";
import FormField from "../components/Form/FormField";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/FooterSmall";
import Voltar from "../../components/Botoes/Voltar";
import Loading from "../../components/Loading";
import axiosInstance from "../../services/axiosConfig";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false); // estado para controlar o componente de carregamento
  
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
      // showErrorToast("O campo 'Nome Completo' é obrigatório.");
      toast.error("O campo 'Nome Completo' é obrigatório.");
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
      // showErrorToast("Tipo de usuário inválido.");
      toast.error("Tipo de usuário inválido.");
      setLoading(false);
      return;
    }
  
    try {
      await axiosInstance.post(`${endpoint}?email=${email}`, requestBody);
      // showSuccessToast("Usuário criado com sucesso.");
      toast.success("Usuário criado com sucesso.");
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
      // console.error(error);
      if (error instanceof AxiosError) {
        // showErrorToast(
        //   error?.response?.data?.message ||
        //     "Erro ao se conectar com o servidor."
        // );
        toast.error(
          error?.response?.data?.message ||
            "Erro ao se conectar com o servidor."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
      <Voltar />
      <div className="mx-10 mt-2">
        <h1 className="text-xl font-bold mb-4">Adicionar Usuário</h1>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-xl py-6 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                  Tipo de Usuário
                </label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className={`h-10 flex-grow ${
                    userType
                      ? "bg-transparent border border-black"
                      : "bg-[#D9D9D9]"
                  } w-full focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
                >
                  <option>Administrador</option>
                  <option>Locador</option>
                  <option>Locatário</option>
                  <option>Judiciário</option>
                </select>
              </div>

              {userType === "Judiciário" || userType === "Administrador" ? (
                <>
                  <FormField
                    label="Nome Completo"
                    value={fullName}
                    onChange={setFullName}
                  />
                  <FormField label="E-mail" value={email} onChange={setEmail} />
                </>
              ) : (
                <>
                  <FormField
                    label="Nome Completo"
                    value={fullName}
                    onChange={setFullName}
                  />
                  <FormField label="E-mail" value={email} onChange={setEmail} />
                  <FormField label="Telefone" value={phone} onChange={setPhone} />
                  <FormField label="RG" value={rg} onChange={setRg} />
                  <FormField label="CPF" value={cpf} onChange={setCpf} />
                  <FormField
                    label="Passaporte"
                    value={passport}
                    onChange={setPassport}
                  />
                  <hr />
                  <FormField label="CEP" value={cep} onChange={setCep} />
                  <FormField
                    label="Logradouro"
                    value={address}
                    onChange={setAddress}
                  />
                  <FormField label="Número" value={number} onChange={setNumber} />
                  <FormField
                    label="Complemento"
                    value={complement}
                    onChange={setComplement}
                  />
                  <FormField
                    label="Bairro"
                    value={neighborhood}
                    onChange={setNeighborhood}
                  />
                  <FormField label="Cidade" value={city} onChange={setCity} />
                  <FormField label="Estado" value={state} onChange={setState} />
                  <FormField
                    label="Nacionalidade"
                    value={nationality}
                    onChange={setNationality}
                  />
                </>
              )}

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
    </section>

      {loading && <Loading type="spinner" />}

      <Footer />
    </main>
  );
}
