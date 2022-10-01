const jwt = require('jsonwebtoken')

class Authenticator {

  //TODO: refresh токены надо бы хранить в бд, а не в оперативной памяти
  static #refreshTokens = []

  static signIn (userId) {
    const payload = { userId }

    const accessToken = this.#generateAccessToken(payload)
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
    this.#refreshTokens.push(refreshToken)

    return { accessToken, refreshToken }
  }

  static signOut (refreshToken) {
    this.#refreshTokens = this.#refreshTokens.filter(token => token !== refreshToken)
  }

  static refreshAccessToken (refreshToken) {
    if (!this.#refreshTokens.includes(refreshToken)) return false

    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) return false
      return { accessToken: this.#generateAccessToken(payload) }
    })
  }

  static decodeToken (accessToken) {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) { return false }
      return payload
    })
  }

  static #generateAccessToken (payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES}s` })
  }
}

module.exports = Authenticator