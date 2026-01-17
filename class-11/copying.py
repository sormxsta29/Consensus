l1 = [1, 2, 3, 4]
l2 = list(l1)       # l2 = l1.copy()

d1 = {
    "Mohan": {'P': 20, 'C': 20, 'D': 19},
    "Sima": {'P': 20, 'C': 20, 'D': 20},
    "Rahul": {'P': 18, 'C': 19, 'D': 20},
    "Megha": (1, 2, 4)
}

d2 = d1.copy()

print(d1)
print(d2)
d1["Rohit"] = {'P': 19, 'C': 19, 'M': 19}
d1["Mohan"]['P'] = 19
d1["Megha"] = (20, 20, 20)
print(d1)
print(d2)
