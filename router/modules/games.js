const gameController = require.main.require('./controllers/game')
const Game = require.main.require('./models/game')

module.exports = function (router, middlewares) {
  
  // Getting all games that belongs authenticated user
  router.get('/games/my', middlewares.authenticateToken, gameController.getAuthUserItems.bind(gameController))

  // Getting all games
  router.get('/games', gameController.getItems.bind(gameController))

  // Getting One game
  router.get('/games/:id', middlewares.getItemById(Game), gameController.getItem.bind(gameController))

  // Creating one game
  router.post('/games', gameController.create.bind(gameController))

  // Updating One game
  router.patch('/games/:id', middlewares.getItemById(Game), gameController.update.bind(gameController))

  // Deleting One game
  router.delete('/games/:id', middlewares.getItemById(Game), gameController.delete.bind(gameController))
}