const app = require ( './app' )
const port = process.env.PORT || 3000

try {
    const server = app.listen ( port, () => {
        console.log ( `server running on port ${ server.address().port }` )
    })
}
catch ( err ) {
    console.log ( 'server error:', err )
}