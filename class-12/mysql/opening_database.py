import mysql.connector as sql

connection = sql.connect(
    host = "localhost",
    # host = "127.0.0.1",           # same as localhost
    user = "root",
    password = "sormista",
    # database = "some_database",
)

cursor = connection.cursor()

cursor.execute("show databases")
records = cursor.fetchall()

print("Available databases:")
for i in records:
    print("  " + i[0])

dbname = input("Database to use: ")

cursor.execute("use " + dbname)
print("Using " + dbname + ".")

