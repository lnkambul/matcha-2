'use strict'

const mysql = require('mysql')
const config = require('../config/config')

const dbc = mysql.createConnection(config.logins, config.db)
dbc.connect((err) => {
	if (err) throw err
	console.log (`MySQL -> (connected)`)
})
dbc.query(`USE ${config.db}`, (err) => {
	if (err) throw err
	console.log(`DB: ${config.db} -> (connect)`)
})

module.exports = dbc
