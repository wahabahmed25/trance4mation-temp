import { useEffect, useState } from "react"

const letterDelay = 10
const sentenceEndDelay = 300
const commaDelay = 200

export default function Prompt({prompt}: {prompt: string}) {
    const [text, setText] = useState<string>("")
    
    useEffect(() => {
        setText("")
    }, [prompt])

    useEffect(() => {
        const nextChar = prompt.charAt(text.length)
        const previousChar = prompt.charAt(text.length - 1)
        console.log(text.length, nextChar)
        if (nextChar === "") {
            return
        }

        let nextLetterDelay = letterDelay
        if (["!", ".", '?'].includes(previousChar)) {
            nextLetterDelay = sentenceEndDelay
        }
        if ([","].includes(previousChar)) {
            nextLetterDelay = commaDelay
        }

        setTimeout(() => {
            setText(text + nextChar)
        }, nextLetterDelay)
    }, [text, prompt])

    return (
        <div>
            {text}
        </div>
    )
}