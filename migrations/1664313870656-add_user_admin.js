const User = require('../models/user')
const Role = require('../models/role')
const Sex = require('../models/sex')

const admin = {
  name: 'Admin',
  email: 'airyng@yandex.ru',
  avatar_id: null,
  sex: null, // male
  role: null // admin
}

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  try {
    const sex = await this('sex', Sex.schema).findOne({title: 'male'})
    const role = await this('role', Role.schema).findOne({title: 'admin'})
    admin.sex = sex?._id || null
    admin.role = role?._id || null
    await this('user', User.schema).create(admin)
  } catch (err) {
    throw new Error(err?.message)
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  try {
    await this('user', User.schema).deleteOne({ email: admin.email })
  } catch (err) {
    throw new Error(err?.message)
  }
}

module.exports = { up, down };
