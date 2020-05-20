'use strict';

const mysql = require('mysql');

//connection
const conn = mysql.createConnection({
host	: 'localhost',
user	: 'root',
password	: '',
database	: 'matcha_db'
		});

conn.connect(function(err) {
	if (err) throw err;
	
	console.log("Database connected!");
});

module.exports = conn;
