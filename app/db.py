from flaskext.mysql import MySQL 
import click
from app import mysql, app
from flask.cli import with_appcontext

def get_db():
	with app.app_context():
		cx = mysql.get_db().cursor()
		cx.execute("SELECT * FROM users")
		data = cx.fetchall()
	return data

