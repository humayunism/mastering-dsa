class NumArray {
    private prefixSum: number[];

    constructor(nums: number[]) {
        // প্রিফিক্স সাম অ্যারে তৈরি (সাইজ n+1)
        this.prefixSum = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
        }
    }

    sumRange(left: number, right: number): number {
        return this.prefixSum[right + 1] - this.prefixSum[left];
    }
}

// --- টেস্ট করার জন্য নিচের অংশটুকু অবশ্যই যোগ করো ---
const nums = [-2, 0, 3, -5, 2, -1];
const obj = new NumArray(nums);

console.log("--- Testing Range Sum Query (TypeScript) ---");
console.log("Sum(0, 2):", obj.sumRange(0, 2)); // আউটপুট হওয়া উচিত: 1
console.log("Sum(2, 5):", obj.sumRange(2, 5)); // আউটপুট হওয়া উচিত: -1
console.log("Sum(0, 5):", obj.sumRange(0, 5)); // আউটপুট হওয়া উচিত: -3