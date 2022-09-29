const DefaultController = require("./classes/default")
const User = require('../models/user')

class UserController extends DefaultController {

  constructor (model) {
    super(model)
    this.middlewaresRelations.getItem = []
  }

  /**
   * Обработчик запроса возвращающий все записи
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
   async getItems (req, res) {
    try {
      const items = await this.model.find()
                      .populate('role')
                      .populate('sex')
      res.json(items)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  /**
   * Обработчик запроса возвращающий запись по переданному идентификатору
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  async getItem (req, res) {
    if (!req.params.id) {
      res.status(400)
      return
    }

    let item
    try {
      item = await this.model.findById(req.params.id)
              .populate('role')
              .populate('sex')
      
      if (item == null) {
        return res.status(404).json({ message: `Cannot find ${this.model.name} by given id` })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.json(item)
  }
}

module.exports = new UserController(User)