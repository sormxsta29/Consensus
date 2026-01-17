# 2. Write a function which reverses a string given as argument.

def reverse(r):
    u = r[::-1]
    return u

w = input("word = ")
reverse_str = reverse(w)
print(reverse_str)
