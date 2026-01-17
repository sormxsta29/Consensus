# 3. Write a function which takes a dictionary of roll_no and student_name
#    as an input and returns a list of names of students who have roll numbers 
#    divisible by 10.

def get_zero_ending_roll_numbers(student_dict):
    L = []
    for i in student_dict:
        if i % 10 == 0:
            L.append(student_dict[i])
    return L

dictionary_input = eval(input("dict = "))
D = get_zero_ending_roll_numbers(dictionary_input)
print("Names of students:", end=' ')
for i in D:
    print(i, end=' ')
print()

# {1: "Meow", 5: "Bhou", 10: "Woof", 25: "Swish", 40: "Plop"}
# Names of students: Woof Plop
