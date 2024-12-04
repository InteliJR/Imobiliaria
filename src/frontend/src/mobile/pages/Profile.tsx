import Navbar from '../components/Navbar/NavBar';
import Footer from '../../components/Footer/FooterSmall';
import ProfileField from '../components/ProfileField';

export default function Profile () {
    return (
        <div>
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <div className='mx-10'>
                    <div className='grid grid-cols-2 mt-5'>
                        <div>
                            <h1 className='text-3xl text-yellow-darker font-extrabold'>Matheus Ribeiro</h1>
                            <p className='text-yellow-dark'>Administrador</p>
                        </div>
                        <div className='flex justify-end'>
                            <button className='bg-yellow-darker text-white px-6 py-1 w-auto rounded'>Editar Perfil</button>
                        </div>
                    </div>
                    <div className='border-neutral-300 border-2 rounded px-3 my-10'>
                        <h2 className='text-xl text-yellow-darker font-bold mt-5'>Informações Pessoais</h2>
                        <div className='grid grid-cols-2'>
                            <div>
                                <ProfileField title='Nome' value='Matheus Ribeiro' />
                                <ProfileField title='Email' value='example@gmail.com' />
                                <ProfileField title='Tipo de Usuário' value='Administrador' />
                                <ProfileField title='Data de Criação' value='31/10/2024' />
                            </div>
                            <div>
                                <ProfileField title='RG' value='00.000.000-00' />
                                <ProfileField title='CPF' value='000.000.000-00' />
                                <ProfileField title='Endereço' value='Rua Davi, 000 - Jardim Palmares (Zona Norte)' />
                                <ProfileField title='CEP' value='02328-161' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}