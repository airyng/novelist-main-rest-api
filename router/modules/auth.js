const authController = require.main.require('./controllers/authenticate')

module.exports = function (router, middlewares) {
  
  router.post('/register', authController.register)

  router.post('/login', authController.login)

  // Update access token by refresh token
  router.post('/token', authController.token)

  router.delete('/logout/:token', authController.logout)
}