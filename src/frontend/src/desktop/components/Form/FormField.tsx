import React from 'react';

interface FormFieldProps {
  label: any;
  placeholder?: string; // Tornando o placeholder opcional
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
  defaultValue
}) => {
  return (
    <div className="flex flex-col">
      {/* Label com fonte de 13px e margem inferior de 5px */}
      <label className="block text-neutral-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder} // Usando o placeholder se ele estiver definido
        defaultValue={defaultValue} // Valor inicial padrão
        className="h-10 flex-grow mt-1 block w-full border border-neutral-200 rounded-md  px-2 text-form-label shadow-sm focus:border-neutral-300"
      />
    </div>
  );
};

export default FormField;