function corsMiddleware (req, res, next) {

  const availableOrigins = process.env.ALLOW_ORIGIN.split(',')
  
  res.append('Access-Control-Allow-Origin', availableOrigins)
  res.append('Access-Control-Allow-Methods', '*')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

module.exports = corsMiddleware
