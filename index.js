require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const app = express()
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router=require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)
app.use(express.static(path.resolve(__dirname, 'static')))

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()