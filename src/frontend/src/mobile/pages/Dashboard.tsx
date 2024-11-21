import { useState } from 'react'; // Added import
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/FooterSmall';
// Removed unused import of Card
import FormField from '../components/Form/FormField';
import FilterIcon from '/Filter.svg';

export default function MainPage() {
    const [searchTerm, setSearchTerm] = useState(''); // Added state for search input

    return (
        <div className="flex flex-col bg-[#F0F0F0] gap-y-5 min-h-screen">
        
            <Navbar />
            <main className="px-4 gap-y-5 mt-4 flex flex-1 flex-col">
                {/* Formulário */}
                <section className="flex flex-col gap-y-5">
                    <h2 className="text-2xl font-semibold">Monitoramento Financeiro</h2>
                    <form className="grid grid-cols-1 gap-4">
                        {/* Linha com FormField e botão Filtrar ocupando toda a largura */}
                        <div className="flex w-full gap-2 items-end">
                            <div className="w-full">
                                <FormField 
                                    label="Buscar boleto" 
                                    value={searchTerm} 
                                    onChange={setSearchTerm} // Provided required props
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 w-1/4 h-10 px-4 bg-[#1F1E1C] text-neutral-50 text-form-label rounded"
                            >
                                Filtrar
                                {/* Ícone SVG importado */}
                                <img src={FilterIcon} alt="Filtrar" className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </section>

                {/* Cards */}
                <section className="flex-grow flex flex-col gap-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        
                        <div className="flex flex-col">
                            <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                                Em aberto
                            </label>
                            <div className="border border-neutral-300 bg-[#D9D9D9] text-2xl font-bold shadow-[2px_2px_4px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden h-[120px] flex items-center justify-center">
                                213
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                                Pagos
                            </label>
                            <div className="border border-neutral-300 bg-[#D9D9D9] text-2xl font-bold shadow-[2px_2px_4px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden h-[120px] flex items-center justify-center">
                                323.322
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
                            Atrasados
                        </label>
                        <div className="border border-neutral-300 bg-[#D9D9D9] text-2xl font-bold shadow-[2px_2px_4px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden h-[120px] flex items-center justify-center">
                            22
                        </div>
                    </div>
                    <div className="flex justify-around items-center border border-neutral-300 rounded p-4 shadow-md h-[120px]">
                        <div className="flex flex-col justify-center">
                            <p className="text-sm text-gray-600">Boletos</p>
                            <p className="text-2xl font-bold text-black">00</p>
                        </div>
                        <div className="flex items-end gap-2 mt-2">
                            <div className="w-4 h-10 bg-blue-600 rounded"></div>
                            <div className="w-4 h-12 bg-green-500 rounded"></div>
                            <div className="w-4 h-6 bg-red-600 rounded"></div>
                        </div>
                    </div>
                </section>
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}
