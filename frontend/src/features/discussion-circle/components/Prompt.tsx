import { useEffect, useState } from "react"

const letterDelay = 10
const sentenceEndDelay = 300
const commaDelay = 200

export default function Prompt({prompt}: {prompt: string}) {
    const [currentPrompt, setCurrentPrompt] = useState<string>("")
    const [text, setText] = useState<string>("")
    
    useEffect(() => {
        if (prompt != currentPrompt) {
            setText("")
            setCurrentPrompt(prompt)
        }
    }, [prompt, currentPrompt])

    useEffect(() => {
        const nextChar = currentPrompt.charAt(text.length)
        const previousChar = currentPrompt.charAt(text.length - 1)
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

        const timeout = setTimeout(() => {
            setText(text + nextChar)
        }, nextLetterDelay)

        return () => {
            clearTimeout(timeout)
        }
    }, [text, currentPrompt])

    return (
        <div>
            {text}
        </div>
    )
}