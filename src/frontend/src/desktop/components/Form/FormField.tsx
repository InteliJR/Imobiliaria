import React, { useState } from 'react';

interface FormFieldProps {
  label: string;
  placeholder?: string; // Tornando o placeholder opcional
}

const FormField: React.FC<FormFieldProps> = ({ label, placeholder = '' }) => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="flex flex-col">
      {/* Label com fonte de 13px e margem inferior de 5px */}
      <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder} // Usando o placeholder se ele estiver definido
        className={`h-10 flex-grow ${
          value ? 'bg-transparent border' : 'bg-[#D9D9D9]'
        } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
      />
    </div>
  );
};

export default FormField;