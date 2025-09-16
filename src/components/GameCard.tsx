function GameCard({ title, image, description }: { title: string, image: string, description: string }) {
    return (
        <div>
            <h1>{title}</h1>
            <img src={image} alt={title} />
            <p>{description}</p>
        </div>
    )
}

export default GameCard;