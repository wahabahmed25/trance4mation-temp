import './GameCard.css';

function GameCard({ title, image, description }: { title: string, image: string, description: string }) {
    return (
        <div className="game-card">
            <h1 className="game-card-title">{title}</h1>
            <img className="game-card-image" src={image} alt={title} />
            <p className="game-card-description">{description}</p>
        </div>
    )
}

export default GameCard;