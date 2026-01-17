import mysql.connector as sql

connection = sql.connect(
    host = "localhost",
    user = "root",
    password = "sormista",
    database = "learning"
)

cursor = connection.cursor()

cursor.execute("create table Faculty(F_ID int primary key, Fname varchar(40), Lname varchar(40), Hire_date date, Salary decimal(8, 2))")
print("Table created.")
