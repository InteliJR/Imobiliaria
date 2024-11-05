import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/FooterBig";

export default function Unauthorized() {

  return (
    <div>
      <Navbar />
      <h1>Você não tem acesso a essa rota!</h1>
      <Footer />
    </div>
  );
}
