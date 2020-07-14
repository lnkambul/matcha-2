const mysql = require('mysql')

const connex = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
})

module.exports = connex