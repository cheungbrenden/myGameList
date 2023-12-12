/* eslint-disable react/prop-types */
import TableHeader from "./table-headers"

const GameTable = ({sortedFilteredData, handleSortOrderChange, sortOrder, deleteGame, handleEditGameIdChange}) => {
    
    if (sortedFilteredData.length == 0) {
        return (
            <div className="search">
                No games match the search filter. 
            </div>
        )
    }


    return (
        <div>
            <table className="gameTable">
                <thead>
                    <tr>
                        <TableHeader headingId={'gameTitle'} text={"Game Title"} handleSortOrderChange={handleSortOrderChange} sortOrder={sortOrder}/>
                        <TableHeader headingId={'score'} text={"Score"} handleSortOrderChange={handleSortOrderChange} sortOrder={sortOrder}/>
                        <TableHeader headingId={'progress'} text={"Progress"} handleSortOrderChange={handleSortOrderChange} sortOrder={sortOrder}/>
                    </tr>
                </thead>
                <tbody>
                    {sortedFilteredData.map(game => {
                        return (
                            <tr key={game.id}>
                                <td>{game.gameTitle} <button onClick={() => handleEditGameIdChange(game.id)}>Edit</button> <button onClick={() => deleteGame(game.id)}>Delete</button></td>
                                <td>{game.score}</td>
                                <td>{game.progress}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GameTable