# answer of question no. 1

n = int(input("NUM= "))
Factorial = 1

for i in range(2, n+1):
    Factorial *= i

print(Factorial)

# answer of question no. 2

b= int(input("base= "))
p= int(input("power= "))

q=1
for i in range(p):
    q *= b

print(q)

#answer of question no. 3

sentence = input("Text: ")

digits=consonants=vowels=0

for i in sentence:
    if i.isdigit():
        digits += 1
    elif i.isalpha():
        consonants += 1
    elif i in "aeiouAEIOU":
        vowels +=1

print("Digits:" , digits)
print("Consonants:", consonants)
print("Vowels:", vowels)

# answer of question no. 4

n = int(input("num= "))

result = 0

for i in range(1, n+1):
    result += i ** 3
    print(result)

# answer of question no. 5

n = int(input("num= "))

result = 0

for i in range(1, n+1):
    result += 1/i
    print(result)
