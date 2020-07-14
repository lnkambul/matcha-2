const connex = require ('./dblogin')
const credentials = require ('./credentials')    
    
connex.connect((err) => {
    /* establishes connection to the mysql database */
    if (err) {
        credentials.setFlag(`database`)
    }
    else {
        console.log(`connected to database`)
    }
})

module.exports = connex