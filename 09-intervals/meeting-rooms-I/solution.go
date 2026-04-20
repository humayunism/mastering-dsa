package main

import (
	"fmt"
	"sort"
)

// Approach 1: Sort by start time

func attendMeetings(intervals [][]int) bool {
	/*
		Determine if a person can attend all meetings without conflicts.
		Sort by start time.

		Time Complexity: O(n log n) - dominated by sorting
		Space Complexity: O(1) - if we don't count the space used by sort
	*/
	if len(intervals) == 0 {
		return true
	}

	// Sort by start time (first element)
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})

	for i := 1; i < len(intervals); i++ {
		currentStart := intervals[i][0]
		previousEnd := intervals[i-1][1]

		// If current meeting starts before previous one ends, conflict!
		if currentStart < previousEnd {
			return false
		}
	}

	return true
}

// Approach 2: Sort by end time

func attendMeetingsByEnd(intervals [][]int) bool {
	/*
		Determine if a person can attend all meetings without conflicts.
		Sort by end time.

		Time Complexity: O(n log n) - dominated by sorting
		Space Complexity: O(1) - if we don't count the space used by sort
	*/
	if len(intervals) == 0 {
		return true
	}

	// Sort by end time (second element)
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][1] < intervals[j][1]
	})

	for i := 1; i < len(intervals); i++ {
		currentStart := intervals[i][0]
		previousEnd := intervals[i-1][1]

		if currentStart < previousEnd {
			return false
		}
	}

	return true
}

// Approach 3: Class-based solution (using structs)

// Interval represents a time interval with start and end times
type Interval struct {
	Start int
	End   int
}

// String returns a string representation of Interval
func (i Interval) String() string {
	return fmt.Sprintf("Interval(%d, %d)", i.Start, i.End)
}

// IntervalSlice is a slice of Interval for custom sorting
type IntervalSlice []Interval

// Len returns the length of IntervalSlice
func (is IntervalSlice) Len() int {
	return len(is)
}

// Less compares intervals by start time
func (is IntervalSlice) Less(i, j int) bool {
	return is[i].Start < is[j].Start
}

// Swap swaps two intervals
func (is IntervalSlice) Swap(i, j int) {
	is[i], is[j] = is[j], is[i]
}

func attendMeetingsClassBased(intervals [][]int) bool {
	/*
		Determine if a person can attend all meetings without conflicts.
		Uses Interval struct objects.

		Time Complexity: O(n log n) - dominated by sorting
		Space Complexity: O(n) - space for creating Interval objects
	*/
	if len(intervals) == 0 {
		return true
	}

	// Convert int pairs to Interval objects
	meetings := make(IntervalSlice, len(intervals))
	for i, interval := range intervals {
		meetings[i] = Interval{Start: interval[0], End: interval[1]}
	}

	// Sort by start time
	sort.Sort(meetings)

	for i := 1; i < len(meetings); i++ {
		currentStart := meetings[i].Start
		previousEnd := meetings[i-1].End

		if currentStart < previousEnd {
			return false
		}
	}

	return true
}

// Main function to test all approaches
func main() {
	// Test Approach 1: Sort by start time
	fmt.Println("=== Approach 1: Sort by start time ===")
	intervals1 := [][]int{{0, 30}, {5, 10}, {15, 20}}
	fmt.Println(attendMeetings(intervals1)) // false

	intervals2 := [][]int{{7, 10}, {2, 4}}
	fmt.Println(attendMeetings(intervals2)) // true

	// Test Approach 2: Sort by end time
	fmt.Println("\n=== Approach 2: Sort by end time ===")
	intervals3 := [][]int{{0, 30}, {5, 10}, {15, 20}}
	fmt.Println(attendMeetingsByEnd(intervals3)) // false

	intervals4 := [][]int{{7, 10}, {2, 4}}
	fmt.Println(attendMeetingsByEnd(intervals4)) // true

	// Test Approach 3: Class-based solution
	fmt.Println("\n=== Approach 3: Class-based solution ===")
	intervals5 := [][]int{{0, 30}, {5, 10}, {15, 20}}
	fmt.Println(attendMeetingsClassBased(intervals5)) // false

	intervals6 := [][]int{{7, 10}, {2, 4}}
	fmt.Println(attendMeetingsClassBased(intervals6)) // true

	intervals7 := [][]int{{0, 5}, {5, 10}, {10, 15}}
	fmt.Println(attendMeetingsClassBased(intervals7)) // true (no conflict at endpoints)
}
