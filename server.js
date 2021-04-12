const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

//parse request of content-type -- app/json
app.use(bodyParser.json())

//parse request of content-type -- app/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

const db = require('./app/models')
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and re-sync DB')
})

app.get("/", (req, res) => {
    res.json({message: "Welcome to the app"})
})

//port + listen
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})