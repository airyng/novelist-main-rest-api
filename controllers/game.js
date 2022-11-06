const DefaultController = require('./classes/Default')
const Game = require.main.require('./models/game')

class GameController extends DefaultController {

  constructor (model) {
    super(model)
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
      item = await this.model
              .findById(req.params.id)
              .populate('author', ['name', 'avatar_id'])
      
      if (item == null) {
        return res.status(404).json({ message: `Cannot find ${this.model.name} by given id` })
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
                      .populate('author', ['name', 'avatar_id'])
      res.json(items)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  /**
   * Обработчик запроса возвращающий записи авторизованного пользователя
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
   async getAuthUserItems (req, res) {
    try {
      const items = await this.model
                      .find({ author: req.user._id })
      res.json(items)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = new GameController(Game)