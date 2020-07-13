const mysql = require('mysql')
const connex = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
})
connex.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log(`connected`)
    }
})

module.exports = connex