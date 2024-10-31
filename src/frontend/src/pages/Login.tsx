import NavbarLogin from '../components/Navbar/NavbarLogin';
import Footer from '../components/Footer/FooterBig';
import FormField from '../components/Form/FormField';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/Account/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email: email, Senha: senha })
            });

            if (response.ok) {
                const token = await response.json();
                localStorage.setItem('token', token);
                // Redirecionar o usuário ou atualizar o estado da aplicação
                navigate('/landing'); // Redirecionar para /landing
            } else {
                const errorMsg = await response.text();
                setError(errorMsg);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao conectar-se ao servidor');
        }
    };

    // Usuário já é direcionado para a landing page se já estiver logado
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          navigate('/landing'); // Redirecionar para /landing se já estiver logado
      }
  }, []);


    return (
        <div className="bg-[#F0F0F0] flex flex-col min-h-screen">
            {/* Navbar */}
            <NavbarLogin />

            {/* Main Content */}
            <div className="flex-grow flex flex-col justify-center items-center px-4">
                <div className="w-full max-w-sm">
                    {/* Form */}
                    <h2 className="text-start text-title font-strong mb-10">Login</h2>

                    <form onSubmit={handleLogin}>
                        <div className='mb-6'>
                            <FormField 
                                placeholder="Email" 
                                label="Email:" 
                                value={email} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-10'>
                            <FormField 
                                placeholder="Senha" 
                                label="Senha:" 
                                type="password" 
                                value={senha} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full h-10 bg-neutral-900 text-neutral-50 font-bold rounded hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
