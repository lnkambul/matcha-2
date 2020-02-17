from admin import USER, HOST, PASS, DB
import mysql.connector

cnx = mysql.connector.connect(
		user=USER, 
		password=PASS, 
		host=HOST, 
		database=DB)
cursor = cnx.cursor()

add_user = ("INSERT INTO users (username, email) VALUES ('joe', 'joe@gmail.com')")
print("user added")
cursor.execute(add_user)
cnx.commit()

cursor.close()
cnx.close()
