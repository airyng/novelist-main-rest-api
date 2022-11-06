const User = require('../models/user.js')

module.exports = async function (req, res, next) {
  
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)
  const user = await User.findByToken(token)

  if (!user) { return res.sendStatus(403) }
  req.user = user

  next()
}