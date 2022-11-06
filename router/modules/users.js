const userController = require.main.require('./controllers/user')
const User = require.main.require('./models/user')

module.exports = function (router, middlewares) {
  
  // Getting logged user data
  router.get('/profile', middlewares.authenticateToken, userController.getProfile.bind(userController))

  // Getting all users
  router.get('/users', userController.getItems.bind(userController))

  // Getting One user
  router.get('/users/:id', userController.getItem.bind(userController))

  // Updating One user
  router.patch('/users/:id', middlewares.authenticateToken, middlewares.getItemById(User), userController.update.bind(userController))
}