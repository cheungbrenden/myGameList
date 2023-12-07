/* eslint-disable react/prop-types */
const GameForm = ({newGame, newScore, newProgress, addGame, handleGameChange, handleScoreChange, handleProgressChange}) => {
    return (
        <form className="form" onSubmit={addGame}>
            <div className="form-item">
                Game Title: <input required value={newGame} onChange={handleGameChange}/>
            </div>
            <div className="form-item">
                Score (out of 10): <input required value={newScore} onChange={handleScoreChange}/>
            </div>
            <div className="form-item">
                Progress: (want to make this a dropdown)<input required value={newProgress} onChange={handleProgressChange}/>
            </div>
            <div className="form-item">
                <button type="submit">Add Game</button>
            </div>

        </form>
    )
}

export default GameForm