import { MessageData } from "@/features/discussion-circle/types/MessageData";

export default function ChatMessage({message}: {message: MessageData}) {
    return (
        <div 
        className="rounded-sm p-1 px-2 border-1"
        >
            {message.text} - {message.sender}
        </div>
    )
}