num = int(input("Number= "))

if num % 2 != 0 and num >= 0:
    print(num, "is a positive odd number.")

elif num % 2 != 0 and num < 0:
    print(num, "is a negative odd number.")

elif num % 2 == 0 and num >= 0:
    print(num, "is a positive even number.")

elif num % 2 == 0 and num < 0:
    print(num, "is a negative even number.")


# if else way

if num % 2 == 0:
    # even number
    if num < 0:
        # negative even
        pass
    else:
        # positive even
        pass

else:
    # odd number
    if num < 0:
        # negative even
        pass
    else:
        # positive even
        pass
