import { useState } from 'react';
import Menu from '../Menu'; // Adjust the path if necessary

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Example userType, you would get this dynamically in your app
  const userType = 'Administrador'; 

  return (
    <div>
      <div className="bg-neutral-black flex justify-between items-center px-4 py-4 min-h-20"> {/* Added min-h-16 */}
        <div>
          <img src="/Logo.svg" alt="Logo" />
        </div>
        <div>
          <button onClick={toggleMenu} className="focus:outline-none">
            <img 
              src="/Menu.svg" 
              alt="Menu" 
              className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
            />
          </button>
        </div>
      </div>

      {/* Full-Screen Hamburger Menu */}
      {isOpen && <Menu userType={userType} toggleMenu={toggleMenu} isOpen={isOpen} />}
    </div>
  );
}
