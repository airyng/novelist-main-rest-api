const BaseController = require('./classes/Base')
const Authenticator = require('../helpers/Authenticator')
const Encryptor = require('../helpers/Encryptor')
const User = require('../models/user')

class AuthenticateController extends BaseController {
  
  middlewaresRelations = {}

  constructor () {
    super()
  }

  token (req, res) {
    const refreshToken = req.body.refresh_token

    if (refreshToken == null) return res.sendStatus(401)

    const newAccessToken = Authenticator.refreshAccessToken(refreshToken)

    return newAccessToken ? res.json(newAccessToken) : res.sendStatus(403)
  }

  logout (req, res) {
    if (req.body.refresh_token) {
      Authenticator.signOut(req.body.refresh_token)
    }
    res.sendStatus(204)
  }

  // Authenticate User
  async login (req, res) {
    if (req.headers['authorization']) { return res.sendStatus(403) }

    const user = await User.findOne({email: req.body.email })
    if (!user) return res.sendStatus(404)

    if (Encryptor.verify(req.body.password, user.passwordHash)) {
      return res.json( Authenticator.signIn(user._id) ) // Authenticator.login returns object with tokens
    }
    return res.sendStatus(404)
  }

  async register (req, res) {
    if (req.headers['authorization']) { return res.sendStatus(403) }

    try {
      const user = await User.create({
        ...req.body.user,
        passwordHash: req.body.user?.password ? Encryptor.hash(req.body.user.password) : null
      })
      return res.json(user)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

module.exports = new AuthenticateController()