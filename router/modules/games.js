const gameController = require.main.require('./controllers/game')
const Game = require.main.require('./models/game')

module.exports = function (router, middlewares) {
  
  // Getting all games that belongs authenticated user
  router.get('/games/my', middlewares.authenticateToken, gameController.endpoint('getAuthUserItems'))

  // Getting all games
  router.get('/games', gameController.endpoint('getItems'))

  // Getting One game
  router.get('/games/:id', middlewares.getItemById(Game), gameController.endpoint('getItem'))

  // Creating one game
  router.post('/games', gameController.endpoint('create'))

  // Updating One game
  router.patch('/games/:id', middlewares.getItemById(Game), gameController.endpoint('update'))

  // Deleting One game
  router.delete('/games/:id', middlewares.getItemById(Game), gameController.endpoint('delete'))
}