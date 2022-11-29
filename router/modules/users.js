const userController = require.main.require('./controllers/user')
const User = require.main.require('./models/user')

module.exports = function (router, middlewares) {
  
  // Getting logged user data
  router.get(
    '/profile',
    middlewares.authenticateToken,
    userController.endpoint('getProfile')
  )

  // Getting all users
  router.get('/users', userController.endpoint('getItems'))

  // Getting One user
  router.get('/users/:id', userController.endpoint('getItem'))

  // Updating One user
  router.patch(
    '/users/:id',
    middlewares.authenticateToken,
    middlewares.getItemById(User),
    userController.endpoint('update')
  )
}