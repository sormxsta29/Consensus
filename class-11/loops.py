# for loop
# when traversing through an iterable
students = ["halley", "roger", "gru", "pocky"]
for i in students:
    print("student:", i)
    for j in i:
        print(j, end=' ')
    print()
# when we need numbers (using range), e.g when we need index
# students[3] = "becky"
for i in range(len(students)):
    if students[i] == "pocky":
        students[i] = "becky"
for i in range(7, 50, 7):
    print(i, "is a multiple of 7")

# while loop
# checks condition
# stops the loop of condition is False
number_of_buses = 10
while number_of_buses != 0:
    print("1 bus departed.")
    number_of_buses -= 1
    print("Buses left:", number_of_buses)
# multiplying digits
n = 5412
q = n
product = 1
while q != 0:
    r = q % 10
    q = q // 10
    product *= r
print("Product:", product)
