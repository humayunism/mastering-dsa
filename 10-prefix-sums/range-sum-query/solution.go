package main

import "fmt"

// NumArray স্ট্রাকচার ডিফাইন করা
type NumArray struct {
    prefixSum []int
}

// কনস্ট্রাক্টর ফাংশন
func Constructor(nums []int) NumArray {
    ps := make([]int, len(nums)+1)
    for i, num := range nums {
        ps[i+1] = ps[i] + num
    }
    return NumArray{prefixSum: ps}
}

// SumRange মেথড
func (this *NumArray) SumRange(left int, right int) int {
    return this.prefixSum[right+1] - this.prefixSum[left]
}

func main() {
    // টেস্ট ডাটা
    nums := []int{-2, 0, 3, -5, 2, -1}
    
    // অবজেক্ট তৈরি করা
    obj := Constructor(nums)
    
    // টেস্ট কেসগুলো রান করা
    fmt.Println("Sum (0, 2):", obj.SumRange(0, 2)) // আউটপুট: 1
    fmt.Println("Sum (2, 5):", obj.SumRange(2, 5)) // আউটপুট: -1
    fmt.Println("Sum (0, 5):", obj.SumRange(0, 5)) // আউটপুট: -3
}