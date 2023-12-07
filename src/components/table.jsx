/* eslint-disable react/prop-types */
const GameTable = ({filteredData}) => {

    return (
        <div>
            <table className="gameTable">
                <thead>
                    <tr>
                        <th>Game Title</th>
                        <th>Score</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.gameTitle}</td>
                                <td>{val.score}</td>
                                <td>{val.progress}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GameTable