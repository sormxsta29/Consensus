def count_lines(filename):
    f = open(filename, "r")
    counter = 0
    while f.readline() != "":
        counter += 1
    f.close()
    return counter

def count_blank_lines(filename):
    f = open(filename, "r")
    counter= 0
    lines = f.readlines()
    # print(lines)
    for i in lines:
        if i == "\n":
            counter += 1
    f.close()
    return counter

def count_lines_using_read(filename):
    f = open(filename, "r")
    content = f.read()
    num_lines = content.count('\n')
    f.close()
    return num_lines

print("Number of lines:", count_lines("about_me.txt"))
print("Number of lines using read:", count_lines_using_read("about_me.txt"))
print("Number of blank lines:", count_blank_lines("about_me.txt"))
