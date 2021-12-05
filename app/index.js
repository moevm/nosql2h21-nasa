const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const meteoRoutes = require('./routes/meteo')
const path = require('path')

const PORT = process.env.PORT || 8080
const db_uri = process.env.MONGODB_URI || 'mongodb://mongo:27017/my_db' //'mongodb://localhost:27017/my_db' //'mongodb://mongo:27017/my_db'

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use(meteoRoutes)

app.use(express.static(path.join(__dirname, 'public')))

async function start() {
    try {
        const connection = await mongoose.connect
            (db_uri,
                {
                })
        app.listen(PORT, () => {
            console.log('Server has been started at localhost:8080')
        })

	if (connection){
		console.log("db connected")
	}
	else{
		console.log("connection error")
	}
    } catch (e) {
        console.log(e)
    }
}

start()
