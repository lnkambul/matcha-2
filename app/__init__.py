from flask import Flask
from flaskext.mysql import MySQL
from config import Config

mysql = MySQL()
app = Flask(__name__)
app.config.from_object(Config)

app.config['MYSQL_DATABASE_USER'] = 'ksefeane'
app.config['MYSQL_DATABASE_PASSWORD'] = 'qamagru'
app.config['MYSQL_DATABASE_DB'] = 'matcha_db'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

from app import routes
