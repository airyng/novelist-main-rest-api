const getItemByIdMiddleware = require('../../middlewares/getItemById')
const setUpdatedAtToBodyMiddleware = require('../../middlewares/setUpdatedAtToBody')

class DefaultController {
  // Основная модель взаимодействующая с контроллером
  model = null
  // Структура взаимосвязи методов с посредниками
  // ключ - имя вызываемого метода
  // значение - массив посредников, которые должны вызваться перед ключевым колбеком
  middlewaresRelations = {
    getItem: [getItemByIdMiddleware],
    update: [getItemByIdMiddleware, setUpdatedAtToBodyMiddleware],
    delete: [getItemByIdMiddleware],
  }

  constructor (model) {
    if (!model) throw new Error('DefaultController require to have model as first argument')

    this.model = model
  }

  /**
   * Метод формирующий цепочку обработчиков запроса в виде массива.
   * Первыми методами подставляются "посредники", которые связаны с основным обработчиком запроса - последним элементом массива
   * @param {String} methodName Название метода, который должен обработать запрос
   * @returns {Array} Массив методов, которые будут выполняться последовательно для корректной обработки запроса
   */
  do (methodName) {
    if (typeof this[methodName] !== 'function') throw new Error('Given value isn\'t an existent function name')

    const methodsChain = []

    if (this.middlewaresRelations[methodName]?.length) {
      this.middlewaresRelations[methodName].map(getMiddleware => {
        if (typeof getMiddleware === 'function') {
          methodsChain.push(getMiddleware(this.model))
        }
      })
    }
    methodsChain.push(this[methodName].bind(this))

    return methodsChain
  }

  /**
   * Обработчик запроса возвращающий запись по переданному идентификатору
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
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  async update (req, res) {

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