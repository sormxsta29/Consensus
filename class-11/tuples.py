t = (12, 23, 34, 45)

t += (56,)

t2 = ()

for i in t:
    if i != 34:
        t2 += (i,)

t = t2

print(t)
