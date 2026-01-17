colour= input("colour:")

if colour == "red" or colour == "Red":
    print("Red light.\nCars stopped.")

elif colour == "yellow":
    print("Yellow light.\nCars ready to move.")

elif colour == "green":
    print("Green light.\nCars moving.")

else:
    print("Invalid signal.")