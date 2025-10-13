import Image from "next/image";
import "./GameCard.css";

interface GameCardProps {
   title: string;
   image: string;
   description: string;
}

function GameCard({ title, image, description }: GameCardProps) {
   return (
      <div className="game-card">
         <h1 className="game-card-title">{title}</h1>
         <div className="game-card-image">
            <Image src={image} alt={title} width={300} height={300} />
         </div>
         <p className="game-card-description">{description}</p>
      </div>
   );
}

export default GameCard;
