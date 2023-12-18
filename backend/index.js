/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const Game = require('./models/game')



// let gameData = [
//     {
//         "gameTitle": "Minecraft",
//         "score": 4,
//         "progress": "Finished",
//         "id": 1
//     },
//     {
//         "gameTitle": "Dota 2",
//         "score": 5,
//         "progress": "Not Playing",
//         "id": 2
//     },
//     {
//         "gameTitle": "Roblox",
//         "score": 9,
//         "progress": "Playing",
//         "id": 3
//     },
//     {
//         "gameTitle": "Team Fortress 2",
//         "score": 9,
//         "progress": "Not Playing",
//         "id": 4
//     },
//     {
//         "gameTitle": "Portal 2",
//         "score": 8,
//         "progress": "Finished",
//         "id": 5
//     },
//     {
//         "gameTitle": "Baldur's Gate",
//         "score": 10,
//         "progress": "Playing",
//         "id": 6
//     }
// ]

app.get('/api/gamedata', (request, response) => {
    Game.find({}).then(games => {
        response.json(games)
    })

})

app.get('/api/gamedata/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // const game = gameData.find(game => game.id === id)

    Game.findById(request.params.id).then(game => {
        if (game) {
            response.json(game)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => {
            next(error)
        })
})

app.delete('/api/gamedata/:id', (request, response, next) => {

    Game.findByIdAndDelete(request.params.id).then(game => {
        response.status(204).end()
    })
        .catch(error => next(error))


})

app.post('/api/gamedata', (request, response) => {

    const body = request.body

    // if (game.content === undefined) {
    //     return response.status(400).json({ error: 'content missing' })
    // }

    console.log(body)

    const game = new Game({
        gameTitle: body.gameTitle,
        score: body.score,
        progress: body.progress
    })

    game.save().then(savedGame => {
        response.json(savedGame)
    })
})

app.put('/api/gamedata/:id', (request, response, next) => {
    const body = request.body

    const game = {
        gameTitle: body.gameTitle,
        score: body.score,
        progress: body.progress
    }

    Game.findByIdAndUpdate(request.params.id, game, { new: true })
        .then(updatedGame => {
            response.json(updatedGame)
        })
        .catch(error => next(error))

})

// need to add put request for updating a speicfic game

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})