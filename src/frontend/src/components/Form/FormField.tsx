import React from 'react';

interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean; // Adicionando suporte para desabilitar o campo
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  defaultValue,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`h-10 flex-grow ${
          value ? 'bg-transparent border border-black' : 'bg-[#D9D9D9]'
        } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
      />
    </div>
  );
};

export default FormField;