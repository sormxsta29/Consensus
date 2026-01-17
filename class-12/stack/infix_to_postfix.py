
def push(stack, value):
    stack.append(value)

def pop(stack):
    if len(stack) == 0:
        print("Empty stack!")
    elif len(stack) == 1:
        return stack.pop()
    else:
        return stack.pop()

def top(stack):
    return stack[-1]

infix = ["(", "(", "B", "*", "B", ")", "-", "(", "4", "*", "A", "*", "C", ")", ")"]
postfix = []
temp = []

operators = ["+", "-", "*", "/"]

print("Infix: ", end="")
for i in infix:
    print(i, end="")
print()

for i in infix:
    if i == "(" or i in operators:
        push(temp, i)
    elif i == ")":
        while top(temp) != "(":
            if top(temp) != top(postfix):
                push(postfix, pop(temp))
            else:
                pop(temp)
        pop(temp)
    else:
        push(postfix, i)

print("Postfix: ", end="")
for i in postfix:
    print(i, end="")
print()
