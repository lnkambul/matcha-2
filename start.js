const app = require ( './app' )
const database = require ( './config/database' )
const port = process.env.PORT || 3000

try {
    database.initDb (( err, res ) => {
        if ( err ) {
            throw ( err )
        }
        else {
            console.log ( 'database initialized' )
        }
    })
    const server = app.listen ( port, () => {
        console.log ( `server running on port ${ server.address().port }` )
    })
}
catch ( err ) {
    console.log ( 'server error:', err )
}