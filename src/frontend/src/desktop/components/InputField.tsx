interface InputFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField (props: InputFieldProps) {
    const { label, type, placeholder, value, onChange } = props;

    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={label} className="text-sm font-semibold text-gray-600 mb-2">
                {label}
            </label>
            <input
                id={label}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-yellow-dark transition duration-300"
            />
        </div>
    );
}