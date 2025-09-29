import { MessageData } from "@/features/discussion-circle/types/MessageData"
import ChatMessage from "./ChatMessage"

export default function ChatLog({messages}: {messages: MessageData[]}) {
    return (
        <div 
        className="flex flex-col gap-2"
        // style={{backgroundColor: "white"}}
        >
            <div className="flex flex-col gap-2 items-start">
                {messages.map((message) => <ChatMessage message={message} key={message.id}/>)}
            </div>
        </div>
    )
}