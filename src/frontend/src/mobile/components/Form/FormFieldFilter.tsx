import React, { useState, useEffect } from 'react';

interface FormFieldFilterProps {
  label: string;
  placeholder?: string;
  initialValue?: string;
  onFilter: (value: string) => void; // Callback para o valor filtrado
}

const FormFieldFilter: React.FC<FormFieldFilterProps> = ({ label, placeholder = 'Digite para filtrar...', initialValue = '', onFilter }) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onFilter(newValue);
  };

  return (
    <div className="flex flex-col">
      <label className="font-sans font-normal text-form-label text-neutral-900 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`h-10 flex-grow tracking-wider ${
          value ? 'bg-gray-100 border border-black' : 'bg-[#D9D9D9]'
        } focus:outline-none px-2 text-form-label placeholder:text-form-label placeholder:text-black/60 rounded`}
      />
    </div>
  );
};

export default FormFieldFilter;
