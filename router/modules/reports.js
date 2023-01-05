const reportsController = require.main.require('./controllers/reports')
const Report = require.main.require('./models/report')

module.exports = function (router, middlewares) {
  
  // Getting all reports
  router.get('/reports', reportsController.endpoint('getItems'))
  
  // Getting One report
  router.get('/reports/:id', middlewares.getItemById(Report), reportsController.endpoint('getItem'))

  // Creating one report
  router.post('/reports', reportsController.endpoint('create'))

  // Deleting One sex
  router.delete(
    '/reports/:id',
    middlewares.authenticateToken,
    middlewares.isUserAdmin,
    middlewares.getItemById(Report),
    reportsController.endpoint('delete')
  )
}