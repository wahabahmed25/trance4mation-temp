import Image from "next/image"

export default function Navbar() {
    return (
        <div className="bg-blue-400" style={{
            position: "relative",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Image 
            src={"/chevron-right-regular-full.svg"}
            alt="Sidebar"
            width={30}
            height={30}
            priority
            style={{
                position: "absolute",
                left: 0
            }}
            />

            <div className="flex justify-center" style={{width: 0}}>
                <div style={{minWidth: "60vw", textAlign: "center"}}>
                    Room name
                </div>
            </div>
            
            <Image 
                src={"/right-from-bracket-regular-full.svg"}
                alt="Leave"
                width={30}
                height={30}
                priority
                style={{
                    position: "absolute",
                    right: 0
                }}
            />
        </div>
    )
}