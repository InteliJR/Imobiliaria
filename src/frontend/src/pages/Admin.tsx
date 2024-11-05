import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/FooterBig";
import useAuth from "../hooks/useAuth";

export default function Admin() {
  useAuth('Admin');

  return (
    <div>
      <Navbar />
      <h1>Você é um usuário administrador!</h1>
      <Footer />
    </div>
  );
}
