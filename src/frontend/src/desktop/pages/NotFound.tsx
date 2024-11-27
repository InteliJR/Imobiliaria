import { Link } from 'react-router-dom';
import Navbar from '../../mobile/components/Navbar/Navbar';

const NotFound = () => (
    <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-yellow-darker px-4">
            <h1 className="text-6xl md:text-9xl font-extrabold mb-4 md:mb-6">404</h1>
            <p className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">
                Oops! Página não encontrada.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-12 md:mb-20 text-center max-w-md">
                Parece que a página que você está tentando acessar não existe.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-yellow-darker text-white rounded hover:bg-yellow-dark transition duration-300 text-sm md:text-base"
            >
                Voltar para a página inicial
            </Link>
        </div>
    </div>
);

export default NotFound;