intro = "hello everyone"

# functions

print("length of intro:", len(intro))

# methods

intro.capitalize()          # can be used with both string variable
"hello".capitalize()        # and object

print(intro.count("hell", 0, 6))

print(intro.find("two"))        # returns -1
print(intro.index("two"))       # gives error

print("hello12.3".isalnum())        # alphabet or numeric
print("hello;123".isalpha())        # alphabet
print("7216521721".isdigit())       # digits
print("     \r\n\n".isspace())      # whitespaces

print("SDFGEAHF131".isupper())
print("asdfhlk2432".islower())

print("hello123".upper())
print("Arnold123".lower())

print("     sara@google  ".strip())

print("his name is lemillion.".startswith("his"))
print("his name is lemillion.".endswith("his"))

# check if a string starts with "hello"
# if it starts with hello, dont print the string, else print it

info = "he arrived before me"
if not info.startswith("hello"):
    print(info)

# title
title = "string manipulation functions and methods"
print("Title:", title.title())
if title.title().istitle():
    print(title, "is in title form")
else:
    print(title, "is not in title form")

# replace
greeting = "hello i am from another world"
replaced_string = greeting.replace("another", "this").replace("i", "I", 1)
print("Greeting:", greeting)
print("Replaced greeting:", replaced_string)

#  string splitting
project_details = "This project was made by Mr Kat. The project was completed by 24th December."
print("Split: ", end="")
print(project_details.split())
print(project_details.split("was"))
print("Partition: ", end="")
print(project_details.partition("This"))
word_list = ["hi", "how", "are", "you?"]
joined_word = "-".join(word_list)
print(joined_word)
