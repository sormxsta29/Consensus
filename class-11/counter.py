import time

second = minute = hour = 0

while True:
    print(":", second, end="")
    time.sleep(1)
    print("\r", end="")
    second += 1
