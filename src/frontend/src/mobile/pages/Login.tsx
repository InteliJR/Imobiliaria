import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLogin from '../components/Navbar/NavbarLogin';
import Footer from '../components/Footer/FooterBig';
import FormField from '../components/Form/FormField';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    navigate('/dashboard'); // Redirect to the /dashboard route
  };

  return (
    <div className="bg-[#F0F0F0] flex flex-col min-h-screen">
      {/* Navbar */}
      <NavbarLogin />

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm">
          {/* Form */}
          <h2 className="text-start text-title font-strong mb-10">Login</h2>

          <form className="" onSubmit={handleSubmit}>
            <div className="mb-6">
              <FormField placeholder="Email" label="Email:" />
            </div>
            <div className="mb-10">
              <FormField type="password" placeholder="Password" label="Senha:" />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-10 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
