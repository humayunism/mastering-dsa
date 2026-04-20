#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Approach 1: Sort by start time

bool attendMeetings(vector<vector<int>>& intervals) {
    /*
        Determine if a person can attend all meetings without conflicts.
        Sort by start time.

        Time Complexity: O(n log n) - dominated by sorting
        Space Complexity: O(1) - if we don't count the space used by sort
    */
    if (intervals.empty()) {
        return true;
    }

    // Sort by start time (first element)
    sort(intervals.begin(), intervals.end(), 
         [](const vector<int>& a, const vector<int>& b) {
             return a[0] < b[0];
         });

    for (int i = 1; i < intervals.size(); i++) {
        int currentStart = intervals[i][0];
        int previousEnd = intervals[i - 1][1];

        // If current meeting starts before previous one ends, conflict!
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}

// Approach 2: Sort by end time

bool attendMeetingsByEnd(vector<vector<int>>& intervals) {
    /*
        Determine if a person can attend all meetings without conflicts.
        Sort by end time.

        Time Complexity: O(n log n) - dominated by sorting
        Space Complexity: O(1) - if we don't count the space used by sort
    */
    if (intervals.empty()) {
        return true;
    }

    // Sort by end time (second element)
    sort(intervals.begin(), intervals.end(), 
         [](const vector<int>& a, const vector<int>& b) {
             return a[1] < b[1];
         });

    for (int i = 1; i < intervals.size(); i++) {
        int currentStart = intervals[i][0];
        int previousEnd = intervals[i - 1][1];

        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}

// Approach 3: Class-based solution

class Interval {
public:
    int start;
    int end;

    Interval(int start = 0, int end = 0) : start(start), end(end) {}

    // For sorting by start time
    bool operator<(const Interval& other) const {
        return start < other.start;
    }

    // String representation
    string toString() const {
        return "Interval(" + to_string(start) + ", " + to_string(end) + ")";
    }
};

bool attendMeetingsClassBased(vector<vector<int>>& intervals) {
    /*
        Determine if a person can attend all meetings without conflicts.
        Uses Interval class objects.

        Time Complexity: O(n log n) - dominated by sorting
        Space Complexity: O(n) - space for creating Interval objects
    */
    if (intervals.empty()) {
        return true;
    }

    // Convert vector pairs to Interval objects
    vector<Interval> meetings;
    for (const auto& interval : intervals) {
        meetings.push_back(Interval(interval[0], interval[1]));
    }

    // Sort by start time using operator<
    sort(meetings.begin(), meetings.end());

    for (int i = 1; i < meetings.size(); i++) {
        int currentStart = meetings[i].start;
        int previousEnd = meetings[i - 1].end;

        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}

// Helper function to print vector of vectors
void printResult(bool result) {
    cout << (result ? "true" : "false") << endl;
}

// Main function to test all approaches
int main() {
    // Test Approach 1: Sort by start time
    cout << "=== Approach 1: Sort by start time ===" << endl;
    vector<vector<int>> intervals1 = {{0, 30}, {5, 10}, {15, 20}};
    printResult(attendMeetings(intervals1)); // false

    vector<vector<int>> intervals2 = {{7, 10}, {2, 4}};
    printResult(attendMeetings(intervals2)); // true

    // Test Approach 2: Sort by end time
    cout << "\n=== Approach 2: Sort by end time ===" << endl;
    vector<vector<int>> intervals3 = {{0, 30}, {5, 10}, {15, 20}};
    printResult(attendMeetingsByEnd(intervals3)); // false

    vector<vector<int>> intervals4 = {{7, 10}, {2, 4}};
    printResult(attendMeetingsByEnd(intervals4)); // true

    // Test Approach 3: Class-based solution
    cout << "\n=== Approach 3: Class-based solution ===" << endl;
    vector<vector<int>> intervals5 = {{0, 30}, {5, 10}, {15, 20}};
    printResult(attendMeetingsClassBased(intervals5)); // false

    vector<vector<int>> intervals6 = {{7, 10}, {2, 4}};
    printResult(attendMeetingsClassBased(intervals6)); // true

    vector<vector<int>> intervals7 = {{0, 5}, {5, 10}, {10, 15}};
    printResult(attendMeetingsClassBased(intervals7)); // true (no conflict at endpoints)

    return 0;
}
