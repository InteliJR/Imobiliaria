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
      <label className="block text-neutral-600">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder} // Usando o placeholder se ele estiver definido
        className="h-10 flex-grow mt-1 block w-full border border-neutral-200 rounded-md  px-2 text-form-label shadow-sm focus:border-neutral-300"
      />
    </div>
  );
};

export default FormField;