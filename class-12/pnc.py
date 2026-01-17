def get_factorial(n):
    factorial = 1
    for i in range(2, n+1):
        factorial *= i
    return factorial


def get_pnc(n, r, findc = False):
    result = 1
    result *= get_factorial(n)
    result /= get_factorial(r)
    if findc:
        result /= get_factorial(n-r)
    return result

def get_permutation(n, r):
    permutaion = 1
    permutaion *= get_factorial(n)
    permutaion /= get_factorial(r)
    return permutaion

def get_combination(n, r):
    combination = 1
    combination *= get_combination(n)
    combination /= get_combination(r)
    combination /= get_combination(n-r)
    return combination


n = int(input("Value of n: "))
r = int(input("Value of r: "))
print(get_pnc(n, r))
