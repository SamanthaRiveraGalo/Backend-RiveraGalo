const {Router} =  require('express')

const router = Router()

router.get('/', (req,res)=>{
    req.logger.error('alerta')
    res.send('logger')
})

module.exports = router