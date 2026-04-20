// Approach 1: Sort by start time
function attendMeetings(intervals) {
    if (intervals.length === 0)
        return true;
    intervals.sort(function (a, b) { return a[0] - b[0]; });
    for (var i = 1; i < intervals.length; i++) {
        var currentStart = intervals[i][0];
        var previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }
    return true;
}
var intervals = [[0, 30], [5, 10], [15, 20]];
console.log(attendMeetings(intervals)); // false
intervals = [[7, 10], [2, 4]];
console.log(attendMeetings(intervals)); // true
// Approach 2: Sort by end time
function attendMeetings2(intervals) {
    if (intervals.length === 0)
        return true;
    intervals.sort(function (a, b) { return a[1] - b[1]; });
    for (var i = 1; i < intervals.length; i++) {
        var currentStart = intervals[i][0];
        var previousEnd = intervals[i - 1][1];
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
var Interval = /** @class */ (function () {
    function Interval(start, end) {
        this.start = start;
        this.end = end;
    }
    return Interval;
}());
function attendMeetings3(intervals) {
    if (intervals.length === 0)
        return true;
    // Convert array pairs to Interval objects
    var meetings = intervals.map(function (interval) { return new Interval(interval[0], interval[1]); });
    meetings.sort(function (a, b) { return a.start - b.start; });
    for (var i = 1; i < meetings.length; i++) {
        var currentStart = meetings[i].start;
        var previousEnd = meetings[i - 1].end;
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
