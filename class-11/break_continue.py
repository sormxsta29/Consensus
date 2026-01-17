for i in range(10):
    print("Before statement", i)
    if i == 5:
        break
    print(i)

for i in range(10):
    print("Before statement", i)
    if i == 5:
        continue
    print(i)
