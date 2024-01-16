const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = "CoderSecretoJsonWebToken"

//una fn parra generar una firma

const createToken = user => {
    const token = jwt.sign(user, JWT_PRIVATE_KEY, { expireIn: '1d' })
    return token
}
//middleware
const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['Authorization']

    if (!authHeader) res.status(401).json({ status: 'error', error: 'no se pudo autentificar' })

    const token = authHeader.split('')[1]

    jwt.verify(token, JWT_PRIVATE_KEY, (err, userDecode) => {
        if (err) return res.status(401).json({ status: 'error', error: 'no se pudo autorizar' })
        req, user = userDecode
        next()

    })
}

module.exports = {
    createToken,
    authenticationToken,
    JWT_PRIVATE_KEY
}