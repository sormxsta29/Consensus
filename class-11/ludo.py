import random
import time

while True:
    move = random.randint(1, 6)
    print("You got", move, end=": ")
    if move == 6:
        print("You are out of your room.")
        break
    else:
        print("You are in your room.", end="")
    time.sleep(1)
    print("\r", end="")

