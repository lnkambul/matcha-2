'use strict';

const mysql = require('mysql');
const conf = require ('../config/config');
const tables = require('../config/tables');

class DB{
	constructor(config) {
		this.logins = config.logins;
		this.db = config.db;
		this.dbc = mysql.createConnection(conf.logins, conf.db);
		this.dbc.connect((err) => {
			if (err) {
				console.log (err.sqlMessage);
			}
			else {
				this.dbc = mysql.createConnection(conf.logins);
				this.dbc.connect((err) => {
					if (err) {
						console.log (err.sqlMessage);
					}
				});
			}
		});
		this.tables = tables;
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
		this.create_db();
		this.dbc.query(`USE ${this.db}`, (err, res) => {
			if (err) {
				this.create_db();
			}
			else
				console.log (`DB: ${this.db} -> (connected)`);
		});
	}

	create_t() {
		this.init_db();
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
	}

	insert(sql, values) {
		this.dbc.query(sql, values, (err, res) => {
			if (err)
				console.log (err);
			else
				console.log (res);
		});
	}

}
var db = new DB(conf);
db.init_db();
db.insert("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", ['kori', 'sefeane', 'gmail']);
