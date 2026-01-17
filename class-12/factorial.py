def get_factorial(num):
    x = 1
    for i in range(1, num+1):
        x *= i
    return x

for i in range(5):
    num = int(input("Number: "))
    factorial = get_factorial(num)
    print("Factorial:", factorial)


# understanding return 

def get_product(a, b):
    pro = a * b
    return pro

prod = get_product(12, 4)
