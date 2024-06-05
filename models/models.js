const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email:{type: DataTypes.STRING, unique: true},
    password:{type: DataTypes.STRING},
    role:{type: DataTypes.STRING, defaultValue:"USER"},
})

const Basket = sequelize.define('basket',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const BasketNews = sequelize.define('basket_news',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const News = sequelize.define('news',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique: true},
    text:{type: DataTypes.STRING},
    img:{type: DataTypes.STRING},
})

const Type = sequelize.define('type',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique: true},
})

const City = sequelize.define('city',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique: true},
})

const NewsInfo = sequelize.define('news_info',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    title:{type: DataTypes.STRING, unique: true},
    text:{type: DataTypes.STRING, unique: true},
})

const TypeCity = sequelize.define('type_city',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketNews)
BasketNews.belongsTo(Basket)

Type.hasMany(News)
News.belongsTo(Type)

City.hasMany(News)
News.belongsTo(City)

News.hasMany(BasketNews)
BasketNews.belongsTo(News)

News.hasMany(NewsInfo, {as: 'info'})
NewsInfo.belongsTo(News)

Type.belongsToMany(City, {through: TypeCity})
City.belongsToMany(Type, {through: TypeCity})

module.exports={
    User,
    Basket,
    BasketNews,
    News,
    Type,
    City,
    TypeCity,
    NewsInfo
}

