interface ProfileFieldProps {
    title: string;
    value: string;
}

export default function ProfileField ({ title, value }: ProfileFieldProps) {
    return (
        <div className="my-7 space-y-1">
            <p className="text-neutral-600">{title}</p>
            <p className="text-neutral-900">{value}</p>
        </div>
    )
}