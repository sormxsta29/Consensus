#answer number one:

num = int(input("NUMBER OF STUDENTS= "))
D = {
    1000: ["abc", "IX-D", 12, 90],
    1001: ["def", "IX-A", 12, 40],
    1002: ["ghi", "IX-C", 12, 80],
    1003: ["jkl", "IX-D", 12, 95]
}

for i in range(num):
    name= input("NAME: ")
    Class= input("CLASS: ")
    roll= int(input("ROLL NUMBER: "))
    adm= int(input("ADMISSION NUMBER: "))
    perctg= float(input("PERCENTAGE: "))
    D[adm] = [name, Class, roll, perctg]
    print(D)

for i in D:
    if D[i][3] > 90:
        print("GREAT JOB", D[i][0], "of", D[i][1])
    elif D[i][3] > 80:
        print("GOOD JOB", D[i][0], "of", D[i][1])
    elif D[i][3] > 70:
        print("YOUU DID NICE", D[i][0], "of", D[i][1])
    else:
        print("I KNOW YOU CAN DO BETTER", D[i][0], "of", D[i][1])

# answer number two:

ixa = []
ixb = []
ixc = []
ixd = []
xa = []
xb = []
xc = []
xd = []

for i in D:
    if D[i][1].startswith("IX"):
        if D[i][3] > 90:
            ixa.append([D[i][0], D[i][1], i])
            D[i][1]= "IX-A"
        elif D[i][3] > 80:
            ixb.append([D[i][0], D[i][1], i])
            D[i][1]= "IX-B"
        elif D[i][3] > 70:
            ixc.append([D[i][0], D[i][1], i])
            D[i][1]= "IX-C"
        else:
            ixc.append([D[i][0], D[i][1], i])
            D[i][1] = "IX-D"

    elif D[i][1].startswith("X"):
        if D[i][3] > 90:
            xa.append([D[i][0], D[i][1], i])
            D[i][1] = "X-A"
        elif D[i][3] > 80:
            xb.append([D[i][0], D[i][1], i])
            D[i][1] = "X-B"
        elif D[i][3] > 70:
            xc.append([D[i][0], D[i][1], i])
            D[i][1] = "X-C"
        else:
            xc.append([D[i][0], D[i][1], i])
            D[i][1] = "X-D"

print("IX-A", ixa)
print("IX-B", ixb)
print("IX-C", ixc)
print("IX-D", ixd)
print("X-A", xa)
print("X-B", xb)
print("X-C", xc)
print("X-D", xd)