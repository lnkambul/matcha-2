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
app.set('view engine', 'pug')

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
//register route
app.get('/signup', (req, res) => {
	res.render('signup', {
		message : 'user registration'
	})
})

//start server
app.listen(port, () => {
	console.log(`server listening on port ${port}`)
})
