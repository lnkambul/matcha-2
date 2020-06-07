const express = require('express')
const path = require('path')
const session = require('express-session')

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

//init session
const sess = require('./config/secret')
app.use(session(sess))

//routes
let index = require('./routes/index')
let signup = require('./routes/signup')
let login = require('./routes/login')
let logout = require('./routes/logout')
let verify = require('./routes/verify')
let resetpassword = require('./routes/resetpassword')
app.use('/', index)
app.use('/signup', signup)
app.use('/login', login)
app.use('/logout', logout)
app.use('/v', verify)
app.use('/resetpassword', resetpassword)

//start server
app.listen(port, (err, res) => {
		console.log(`server listening on port ${port}...`)
})
