const app = require('./app')
const port = process.env.PORT || 3000
//const connex = require('./config/setup')
const database = require('./config/database')
/*
database.initializeDatabase()
*/
const server = app.listen(port, () => {
    console.log(`server running on port ${server.address().port}`)
})