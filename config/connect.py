import mysql.connector
from mysql.connector import errorcode
from tables import DB_NAME, TABLES

cnx = mysql.connector.connect(
		user='ksefeane',
		password='qamagru',
		host='localhost')
cursor = cnx.cursor()

def create_database(cursor):
	try:
		cursor.execute("CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
	except mysql.connector.Error as err:
		print("Failed to create database: {}".format(err))
		exit(1)

try:
	cursor.execute("USE {}".format(DB_NAME))
	print("Database: {}".format(DB_NAME))
except mysql.connector.Error as err:
		print("Database {} does not exist".format(DB_NAME))
		if err.errno == errorcode.ER_BAD_DB_ERROR:
			create_database(cursor)
			print("Database {} created successfully".format(DB_NAME))
			cnx.databse = DB_NAME
		else:
			print(err)
			exit(1)

for table_name in TABLES:
	description = TABLES[table_name]
	try:
		print("Creating table {}".format(table_name, end=''))
		cursor.execute(description)
	except mysql.connector.Error as err:
		if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
			print("already exists")
		else:
			print(err.msg)

	else:
		print("OK")

cursor.close()
cnx.close()
