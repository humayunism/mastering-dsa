package main

import (
	"fmt"
	"sort"
)

func carPooling(trips [][]int, capacity int) bool {
	events := make([][2]int, 0, len(trips)*2)

	for _, trip := range trips {
		passengers := trip[0]
		start := trip[1]
		end := trip[2]

		events = append(events, [2]int{start, passengers})
		events = append(events, [2]int{end, -passengers})
	}

	sort.Slice(events, func(i, j int) bool {
		if events[i][0] == events[j][0] {
			return events[i][1] < events[j][1]
		}
		return events[i][0] < events[j][0]
	})

	currentLoad := 0
	for _, event := range events {
		currentLoad += event[1]
		if currentLoad > capacity {
			return false
		}
	}

	return true
}

func main() {
	trips := [][]int{{2, 1, 5}, {3, 3, 7}}

	fmt.Printf("capacity = 4 -> %t\n", carPooling(trips, 4))
	fmt.Printf("capacity = 5 -> %t\n", carPooling(trips, 5))
}
