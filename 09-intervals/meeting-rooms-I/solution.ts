// Approach 1: Sort by start time

function attendMeetings(intervals: number[][]): boolean {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        let currentStart = intervals[i][0];
        let previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}

let intervals: number[][] = [[0, 30], [5, 10], [15, 20]];
console.log(attendMeetings(intervals)); // false

intervals = [[7, 10], [2, 4]];
console.log(attendMeetings(intervals)); // true

// Approach 2: Sort by end time

function attendMeetings2(intervals: number[][]): boolean {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[1] - b[1]);

    for (let i = 1; i < intervals.length; i++) {
        let currentStart = intervals[i][0];
        let previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}

intervals = [[0, 30], [5, 10], [15, 20]];
console.log(attendMeetings2(intervals)); // false

intervals = [[7, 10], [2, 4]];
console.log(attendMeetings2(intervals)); // true

// Approach 3: Class-based solution

class Interval {
    start: number;
    end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
}

function attendMeetings3(intervals: number[][]): boolean {
    if (intervals.length === 0) return true;

    // Convert array pairs to Interval objects
    let meetings: Interval[] = intervals.map(
        (interval: number[]) => new Interval(interval[0], interval[1])
    );

    meetings.sort((a, b) => a.start - b.start);

    for (let i = 1; i < meetings.length; i++) {
        let currentStart = meetings[i].start;
        let previousEnd = meetings[i - 1].end;
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}

intervals = [[0, 30], [5, 10], [15, 20]];
console.log(attendMeetings3(intervals)); // false

intervals = [[7, 10], [2, 4]];
console.log(attendMeetings3(intervals)); // true
