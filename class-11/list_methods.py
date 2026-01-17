marks = [12, 13, 14, 15, 16, 17, 18, 19]

# to find length
# THIS IS A FUNCTION
len(marks)

# list method:
# converts sequence to list
# a static method: can be called without using .
listed = list("[12, 13, 14]")
print(listed)
print(type(listed))
evaled = eval("[12, 13, 14]")
print(evaled)
print(type((evaled)))

# index method:
# finding index of an element

# insert
marks.insert(1, 10)             # inserts 10 at index 1 and shifts all elements
print(marks)                    # after it one place right

# pop
# marks.pop(100)
print(marks)

# remove
marks.remove(13)
print("after removing 13", marks)

# clear: clears all elements
# marks.clear()                           # removes all the elements of the list
# print("after clearing:", marks)
# del marks                               # completely deletes the object
# print(marks)

mixedlist = [12, 211, 1, 3, 0]
mixedlist.sort()
print("aftfer sorting:", mixedlist)
mixedlist.sort(reverse=True)
print("after reverse sorting:", mixedlist)

value = sorted("sorting", reverse=True)
print("value after sorting:", value)

print("minimum marks:", min(marks))
print("maximum marks:", max(marks))
print("sum of marks:", sum(marks))

# finding sum with loops
sum_marks = 0
for i in marks:
    sum_marks += i
print("sum of marks with for loop:", sum_marks)

# pop
print("marks before pop:", marks)
popped = marks.pop()
print("marks after pop:", marks)
print("popped element:", popped)
