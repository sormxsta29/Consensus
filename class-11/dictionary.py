# d = {"bijon": 45.0, "harsh": 10.0}
# print(d)
# d["sormista"] = 15.0
# print(d)
# d["arlo"] = 45.0
# print(d)
#
# for i in d:
#     print(i, d[i])
#
# for i in d.values():
#     print(i)
#
# print("", d.values())
#
# sorted(d)
# print(d)
#
# r, m = eval("12, 13")

print(dict(zip("nam", ["John", 10000, 24])))

# searching for a value
reqd_val = 24
d = dict(zip(["name", "salary", "age"], ["John", 10000, 24]))
for i in d:
    if d[i] == reqd_val:
        print(reqd_val, 'present at key', i)
        break
else:
    print(reqd_val, 'not present in list')

print(d.items())
print(d.get("name"))
fit