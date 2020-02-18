import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'wtc-matcha'
    MYSQL_DATABASE_USER = 'ksefeane'
    MYSQL_DATABASE_PASSWORD = 'qamagru'
    MYSQL_DATABASE_HOST = 'localhost'
    MYSQL_DATABASE_DB = 'matcha_db'
