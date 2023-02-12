const scenesPositionsController = require.main.require('./controllers/scenesPositions')

module.exports = function (router, middlewares) {
  
  // Getting One game
  router.get(
    '/scenes-positions/:game_id',
    middlewares.authenticateToken,
    scenesPositionsController.endpoint('getByGameId')
)

  // Creating one game
  router.post(
    '/scenes-positions',
    middlewares.authenticateToken,
    scenesPositionsController.endpoint('saveScenesPositions')
  )
}