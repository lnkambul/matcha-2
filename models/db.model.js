'use strict';

const mysql = require('mysql');
const conf = require ('../config/config');
const tables = require('../config/tables');

class DB{
	constructor(config) {
		this.logins = config.logins;
		this.db = config.db;
		this.tables = tables;
		this.dbc = mysql.createConnection(conf.logins, conf.db);
		this.dbc.connect((err) => {
			if (err) {
				this.dbc = mysql.createConnection(conf.logins);
				this.dbc.connect((err) => {
					if (err)
						console.log (err.sqlMessage);
				});
			}
		});
		this.init_db();
	}

	configure() {
		this.create_db();
		this.init_db();
		this.create_t();
	}

	create_db() {
		this.dbc.query(`CREATE DATABASE ${this.db}`, (err, res) => {
			if (err) {
				console.log (`DB: ${this.db} -> (found)`);
			}
			else {
				console.log (`DB: ${this.db} -> (created)`);
			}
		});
	};

	init_db() {
		this.dbc.query(`USE ${this.db}`, (err, res) => {
			if (err) {
				console.log (`DB: ${this.db} -> (not found)`);
				this.configure();
			}
			else {
				console.log (`DB: ${this.db} -> (connected)`);
			}
		});
	}

	create_t() {
		for (let t_name in this.tables) {
			var sql = this.tables[t_name];
			this.dbc.query(sql, (err, res) => {
				var msg = `T: ${t_name} -> `;
				if (err) {
					if (err.errno === 1050)
						msg += "(found)";
					else
						console.log (err)
				}
				else {
					msg += "(created)";
				}
				console.log (msg);
			});
		}
		this.setup = 1;
	}

	insert(sql, values) {
		this.dbc.query(sql, values, (err, res) => {
			if (err)
				console.log (err);
		});
	}

}
var db = new DB(conf);
db.insert("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", ['boy', 'serv', 'email']);
