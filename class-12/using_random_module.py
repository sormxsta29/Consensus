import random

# random.random()
print(random.random())
'''
returns a floating random number in the range [0, 1)
'''

# random.randint(a, b)
print(random.randint(1, 6))
'''
returns a random integer in the range [a, b]
'''

# random.randrange(a, b)
print(random.randrange(1, 6))
'''
returns a random integer in the range [a, b)
'''

# random.uniform(a, b)
print(random.uniform(12, 15))

# random.choice(collection)
l = [20, 40, 33, 88, 99]
print(random.choice(l))
'''
returns a random element from the provided collection of elements
'''
