from flask import Flask
from flaskext.mysql import MySQL
from config import Config

app = Flask(__name__)
mysql = MySQL()
app.config.from_object(Config)
mysql.init_app(app)

def connect_db():
	cx = mysql.connect().cursor()
	return cx

from app import routes
