const DB = require('./dbModel')

var query = function() {}

query.insert = (t_name, params, values, callback) => {
	var v = ''
	for (let p in params)
		v += '?, '
	v = v.slice(0, -2)
	var sql = "INSERT INTO " + t_name + " (" + params.join() + ") " +
		"VALUES " + "(" + v + ")"
	DB.insert(sql, values, (err, res) => {
		if (err)
			callback(err, null)
		else
			callback(null, res)
	})
}

query.fetchall = (t_name, callback) => {
	var sql = "SELECT * FROM " + t_name
	DB.fetch(sql, (err, res) => {
		if (err)
			callback(err, null)
		else
			callback(null, res)
	})
}

module.exports = query
