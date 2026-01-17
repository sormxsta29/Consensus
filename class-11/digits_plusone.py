a = int(input("Number = "))
q = a
newnum = 0
factor = 1

while q != 0:
    r = q % 10
    q = q // 10
    r += 1
    newnum += factor * r
    factor *= 10

print(newnum)

# highest = 0
# if marks > highest:
#     highest = marks
