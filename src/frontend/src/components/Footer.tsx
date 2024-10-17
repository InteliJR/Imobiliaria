import React from 'react'

export default function Footer() {
    return (
        <div>
            <div className='flex flex-col'>
                <div className='bg-neutral-black flex justify-around items-center px-12 py-20'>
                    <div className='flex flex-col '>
                        <img src="/LogoFooter.svg" alt="" className='w-64'/>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-white text-xl'>Contate-nos</h1>
                        <p className='text-white text-xs'>
                            k&kimobiliaria@example.com<br />
                            +55 (11) 00000-0000 <br />
                        </p>
                        <h1 className='text-white text-xl'>Endereço</h1>
                        <p className='text-white text-xs'>
                            Rua XXXXXXXXX, 000 <br />
                            00000-000 <br />
                            São Paulo, Brasil <br />
                        </p>

                    </div>

                </div>
            </div>
            
        </div>
    )
}
