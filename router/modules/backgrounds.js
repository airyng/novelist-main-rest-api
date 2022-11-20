const backgroundController = require.main.require('./controllers/background')
const Background = require.main.require('./models/background')

module.exports = function (router, middlewares) {
  
  // Getting all backs
  router.get('/backgrounds', backgroundController.getItems.bind(backgroundController))
  
  // Updating One user
  // router.patch('/backgrounds/:id', middlewares.authenticateToken, middlewares.getItemById(User), userController.update.bind(userController))

  // Creating one back
  router.post('/backgrounds', backgroundController.create.bind(backgroundController))

  // Updating One back
  router.patch('/backgrounds/:id', middlewares.getItemById(Background), backgroundController.update.bind(backgroundController))

  // Deleting One back
  router.delete('/backgrounds/:id', middlewares.getItemById(Background), backgroundController.delete.bind(backgroundController))
}