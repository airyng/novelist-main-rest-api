const BaseController = require.main.require('./controllers/classes/Base')

class DefaultController extends BaseController {
  // Основная модель взаимодействующая с контроллером
  model = null

  constructor (model) {
    super()
    if (!model) throw new Error('DefaultController require to have model as first argument')
    this.model = model
  }

  /**
   * Обработчик запроса возвращающий запись по переданному идентификатору
   * Для использования этого метода необходимо подключить посредник "getItemById"
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  getItem (req, res) {
    res.json(res.item)
  }

  /**
   * Обработчик запроса возвращающий все записи
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  async getItems (req, res) {
    try {
      const items = await this.model.find()
      res.json(items)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req, res) {
    const item = new this.model({ ...req.body })
    try {
      const newItem = await item.save()
      res.status(201).json(newItem)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  /**
   * Обработчик запроса обновляющий все переданные из тела запроса,
   * если у модели есть такие же поля
   * Для использования этого метода необходимо подключить посредник "getItemById"
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  async update (req, res) {

    if (!req.body.updated_at) {
      req.body.updated_at = Date.now()
    }

    Object.keys(req.body).map(key => {
      if (req.body[key] !== undefined && res.item[key] !== undefined) {
        res.item[key] = req.body[key]
      }
    })

    try {
      const updatedItem = await res.item.save()
      res.json(updatedItem)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  /**
   * Обработчик запроса удаляющий запись по id
   * Для использования этого метода необходимо подключить посредник "getItemById"
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  async delete (req, res) {
    try {
      await res.item.remove()
      res.json({ message: `Deleted ${this.model.name}` })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = DefaultController