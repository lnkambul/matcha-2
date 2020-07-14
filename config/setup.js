const connex = require ('./dblogin')
const database = require ('./database')    
    
connex.connect((err) => {
    /* establishes connection to the mysql database */
    if (err) {
        database.setFlag('database')
    }
    else {
        console.log(`connected to database`)
    }
})

module.exports = connex