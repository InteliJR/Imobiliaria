import Navbar from "../components/Navbar/Navbar";
import Voltar from "../components/Voltar";
import Footer from "../components/Footer/FooterSmall";
import VisualizarItem from "../components/VisualizarItem";
import Botao from "../components/botoes/Botao";
import BotaoAlterarSenha from "../components/botoes/BotaoAlterarSenha";

export default function Perfil() {
  const profileEdit = () => {
    alert("profileEdit");
    navigate('/perfil/editar'); // Navega para a página de edição de perfil
};

const passwordEdit = () => {
    alert("passwordEdit");
    navigate('/perfil/alterar-senha'); // Navega para a página de alteração de senha
  };

  return (
    <main className="main-custom">
      <Navbar />

      <section className="section-custom">
        <Voltar />

        <div>
          <h1 className="font-sans text-title font-strong">Nome do Usuário</h1>
          <h2 className="font-sans text-sm text-gray-700">Tipo de usuário</h2>
        </div>

        <Botao label="Editar Perfil" onClick={profileEdit} />

        <div className="flex flex-col gap-4 border-2 border-neutral-900 p-4 rounded-md">
          <h1 className="my-2 font-sans font-strong font-title">Informações Pessoais</h1>

          <VisualizarItem
            label="E-mail"
            informacao="emailDoUsuario@gmail.com"
          />
          <VisualizarItem label="Telefone" informacao="(11) 12345-6789" />
          <VisualizarItem label="Data de Criação" informacao="25/09/2024" />
        </div>

        <BotaoAlterarSenha label="Alterar Senha" onClick={passwordEdit} />
      </section>

      <Footer />
    </main>
  );
}
