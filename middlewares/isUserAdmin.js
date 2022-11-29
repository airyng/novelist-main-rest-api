// This middleware should be run after 'authenticateToken' middleware
module.exports = function (req, res, next) {
  if (!req.user) {
    return res.status(403).json({ message: `Unauthorized user` })
  }
  if (req.user.role?.title !== 'admin') {
    return res.status(403).json({ message: `Your account have not enaugh permission` })
  }
  next()
}