import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className='bg-neutral-black flex justify-between items-center p-4'>
        <div>
          <img src="/Logo.svg" alt="Logo" />
        </div>
        <div>
          <button onClick={toggleMenu} className="focus:outline-none">
            {/* Add rotation class conditionally */}
            <img
              src="/Menu.svg"
              alt="Menu"
              className={`transition-transform duration-700 ${isOpen ? 'rotate-90' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Full-Screen Hamburger Menu */}
      {isOpen && (
        <div className='fixed inset-0 bg-neutral-black text-white flex flex-col items-center justify-center'>
          <ul className='text-center space-y-8 text-2xl'>
            <li className='hover:text-gray-600'>Home</li>
            <li className='hover:text-gray-600'>About</li>
            <li className='hover:text-gray-600'>Services</li>
            <li className='hover:text-gray-600'>Contact</li>
          </ul>

          <button 
            onClick={toggleMenu} 
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
          >
            <img 
              src="/Menu.svg" 
              alt="Close Menu" 
              className={`transition-transform duration-700 ${isOpen ? 'rotate-90' : ''}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
