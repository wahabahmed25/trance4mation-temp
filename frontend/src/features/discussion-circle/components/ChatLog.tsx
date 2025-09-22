import { Message } from "@/features/discussion-circle/types/Message"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"

export default function ChatLog({messages}: {messages: Message[]}) {
    return (
        <div className="flex flex-col gap-2 bg-blue-100 p-2 grow justify-end">
            <div className="flex flex-col gap-2 items-start">
                {messages.map((message) => <ChatMessage message={message} key={message.id}/>)}
            </div>
            <ChatInput/>
        </div>
    )
}