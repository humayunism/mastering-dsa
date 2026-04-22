function carPooling(trips, capacity) {
    const events = [];

    for (const [passengers, start, end] of trips) {
        events.push([start, passengers]);
        events.push([end, -passengers]);
    }

    // At the same location, drop-offs should happen before pick-ups.
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    let currentLoad = 0;
    for (const [, change] of events) {
        currentLoad += change;
        if (currentLoad > capacity) {
            return false;
        }
    }

    return true;
}

const trips = [[2, 1, 5], [3, 3, 7]];

console.log(`capacity = 4 -> ${carPooling(trips, 4)}`);
console.log(`capacity = 5 -> ${carPooling(trips, 5)}`);
