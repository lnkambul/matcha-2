import mysql.connector
from tables import DB_NAME
from admin import values

def conn():
	cnx = mysql.connector.connect(**values, db=DB_NAME)
	return cnx

