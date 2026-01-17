a = 12345

total = 0
q = a

while (q != 0):
    r = q % 10
    q = q // 10
    total += r ** 3

print(total)
