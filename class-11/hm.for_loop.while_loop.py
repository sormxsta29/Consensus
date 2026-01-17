n = int(input("Number= "))

# for loop

if n >= 0:
    for i in range(n, -1, -1):
        print(i**0.5, end=" ")

elif n < 0:
    for i in range(n, -1, 1):
        print(i**2, end=" ")


# while loop

while n < -1:
    print(n**2, end=" ")
    n += 1

while n >= 0:
    print(n**0.5, end=" ")
    n += -1