const Q = require('../models/queryModel')

exports.list_users = (req, res) => {
	Q.fetchall("users", (err, data) => {
		if (err)
			res.send(err)
		res.send(data)
	});
}
