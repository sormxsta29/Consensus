a = int(input("number= "))
q = a
total= 0
while (q != 0):
    r= q % 10
    q= q // 10
    total += r

print(total)
