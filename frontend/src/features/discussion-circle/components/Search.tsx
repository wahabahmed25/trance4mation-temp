import { RED } from "@/app/discussion-circle/defaults"
import ImageButton from "./ImageButton"
import TextInput from "./TextInput"
import { ChangeEventHandler, MouseEventHandler } from "react"

interface SearchProps {
    onCreateButtonClick?: MouseEventHandler<HTMLImageElement> | undefined, 
    onQuery?: ChangeEventHandler<HTMLInputElement> | undefined
}

export default function Search({onCreateButtonClick, onQuery}: SearchProps) {
    return (
        <div 
        className="flex flex-col p-2 gap-2"
        style={{backgroundColor: RED}}
        >
            <div 
            className="flex w-full">
                <TextInput
                placeholder="Search"
                onChange={onQuery}
                style={{
                    flexGrow: 1
                }}
                />

                <ImageButton
                src={"/plus-regular-full.svg"}
                alt="Create Room"
                onClick={onCreateButtonClick}
                />
            </div>
        </div>
    )
}