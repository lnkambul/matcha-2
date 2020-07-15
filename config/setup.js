const connex = require ('./dblogin')
const auth = require ('./auth')    
    
connex.connect(err => {
    /* establishes connection to the mysql database */
    if (err) {
        auth.setFlag(`database`)
    }
    else {
        console.log(`connected to database`)
    }
})

module.exports = connex