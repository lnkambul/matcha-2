'use strict';

const DB = require('./db.model');

class query {
	constructor(db) {
		this.db = db;
	}

	insert (t_name, params, values) {
		var v = '';
		for (let p in params)
			v += '?, ';
		v = v.slice(0, -2);
		var sql = "INSERT INTO " + t_name + " (" + params.join() + ") " +
				"VALUES " + "(" + v + ")";
		this.db.insert(sql, values);
		console.log ("inserted into user");
	}
}

var db = new DB();
var q = new query(db);
q.insert("users", ['username', 'email', 'password'], ['janet', 'janet@mail', 'jackson']);

