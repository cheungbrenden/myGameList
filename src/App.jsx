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
  const [sortOrder, setSortOrder] = useState(['progress', 'decreasing'])

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


  const progressOrder = ['Playing', 'Finished', 'Not Playing'];

  const sortFunction = (direction) => (a, b) => {

    if (sortOrder[0] == 'gameTitle') {
      const nameA = a.gameTitle.toUpperCase()
      const nameB = b.gameTitle.toUpperCase()

      if ((nameA > nameB && direction == "decreasing") || (nameA < nameB && direction == "increasing")) {
        return -1
      }
      return 1
    }

    else if (sortOrder[0] == 'score') {
      if ((a.score > b.score && direction == "increasing") || (a.score < b.score && direction == "decreasing")) {
        return -1
      }
      return 1
    }

    else if (sortOrder[0] == 'progress') {

      if (a.progress == b.progress) {
        return direction == "increasing" ? a.gameTitle.localeCompare(b.gameTitle) : b.gameTitle.localeCompare(a.gameTitle)
      }

      return direction == "increasing"
        ? progressOrder.indexOf(a.progress) - progressOrder.indexOf(b.progress)
        : progressOrder.indexOf(b.progress) - progressOrder.indexOf(a.progress)

    }


  }

  const sortFilteredData = () => {

    if (sortOrder[0] == 'default') {
      return filteredData
    }

    return sortOrder[1] == 'decreasing'
      ? filteredData.toSorted(sortFunction('increasing'))
      : filteredData.toSorted(sortFunction('decreasing'))

  }

  const sortedFilteredData = sortFilteredData()

  const addGame = (e) => {
    e.preventDefault()

    const gameObject = {
      gameTitle: newGame.trim(),
      score: newScore,
      progress: newProgress
    }

    axios
      .post('http://localhost:3001/data', gameObject)
      .then(response => {
        setData(data.concat(response.data))
        setNewGame('')
        setNewScore('')
        setNewProgress('')
      })
  }

  const deleteGame = (id) => {
    axios
      .delete(`http://localhost:3001/data/${id}`)
      .then(response => {
        setData(data.filter((game) => game.id !== id))
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
    setSearch(e.target.value)
  }

  const handleSortOrderChange = (category) => {

    if (sortOrder[0] == category) {
      const changedSortOrder = sortOrder[1] == 'decreasing'
        ? 'increasing'
        : 'decreasing'

      setSortOrder([category, changedSortOrder])
    }

    else {
      setSortOrder([category, 'decreasing'])
    }
  }



  return (
    <div id="everything">
      <h1 className="text-centered">myGameList</h1>
      <SearchGame search={search} handleSearchChange={handleSearchChange} />
      <GameTable
        sortedFilteredData={sortedFilteredData}
        handleSortOrderChange={handleSortOrderChange}
        sortOrder={sortOrder}
        deleteGame={deleteGame} />
      <GameForm
        newGame={newGame}
        newScore={newScore}
        newProgress={newProgress}
        addGame={addGame}
        handleGameChange={handleGameChange}
        handleScoreChange={handleScoreChange}
        handleProgressChange={handleProgressChange}
      />
    </div>
  )
}

const SearchGame = ({ search, handleSearchChange }) => {
  return (
    <div className='search'>
      Search: <input value={search} onChange={handleSearchChange} />
    </div>

  )
}



export default App