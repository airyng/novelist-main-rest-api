const Role = require('../models/role')

// Array of data
const roles = [
  {title: 'guest'},
  {title: 'user'},
  {title: 'admin'}
]

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  try {
    for (let index = 0; index < roles.length; index++) {
      await this('role', Role.schema).create(roles[index])
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
    for (let index = 0; index < roles.length; index++) {
      await this('role', Role.schema).deleteOne(roles[index])
    }
  } catch (err) {
    throw new Error(err?.message)
  }
}

module.exports = { up, down };
