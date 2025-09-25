import { Message } from "@/features/discussion-circle/types/Message";
import { BLUE, TEAL, YELLOW } from "@/app/discussion-circle/defaults";

export default function ChatMessage({message}: {message: Message}) {
    return (
        <div 
        className="rounded-sm p-1 px-2 border-1"
        style={{
            backgroundColor: BLUE,
            borderColor: TEAL
        }}
        >
            {message.text} - {message.sender.name}
        </div>
    )
}