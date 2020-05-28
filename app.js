const express = require('express')
const path = require('path')
//init app
const app = express()
const port = 5000

//load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//home route
app.get('/', (req, res) => {
		let users = [
		{
			id:1,
			username:'kori',
			email:'gmail'
		},
		{
			id:2,
			username:'james',
			email:'gmail'
		},
		{
			id:3,
			username:'billy',
			email:'gmail'
		}
		]
	res.render('index', {
		title : 'matcha v1',
		users : users
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
