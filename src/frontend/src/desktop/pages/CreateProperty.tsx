import InputField from "../components/InputField";

export default function CreateProperty() {
    return (
        <div>
            <InputField label="Título" type="text" placeholder="Digite o título do imóvel" value="" onChange={() => {}} />
        </div>
    );
}
