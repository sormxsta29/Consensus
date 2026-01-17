f = open("the ugly duckling.txt", "r+")

print("first read:")
print(f.read())

f.write("She lived a happy life.\n")
f.flush()

f.seek(0)

print("second read:")
print(f.read())

