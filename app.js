const express = require('express')
const path = require('path')

//database connection
//const dbc = require('./models/connModel')

//init database
const db = require('./models/dbModel')
db.init()

//init app
const app = express()
const port = 5000

//load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//set public folder
app.use(express.static(path.join(__dirname, 'public')))

//load body parser middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/edit', (req, res) => {
	res.render('edit')
})

//routes
let index = require('./routes/index')
let signup = require('./routes/signup')
app.use('/', index)
app.use('/signup', signup)

//start server
app.listen(port, () => {
	console.log(`server listening on port ${port}`)
})
