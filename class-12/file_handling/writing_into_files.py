f = open("the ugly duckling.txt", "a+")

# write function
f.seek(0)
print(f.read())
f.write("As time passed by, she started ")
f.write("growing taller than the other ducks.\n")
f.flush()
f.seek(0)
print(f.read())

# writelines function
lines = [
    "The ducks realised she is a swan.\n",
    "And they started worshipping her.\n",
]
f.writelines(lines)
f.flush()

f.close()
