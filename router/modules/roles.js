const roleController = require.main.require('./controllers/role')
// const Role = require.main.require('./models/role')

module.exports = function (router, middlewares) {
  
  // Getting all roles
  router.get('/roles', roleController.endpoint('getItems'))

  // Getting One role
  // router.get('/roles/:id', middlewares.getItemById(Role), roleController.getItem)

  // Creating one role
  // router.post('/roles', middlewares.getItemById(Role), roleController.create)

  // Deleting One role
  // router.delete('/roles/:id', middlewares.getItemById(Role), roleController.delete)
}