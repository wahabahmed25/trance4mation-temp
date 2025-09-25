import { BLUE, YELLOW } from "@/app/discussion-circle/defaults"
import { ChangeEventHandler, CSSProperties, FormEventHandler } from "react"

interface TextInputProps {
    placeholder?: string,
    style?: CSSProperties,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onSubmit?: FormEventHandler<HTMLInputElement>
}

export default function TextInput({placeholder="", style, onChange, onSubmit}: TextInputProps) {
    return (
        <input
        type="text"
        placeholder={placeholder}
        className="text-base p-1 px-2 border-b-1"
        style={{
            minWidth: 0,
            ...style
        }}
        onChange={onChange}
        onSubmit={onSubmit}
        >
        </input>
    )
}