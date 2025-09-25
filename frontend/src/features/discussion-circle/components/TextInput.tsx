import { ChangeEventHandler, CSSProperties, FormEventHandler } from "react"

interface TextInputProps {
    placeholder?: string,
    style?: CSSProperties,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onSubmit?: FormEventHandler<HTMLInputElement>,
    className?: string
}

export default function TextInput({ placeholder="", style, onChange, onSubmit, className }: TextInputProps) {
    return (
        <input
        type="text"
        placeholder={placeholder}
        className={`text-base p-1 px-2 border-b-1 ${className}`}
        style={{
            minWidth: 0,
            flexGrow: 1,
            ...style
        }}
        onChange={onChange}
        onSubmit={onSubmit}
        >
        </input>
    )
}