l = [1, 5, -1, 2, 0, 3]

def max_in_list(list_arg):
    max_element = l[0]
    for i in range(1, len(l)):
        if l[i] > max_element:
            max_element = l[i]
    return max_element

max_number = max_in_list(l)
print(max_number , "is the maximum element of the list.")
