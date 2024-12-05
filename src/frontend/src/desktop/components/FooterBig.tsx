import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className='z-10'>
            <div className='bg-neutral-black flex flex-col py-10 gap-x-8'>
                <div className='flex justify-around items-center px-12'>
                    <div className='flex flex-col '>
                        <img src="/LogoFooter.svg" alt="" className='w-64'/>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-white text-[14px]'>Contate-nos</h1>
                        <p className='text-white text-[8px]'>
                            k&kimobiliaria@example.com<br />
                            +55 (11) 00000-0000 <br />
                        </p>
                        <h1 className='text-white text-[14px]'>Endereço</h1>
                        <p className='text-white text-[8px]'>
                            Rua XXXXXXXXX, 000 <br />
                            00000-000 <br />
                            São Paulo, Brasil <br />
                        </p>
                    </div>
                    
                </div>
                        {/* Social Media Icons */}
                <div className="flex space-x-4 justify-center mt-6">
                    <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="text-white text-2xl" />
                    </a>
                    <a href="https://www.instagram.com/yourprofile/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-white text-2xl" />
                    </a>
                </div>
                {/* Footer Text */}
                <p className="text-neutral-500 text-[8px] text-end mt-4 me-4">
                    © 2024 K&amp;K Assessoria e Gestão de Negócios<br />
                    Todos os Direitos Reservados.
                </p>
            </div>      
        </footer>
    )
}