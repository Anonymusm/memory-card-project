export default function Board({ score, bestScore }) {
    return (
        <div className="board">
            <h2>Your scoring history: </h2>
            <div>
            <p>Score: {score}</p>
            <p>Best score: {bestScore}</p>
            </div>
        </div>
    )
}