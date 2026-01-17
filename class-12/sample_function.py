def print_page_number(number):
    print("Book has", number, "pages.")

def voting_age_detector(name, age):
    if age < 18:
        print(name, "cannot vote.")
    else:
        print(name, "can vote.")

def bark():
    print("bhow bhow")
    print("dogs are the best!")

# print_page_number(200)
# voting_age_detector("harsh", 19)
# voting_age_detector("meow", 2)
bark()
print("out of function")
