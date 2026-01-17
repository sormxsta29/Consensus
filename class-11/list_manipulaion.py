# list basics
# characteristic : []
cities = ["kolkata", "delhi", "mumbai", "bolpur"]
population = [100, 50, 80, 10]

# multiple datatypes
# city_pop = ["kolkata", 100, "delhi", 50, "mumbai", 80, "bolpur", 10]

# accessing / indexing
# print(cities[1])
# for i in cities:                # traversing by iterating
#     print(i.capitalize())

# sequence to list
print(list("hello"))
print((10, 20, 30))
print(list((10, 20, 30)))
print(range(20))
print(list(range(20)))

# comparison
# starts comparing from the first element and proceeds if object is same
# else returns the comparison result
# print(cities > population)

print(population + cities)              # concatenation
print(population * 3)                   # replication

# slicing is the same as that in strings


# changing list elements

students = ["megha", "rahul", "prakash", "prakriti"]

# for loop to capitalize every element
for i in students:
    print(i.capitalize())
print(students)

# to change list items
for i in range(len(students)):
    students[i] = students[i].capitalize()
print(students)


