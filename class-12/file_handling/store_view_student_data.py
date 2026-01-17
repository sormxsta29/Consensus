n = int(input("Number of students: "))

f = open("students_data.txt" , "a")

for i in range(n):
    name = input("NAME = ")
    roll = input("ROLL = ")
    f.write(name + "\n")
    f.write(roll + "\n")
    f.flush()

f.close()


f = open("students_data.txt" , "r")

line = f.readline()
while line != "":
    name = line.strip()
    roll = f.readline().strip()
    print(f"{name} has roll {roll}.")
    line = f.readline()

f.close()
