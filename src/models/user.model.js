'use strict';

var dbc = require('./../../config/db.config');

var User = function(user) {
	this.first_name = user.first_name;
	this.last_name = user.last_name;
};

User.create = function (newUser, result) {
	dbc.query("INSERT INTO users set ?", newUser, function (err, res) {
			if(err) {
			console.log("error: ", err);
			result(err, null);
			}
			else {
			console.log(res.insertId);
			result(null, res.insertId);
			}
			});
};
module.exports = User;
