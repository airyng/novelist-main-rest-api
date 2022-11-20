const tagController = require.main.require('./controllers/tag')
const Tag = require.main.require('./models/tag')

module.exports = function (router, middlewares) {
  
  // Getting all tags
  router.get('/tags', tagController.endpoint('getItems'))
  
  // Getting One tag
  // router.get('/tags/:id', middlewares.getItemById(Tag), sexController.getItem)

  // Creating one tag
  router.post('/tags', tagController.endpoint('create'))

  // Updating One tag
  router.patch('/tags/:id', middlewares.getItemById(Tag), tagController.endpoint('update'))

  // Deleting One tag
  router.delete('/tags/:id', middlewares.getItemById(Tag), tagController.endpoint('delete'))
}