import os

print("current path:", os.getcwd())
if os.path.isdir("class-12/file_handling") == True:
    os.chdir("class-12/file_handling")
else:
    print("DIRECTORY DOES NOT EXIST")

print("new current path:", os.getcwd())

print("check file:", os.path.isfile("about_me.txt"))

if os.path.isfile("about_me.txt") == True :
    f = open("about_me.txt")
    print(f.read())
    f.close()
else:
    print("FILE DOES NOT EXIST")