const DefaultController = require('./classes/Default')
const ScenesPositions = require.main.require('./models/scenesPositions')

class ScenesPositionsController extends DefaultController {

  constructor (model) {
    super(model)
  }

  /**
   * Возращаем позиции сцен для конструктора по идентификатору игры
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  async getByGameId (req, res) {
    if (!req.params.game_id) {
      res.status(400)
      return
    }

    let item
    try {
        item = await ScenesPositions.findOne({game_id: req.params.game_id })
        if (!item) return res.sendStatus(404)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.json(item)
  }

  /**
   * Сохраняем позиции сцен для конструктора по идентификатору игры
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  async saveScenesPositions (req, res) {
    console.log(req.body)
    if (!req.body.game_id) {
      res.status(400)
      return
    }

    let item
    try {
        item = await ScenesPositions.findOne({game_id: req.body.game_id })
        if (!item) {
            // create new
            item = new this.model({ ...req.body })
            const newItem = await item.save()
            res.status(201).json(newItem)
        } else {
            // update
            res.item = item
            super.update(req, res)
        }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}

module.exports = new ScenesPositionsController(ScenesPositions)