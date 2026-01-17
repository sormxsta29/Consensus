# 2d list
# student_marks = [
#     ["arora", 12],
#     ["puppet", 14],
#     ["george", 10],
#     ["fred", 10]
# ]
#
# for i in range(len(student_marks)):
#     print("marks of", student_marks[i][0], "=", student_marks[i][1])

# taking 2d list inputs
capitals = []
rows = 4
cols = 2
for i in range(rows):
    row = eval(input("Row: "))
    capitals.append(row)

print("Capitals:", capitals)
print("\t")


