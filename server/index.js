import config from 'dotenv/config'
import express from 'express'
import sequelize from './sequelize.js'
import * as mapping from './models/mapping.js';
import cors from 'cors'
import router from './routes/index.js';
import ErrorHandler from './middleware/ErrorHandler.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5000

const app = express()
// Cross-Origin Resource Sharing чтобы разрешить cookie от клиента
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
// middleware для работы с json
app.use(express.json())
// middleware для статики
app.use(express.static('static'))
// middleware для загрузки файлов
app.use(fileUpload())
app.use(cookieParser(process.env.SECRET_KEY))
// все маршруты приложения
app.use('/api', router)

// обработка ошибок
app.use(ErrorHandler)

// обрабатываем GET-запрос
app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello, world!'})
})

// обрабатываем POST-запрос
app.post('/', (req, res) => {
    res.status(200).json(req.body)
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))
    } catch(e) {
        console.log(e)
    }
}

start()