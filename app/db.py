from flaskext.mysql import MySQL 
import click
from app import mysql, app
from flask.cli import with_appcontext

def connect_db():
	with app.app_context():
		conn = mysql.get_db().cursor()
	return conn

def get_db():
	cx = connect_db()
	cx.execute("SELECT * FROM users")
	data = cx.fetchall()
	return data
