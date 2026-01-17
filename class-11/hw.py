n = int(input("Number: "))

factorial = 1

# using for loop
for i in range(2, n+1):
    factorial *= i

# using while loop
# p = n
# while p > 1:
#     factorial *= p
#     p -= 1

print(n, "! = ", factorial, sep='')
