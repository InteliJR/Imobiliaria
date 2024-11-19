import React from 'react';

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string; // Tipo opcional para suportar 'password', 'text', etc.
  value?: string; // Valor controlado
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Manipulador de evento onChange
  defaultValue?: string; // Valor inicial padrão
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col">
      {/* Label com fonte de tamanho 13px e margem inferior de 5px */}
      <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value} // Valor controlado
        onChange={onChange} // Manipulador de evento onChange
        placeholder={placeholder}
        defaultValue={defaultValue} // Valor inicial padrão
        className={`h-10 flex-grow ${
          value ? 'bg-transparent border border-black' : 'bg-[#D9D9D9]'
        } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
      />
    </div>
  );
};

export default FormField;