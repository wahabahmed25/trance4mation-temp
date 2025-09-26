import { MessageData } from "@/features/discussion-circle/types/MessageData";
import { BLUE, TEAL } from "@/app/discussion-circle/defaults";

export default function ChatMessage({message}: {message: MessageData}) {
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