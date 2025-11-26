import { useEffect, useState } from "react";

const letterDelay = 10;       // milliseconds to wait between displaying each letter
const sentenceEndDelay = 300; // milliseconds to wait after displaying a "!", ".", or "?"
const commaDelay = 200;       // milliseconds to wait after displaying a comma

export default function Prompt({ prompt }: { prompt: string }) {
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (prompt != currentPrompt) {
      setText("");
      setCurrentPrompt(prompt);
      console.log("changing prompt");
      return;
    }

    const nextChar = currentPrompt.charAt(text.length);
    const previousChar = currentPrompt.charAt(text.length - 1);
    // console.log(text.length, nextChar)
    if (nextChar === "") {
      return;
    }

    let nextLetterDelay = letterDelay;
    if (["!", ".", "?"].includes(previousChar)) {
      nextLetterDelay = sentenceEndDelay;
    }
    if ([","].includes(previousChar)) {
      nextLetterDelay = commaDelay;
    }

    const timeout = setTimeout(() => {
      setText(text + nextChar);
    }, nextLetterDelay);

    return () => {
      clearTimeout(timeout);
      console.log("clear timeout");
    };
  }, [text, currentPrompt, prompt]);

  return <div>{text}</div>;
}
