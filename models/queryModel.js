'use strict'

const dbc = require('./connModel')

var query = {
	fetch: (t_name) => {
		var res = dbc.query(`SELECT * FROM ${t_name}`, (err, result, fields) => {
		   	if (err)
		   		console.log(err)
		   	return (result)
	   })
	}
}

module.exports = query
