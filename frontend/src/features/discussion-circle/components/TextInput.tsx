import { ChangeEventHandler, CSSProperties, FormEventHandler, useState } from "react"

interface TextInputProps {
    placeholder?: string,
    style?: CSSProperties,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onSend?: (message: string) => void,
    className?: string
}

export default function TextInput({ placeholder="", style, onChange, onSend, className }: TextInputProps) {
    const [message, setMessage] = useState("")

    return (
        <div>
            <input
            type="text"
            placeholder={placeholder}
            value={message}
            className={`text-base p-1 px-2 border-b-1 ${className}`}
            style={{
                minWidth: 0,
                ...style
            }}
            onChange={(event) => {
                setMessage(event.target.value)
                if (onChange) {
                    onChange(event)
                }
            } }
            >
            </input>
            <button
            onClick={(event) => {
                if (onSend) {
                    onSend(message)
                }
            }}
            >
                send
            </button>
        </div>
    )
}