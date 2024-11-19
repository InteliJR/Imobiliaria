import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormFieldProps {
  label: string;
  placeholder?: string;
  value: string; 
  onChange: (value: string) => void;
  isPassword?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, placeholder = '', value, onChange, isPassword = false }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col relative">
      <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
        {label}
      </label>
      <input
        type={isPassword && !isPasswordVisible ? "password" : "text"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`h-10 flex-grow pr-10 tracking-wider ${
          value ? 'bg-gray-100 border border-black' : 'bg-[#D9D9D9]'
        } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
      />
      {isPassword && (
        <div 
          className="flex items-center h-10 absolute right-4 bottom-0 cursor-pointer text-gray-600" 
          onClick={togglePasswordVisibility} 
        >
          {isPasswordVisible ? <FaEyeSlash size="20"/> : <FaEye size="20"/>}
        </div>
      )}
    </div>
  );
};

export default FormField;
