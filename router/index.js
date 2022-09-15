const express = require('express')
const router = express.Router()

const gameController = require('../controllers/game')

// [Games - Start]

// Getting all games
router.get('/games', gameController.do('getItems'))

// Getting One game
router.get('/games/:id', gameController.do('getItem'))

// Creating one game
router.post('/games', gameController.do('create'))

// Updating One game
router.patch('/games/:id', gameController.do('update'))

// Deleting One game
router.delete('/games/:id', gameController.do('delete'))

// [Games - End]

module.exports = router