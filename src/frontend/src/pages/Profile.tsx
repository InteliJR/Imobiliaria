import NavbarLogin from '../components/Navbar/NavbarLogin';
import Footer from '../components/Footer/FooterSmall';
import { useParams } from 'react-router-dom';

export default function Profile () {
    let { id } = useParams()

    return (
        <div>
            <NavbarLogin />
            <h1>Matheus Ribeiro</h1>
            <p>Usuário: {id}</p>
            <Footer />
        </div>
    )
}