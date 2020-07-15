const express = require('express')
const path = require('path')
const routes = require('./routes')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

/* handlebars middleware */
app.engine('handlebars', exphbs({defaultLayout: 'setup'}))
app.set('view engine', 'handlebars')

/* body-parser middleware */
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* database credentials authentification middleware */

/* set static folder */
app.use(express.static(path.join(__dirname, 'public')))

/* init routes */
app.use('/', routes)

module.exports = app