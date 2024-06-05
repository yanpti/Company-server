const Router = require('express')
const router = new Router()
const newsRout=require('./newsRout')
const typeRout=require('./typeRout')
const userRout=require('./userRout')
const cityRout=require('./cityRout')

router.use('/user', userRout)
router.use('/type', typeRout)
router.use('/city', cityRout)
router.use('/news',newsRout)


module.exports=router