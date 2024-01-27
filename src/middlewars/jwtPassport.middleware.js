exports.authorizationJwt = roleArray => {
    return async (req, res, next) => {
        try {
            if (!req.user) return res.status(401).send({ error: 'no autorizado' })
            // if(req.user.role !== role) return res.status(401).send({error:'no tiene permiso'})
            // if(roleArray[0] === '')
            if (!roleArray.include(req.user.role.toUpperCase())) return res.status(401).send({ error: 'no tiene permiso' })
            next()
            
        } catch (error) {
            next(error)
        }
    }
}