const express = require('express')
const path = require('path')

//database connection
const dbc = require('./models/connModel')

//init models
let user = require('./models/connModel')

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

//home route
app.get('/', (req, res) => {
	user.query("SELECT * FROM users", (err, result, fields) => {
		if (err)
			console.log(err)
		else {
			res.render('index', {
				title : 'matcha v1',
				users : result
			})
		}
	})
})

app.get('/edit', (req, res) => {
	res.render('edit')
})

//routes
let signup = require('./routes/signup')
app.use('/signup', signup)

//start server
app.listen(port, () => {
	console.log(`server listening on port ${port}`)
})
