import NavbarLogin from '../components/Navbar/NavbarLogin';
import Footer from '../components/Footer/FooterBig';
import FormField from '../components/Form/FormField';

export default function Login() {
  return (
    <div>
      <NavbarLogin />

      <main className="bg-[#F0F0F0] flex flex-col min-h-screen">
        {/* Main Content */}
        <div className="flex-grow flex flex-col justify-center items-center px-4">
          <div className="w-full max-w-sm">
            {/* Form */}
            <h2 className="text-start text-title font-   mb-10">Login</h2>

            <form>
              <div className="mb-6">
                <FormField placeholder="Email" label="Email:" />
              </div>
              <div className="mb-10">
                <FormField placeholder="Password" label="Senha:" />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-10 bg-neutral-900 text-neutral-50 rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
