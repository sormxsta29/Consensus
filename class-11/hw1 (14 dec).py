question = input("Do you really want to delete the file? ")

if question == "y" or question == "Y":
    print("File deleted")
elif question == "n" or question == "N":
    print("File not deleted.")
else:
    print("Cannot decide.")

