from flaskext.mysql import MySQL 

import click
from flask import current_app, g
from flask.cli import with_appcontext

mysql = MySQL()

def get():
	if 'db' not in g:
		g.db = mysql.connect().cursor()
	return g.db

def connect_db():
	cx = mysql.connect().cursor()
	return cx

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
