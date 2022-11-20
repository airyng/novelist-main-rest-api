const backgroundController = require.main.require('./controllers/background')
const Background = require.main.require('./models/background')

module.exports = function (router, middlewares) {
  
  // Getting all backs
  router.get('/backgrounds', backgroundController.endpoint('getItems'))
  
  // Updating One user
  // router.patch('/backgrounds/:id', middlewares.authenticateToken, middlewares.getItemById(User), userController.update.bind(userController))

  // Creating one back
  router.post('/backgrounds', backgroundController.endpoint('create'))

  // Updating One back
  router.patch('/backgrounds/:id', middlewares.getItemById(Background), backgroundController.endpoint('update'))

  // Deleting One back
  router.delete('/backgrounds/:id', middlewares.getItemById(Background), backgroundController.endpoint('delete'))
}