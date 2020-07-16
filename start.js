const app = require ('./app')
const auth = require ('./config/auth')
const files = require ('./config/files')
const port = process.env.PORT || 3000
//const connex = require('./config/setsup')
//const database = require('./config/database')
/*
database.initializeDatabase()
*/
try {
    if(!files.checkExists('./config/dbname')) {
        auth.setFlag('database', (err, res) => {
            if (err) {
                console.log(`mysql credentials initialization failed:`, err)
            }
        })
    }
    else {
        
    }

    const server = app.listen(port, () => {
        console.log(`server running on port ${server.address().port}`)
    })
}
catch (err){
    console.log(`server initialization error:`, err)
}