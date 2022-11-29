module.exports = {
  common: {
    getItemById: require.main.require('./middlewares/getItemById'),
    authenticateToken: require.main.require('./middlewares/authenticateToken'),
    isUserAdmin: require.main.require('./middlewares/isUserAdmin'),
  },
  global: {
    cors: require.main.require('./middlewares/cors')
  }
}