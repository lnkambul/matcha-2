const express = require ( 'express' )
const path = require ( 'path' )
const exphbs = require ( 'express-handlebars' )
const bodyParser = require ( 'body-parser' )
const session = require ( 'client-sessions' )
const routes = require ( './routes' )

const app = express ()

/* handlebars middleware */
app.engine ( 'handlebars', exphbs ({ defaultLayout : 'setup' }))
app.set ( 'view engine', 'handlebars' )

/* body-parser middleware */
app.use ( express.json ())
app.use ( bodyParser.urlencoded ({ extended: false }))

/* session handler middleware */
app.use ( session ({
    cookieName : 'session',
    secret : 'random_string_goes_here',
    duration : 30 * 60 * 1000,
    activeDuration : 5 * 60 * 1000,
}))

/* set static folder */
app.use ( express.static ( path.join ( __dirname, 'public' )))

/* init routes */
app.use ( '/', routes )

module.exports = app