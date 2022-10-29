const sexController = require.main.require('./controllers/sex')

module.exports = function (router) {
  
  // Getting all sex
  router.get('/sex', sexController.do('getItems'))
  
  // Getting One sex
  // router.get('/sex/:id', sexController.do('getItem'))

  // Creating one sex
  // router.post('/sex', sexController.do('create'))

  // Deleting One sex
  // router.delete('/sex/:id', sexController.do('delete'))
}