import mysql.connector

mydb = mysql.connector.connect(
      host="localhost",
      user="ksefeane",
      password="qamagru",
)
mycursor = mydb.cursor()
mycursor.execute("CREATE DATABASE matcha_db")
print("database created")
mycursor.execute("show databases")
