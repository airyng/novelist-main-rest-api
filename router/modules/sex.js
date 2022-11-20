const sexController = require.main.require('./controllers/sex')
// const Sex = require.main.require('./models/sex')

module.exports = function (router, middlewares) {
  
  // Getting all sex
  router.get('/sex', sexController.endpoint('getItems'))
  
  // Getting One sex
  // router.get('/sex/:id', middlewares.getItemById(Sex), sexController.getItem)

  // Creating one sex
  // router.post('/sex', sexController.create)

  // Deleting One sex
  // router.delete('/sex/:id', middlewares.getItemById(Sex), sexController.delete)
}