const Sex = require('../models/sex')

// Array of data
const sexes = [
  {title: 'male'},
  {title: 'female'}
]

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  try {
    for (let index = 0; index < sexes.length; index++) {
      await this('sex', Sex.schema).create(sexes[index])
    }
  } catch (err) {
    throw new Error(err?.message)
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  try {
    for (let index = 0; index < sexes.length; index++) {
      await this('sex', Sex.schema).deleteOne(sexes[index])
    }
  } catch (err) {
    throw new Error(err?.message)
  }
}

module.exports = { up, down };
