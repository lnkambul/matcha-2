import mysql.connector

mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="qamagru",
      database="test"
)

mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM user")

for x in mycursor.fetchall():
    print(x[0], " ", x[1])
