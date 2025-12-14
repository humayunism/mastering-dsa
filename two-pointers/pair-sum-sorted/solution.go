package main

import "fmt"

// PairWithTargetSum finds all pairs in a sorted array whose sum equals the target.
// @param arr - Sorted array of numbers
// @param target - Target sum
// @returns Slice of pairs
func PairWithTargetSum(arr []int, target int) [][]int {
	left := 0
	right := len(arr) - 1
	result := [][]int{}

	for left < right {
		sum := arr[left] + arr[right]

		if sum == target {
			result = append(result, []int{arr[left], arr[right]})
			left++
			right--
		} else if sum < target {
			left++
		} else {
			right--
		}
	}

	return result
}

func main() {
	// Example usage
	fmt.Println(PairWithTargetSum([]int{1, 2, 3, 4, 6}, 6))   // [[2, 4]]
	fmt.Println(PairWithTargetSum([]int{2, 5, 9, 11}, 11))     // [[2, 9]]
}

