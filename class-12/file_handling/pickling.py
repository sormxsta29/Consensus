import pickle, os

# names = [
#     "meow",
#     "pow",
#     "pew",
#     "moo",
# ]

# f = open("for_dumping.bin", "wb")
# pickle.dump(names, f)
# f.close()

if os.path.isfile("for_dumping.bin"):
    f = open("for_dumping.bin", "rb")
    names = pickle.load(f)
else:
    names = []

print(names)
