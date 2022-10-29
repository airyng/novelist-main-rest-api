const DefaultController = require('./classes/Default')
const User = require('../models/user')
const authenticateTokenMiddleware = require.main.require('./middlewares/authenticateToken')
const getItemByIdMiddleware = require.main.require('./middlewares/getItemById')

class UserController extends DefaultController {

  constructor (model) {
    super(model)
    this.middlewaresRelations.getItem = []
    this.middlewaresRelations.getProfile = [authenticateTokenMiddleware]
    this.middlewaresRelations.update = [authenticateTokenMiddleware, getItemByIdMiddleware]
  }

  /**
   * Обработчик запроса возвращающий данные авторизованного пользователя
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  getProfile (req, res) {
    res.json(req.user)
  }

  /**
   * Обработчик запроса возвращающий запись по переданному идентификатору
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
   async getItem (req, res) {
    if (!req.params.id) {
      res.status(400).json({ message: `Cannot find user without id`, status: 400 })
      return
    }

    let item
    try {
      item = await this.model
              .findById(req.params.id)
              .select('-passwordHash')
              .populate('role')
              .populate('sex')
      
      if (item == null) {
        return res.status(404).json({ message: `Cannot find user by given id` })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.json(item)
  }

  /**
   * Обработчик запроса возвращающий все записи
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
   async getItems (req, res) {
    try {
      const items = await this.model
                      .find()
                      .select('-passwordHash')
                      .populate('role')
                      .populate('sex')
      res.json(items)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update (req, res) {
    if (res.item._id !== req.user._id && req.user.role?.title !== 'admin') {
      res.status(403).json({ message: 'Недостаточно прав для обновления данных профиля.', status: 403, debug: {
        item: res.item._id,
        user: req.user._id,
        role: req.user.role?.title
      } })
      return
    }
    super.update(req, res)
  }
}

module.exports = new UserController(User)