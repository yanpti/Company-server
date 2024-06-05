const {City} = require('../models/models')
const ApiError=require('../error/apierror')
class CityController{
    async create(req, res){
        const {name} = req.body
        const city = await City.create({name})
        return res.json(city)
    }

    async getAll (req, res){
        const city=await City.findAll()
        return res.json(city)
    }

}

module.exports=new CityController()