access_list = ["sara", "harsh", "meow", "kim"]
password = "icecream"
email_id = input("email acc: ")

if email_id == access_list[0]:
    print("welcome back,", email_id)
elif email_id == access_list[1]:
    print("welcome back,", email_id)
elif email_id == access_list[2]:
    print("welcome back,", email_id)
elif email_id == access_list[3]:
    print("welcome back,", email_id)
else:
    print("access not granted")
