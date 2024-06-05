const uuid = require('uuid')
const path=require('path')
const {News, NewsInfo}=require('../models/models')
const ApiError = require('../error/apierror')

class NewsController{
    async create(req, res, next){
        try{
        let {name, text, cityId, typeId, info }=req.body
        const {img} = req.files
        let fileName=uuid.v4()+".jpg"
        img.mv(path.resolve(__dirname, '..','static',fileName))
        const news = await News.create({name, text, cityId, typeId, img: fileName});

        if(info){
            info=json.parse(info)
            info.forEach(i => {
                NewsInfo.create({
                    title: i.title,
                    text: i.text,
                    newsId: news.id
                })
                
            });
        }

        return res.json(news)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll (req, res){
        let {cityId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 3
        let offset = page*limit-limit

        let news;
        if (!cityId && !typeId){
            news = await News.findAndCountAll({limit, offset})
        }
        if (cityId && !typeId){
            news = await News.findAndCountAll({where:{cityId}, limit, offset})
        }
        if (!cityId && typeId){
            news = await News.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (cityId && typeId){
            news = await News.findAndCountAll({where:{cityId, typeId}, limit, offset})
        }
        return res.json(news)
    }

    async getOne (req, res){
        const {id} = req.params
        const news = await News.findOne(
            {
                where: {id},
                include:[{model:NewsInfo, as: 'info'}]
            },

        )
        return res.json (news)

    }

}

module.exports=new NewsController()