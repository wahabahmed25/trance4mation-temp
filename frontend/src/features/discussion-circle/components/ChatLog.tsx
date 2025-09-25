import { Message } from "@/features/discussion-circle/types/MessageData"
import ChatMessage from "./ChatMessage"
import ChatInput from "./TextInput"
import { YELLOW } from "@/app/discussion-circle/defaults"

export default function ChatLog({messages}: {messages: Message[]}) {
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