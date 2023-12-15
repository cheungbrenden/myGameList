/* eslint-disable react/prop-types */
const GameForm = ({sortedFilteredData, newGame, newScore, newProgress, editGameId, addGame, editGame, handleGameChange, handleScoreChange, handleProgressChange, handleCancelEdit}) => {
    if (editGameId === '') {
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

    

    return (
        <form className="form" onSubmit={editGame}>
                <div className="form-item">
                    Game Title: {sortedFilteredData.find(game => game.id === editGameId).gameTitle}
                </div>
                <div className="form-item">
                    Score (out of 10): <input required value={newScore} onChange={handleScoreChange}/>
                </div>
                <div className="form-item">
                    Progress: (want to make this a dropdown)<input required value={newProgress} onChange={handleProgressChange}/>
                </div>
                <div className="form-item">
                    <button onClick={handleCancelEdit}>Cancel</button> <button type="submit">Edit Game</button> 
                </div>
    
        </form>
    )
    
    
    
    
}

export default GameForm