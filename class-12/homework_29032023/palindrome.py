# 1. Write a function which returns True if the given string argument is palindrome and False if not.

def is_palindrome_oneliner(word):
    return word == word[::-1]

def is_palindrome(word):
    if word == word[::-1]:
        return True
        # print(True)
    return False
    # print(False)

word = input("String = ")
palindrome_status = is_palindrome(word)
# if palindrome_status:                         # or
if is_palindrome(word):
    print(word, "is palindrome")
else:
    print(word, "is not palindrome")
