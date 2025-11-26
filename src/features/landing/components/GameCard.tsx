import Image from "next/image";
import "./GameCard.css";
import Link from "next/link";
// import { Link } from "lucide-react";

interface GameCardProps {
   title: string;
   image: string;
   description: string;
   path: string;
}

function GameCard({ title, image, description, path }: GameCardProps) {
   return (
      <Link href={path}>
         <div className="game-card">
            <h3 className="game-card-title">{title}</h3>
            <div className="game-card-image">
               <Image src={image} alt={title} width={300} height={300} />
            </div>
            <p className="game-card-description">{description}</p>
         </div>
      </Link>
   );
}

export default GameCard;
