'use strict';

const mysql = require('mysql');
const conf = require ('../config/config');

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
	}
	
	create_db() {
		this.dbc.query(`CREATE DATABASE ${this.db}`, (err, res) => {
			if (err) {
				console.log (`BD: ${this.db} -> (already exists)`);
			}
			else {
				console.log (`DB: ${this.db} -> (created)`);
			}
		});
	};

	init_db() {
		this.dbc.query(`USE ${this.db}`, (err, res) => {
			if (err) {
				this.create_db();
			}
			else
				console.log (`DB: ${this.db} -> (connected)`);
		});
	}

	create_t(tables) {

	}
}

var db = new DB(conf);
db.init_db();
