const gameController = require.main.require('./controllers/game')

module.exports = function (router) {
  
  // Getting all games that belongs authenticated user
  router.get('/games/my', gameController.do('getAuthUserItems'))

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
}