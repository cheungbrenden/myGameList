/* eslint-disable no-undef */
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let gameData = [
    {
        "gameTitle": "Minecraft",
        "score": 4,
        "progress": "Finished",
        "id": 1
    },
    {
        "gameTitle": "Dota 2",
        "score": 5,
        "progress": "Not Playing",
        "id": 2
    },
    {
        "gameTitle": "Roblox",
        "score": 9,
        "progress": "Playing",
        "id": 3
    },
    {
        "gameTitle": "Team Fortress 2",
        "score": 9,
        "progress": "Not Playing",
        "id": 4
    },
    {
        "gameTitle": "Portal 2",
        "score": 8,
        "progress": "Finished",
        "id": 5
    },
    {
        "gameTitle": "Baldur's Gate",
        "score": 10,
        "progress": "Playing",
        "id": 6
    }
]

app.get('/api/gamedata', (request, response) => {
    response.json(gameData)
})

app.get('/api/gamedata/:id', (request, response) => {
    const id = Number(request.params.id)
    const game = gameData.find(game => game.id === id)

    if (game) {
        response.json(game)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/gamedata/:id', (request, response) => {
    const id = Number(request.params.id)
    gameData = gameData.filter(game => game.id !== id)

    response.status(204).end()
})

app.post('/api/gamedata', (request, response) => {
    const game = request.body
    game.id = Math.floor(Math.random() * 100000)
    gameData = gameData.concat(game)
    response.json(game)
})

// app.put('/api/gamedata/:id', (request, response) => {

// })

// need to add put request for updating a speicfic game

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})