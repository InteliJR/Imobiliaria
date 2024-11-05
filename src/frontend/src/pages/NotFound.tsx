import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => (
    <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-yellow-darker">
            <h1 className="text-9xl font-extrabold mb-4">404</h1>
            <p className="text-2xl md:text-3xl font-semibold mb-6">
                Oops! Página não encontrada.
            </p>
            <p className="text-gray-600 mb-14">
                Parece que a página que você está tentando acessar não existe.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-yellow-darker text-white font-semibold rounded-md hover:bg-yellow-dark transition duration-300"
            >
                Voltar para a página inicial
            </Link>
        </div>
    </div>
);

export default NotFound;
