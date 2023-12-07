/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'
import GameForm from "./components/form"
import GameTable from "./components/table"

const App = () => {
  const [data, setData] = useState([])
  const [newGame, setNewGame] = useState('')
  const [newScore, setNewScore] = useState('')
  const [newProgress, setNewProgress] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/data')
      .then(response => {
        setData(response.data)
      })
  }, [])

  const filteredData = search.trim() == ''
    ? data
    : data.filter((game) => (game.gameTitle.toLowerCase()).includes(search.trim().toLowerCase()))


  const addGame = (e) => {
    e.preventDefault()
    
    const gameObject = {
      gameTitle: newGame,
      score: newScore,
      progress: newProgress
    }

    axios
      .post('http://localhost:3001/data', gameObject)
      .then(response => {
        setData(data.concat(gameObject))
        setNewGame('')
        setNewScore('')
        setNewProgress('')

      })

  }

  const handleGameChange = (e) => {
    setNewGame(e.target.value)
  }

  const handleScoreChange = (e) => {
    setNewScore(e.target.value)
  }

  const handleProgressChange = (e) => {
    setNewProgress(e.target.value)
  }

  const handleSearchChange = (e) => {
    console.log(search)
    console.log(filteredData)
    setSearch(e.target.value)
  }



  return (
    <>
      <h1 className="text-centered">myGameList</h1>
      <SearchGame search={search} handleSearchChange={handleSearchChange}/>
      <GameTable filteredData={filteredData} />
      <GameForm
        newGame={newGame}
        newScore={newScore}
        newProgress={newProgress}
        addGame={addGame}
        handleGameChange={handleGameChange}
        handleScoreChange={handleScoreChange}
        handleProgressChange={handleProgressChange}
      />
    </>
  )
}

const SearchGame = ({search, handleSearchChange}) => {
  return (
    <div className='search'>
      Search: <input value={search} onChange={handleSearchChange}/>
    </div>
    
  )
}



export default App