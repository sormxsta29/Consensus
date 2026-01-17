sem1_result = {
    "CC1": "Pass",
    "CC2": "Pass",
    "GE": "Fail",
    "AECC": "Pass",
    "TS": "Fail"
}
print(sem1_result)
print(sem1_result.pop("Physics", None))
print(sem1_result)

print(sem1_result.popitem())
print(sem1_result)

print(sorted(sem1_result.items()))
