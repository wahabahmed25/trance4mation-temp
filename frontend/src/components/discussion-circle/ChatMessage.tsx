import { Message } from "@/types/Message";

export default function ChatMessage({message}: {message: Message}) {
    return (
        <div className="bg-blue-300 rounded-sm p-1 px-2">
            {message.text} - {message.sender.name}
        </div>
    )
}