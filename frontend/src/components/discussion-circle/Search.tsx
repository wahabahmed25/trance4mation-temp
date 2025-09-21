import Image from "next/image"

export default function Search() {
    return (
        <div className="flex w-full bg-blue-300 p-2">
            <input
            type="text"
            placeholder="Room Code"
            className="bg-blue-200 rounded-full text-base p-1 px-2 w-full"
            >
            </input>
            
            <Image
            src={"/plus-regular-full.svg"}
            alt="Create Room"
            width={30}
            height={30}
            priority
            />
        </div>
    )
}