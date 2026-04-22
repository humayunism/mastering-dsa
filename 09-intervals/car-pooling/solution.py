from typing import List, Tuple


def car_pooling(trips: List[List[int]], capacity: int) -> bool:
    events: List[Tuple[int, int]] = []

    for passengers, start, end in trips:
        events.append((start, passengers))
        events.append((end, -passengers))

    # At the same location, drop-offs should happen before pick-ups.
    events.sort()

    current_load = 0
    for _, change in events:
        current_load += change
        if current_load > capacity:
            return False

    return True


if __name__ == "__main__":
    trips = [[2, 1, 5], [3, 3, 7]]

    print(f"capacity = 4 -> {car_pooling(trips, 4)}")
    print(f"capacity = 5 -> {car_pooling(trips, 5)}")
