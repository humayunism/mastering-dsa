var NumArray = /** @class */ (function () {
    function NumArray(nums) {
        // প্রিফিক্স সাম অ্যারে তৈরি (সাইজ n+1)
        this.prefixSum = new Array(nums.length + 1).fill(0);
        for (var i = 0; i < nums.length; i++) {
            this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
        }
    }
    NumArray.prototype.sumRange = function (left, right) {
        return this.prefixSum[right + 1] - this.prefixSum[left];
    };
    return NumArray;
}());
// --- টেস্ট করার জন্য নিচের অংশটুকু অবশ্যই যোগ করো ---
var nums = [-2, 0, 3, -5, 2, -1];
var obj = new NumArray(nums);
console.log("--- Testing Range Sum Query (TypeScript) ---");
console.log("Sum(0, 2):", obj.sumRange(0, 2)); // আউটপুট হওয়া উচিত: 1
console.log("Sum(2, 5):", obj.sumRange(2, 5)); // আউটপুট হওয়া উচিত: -1
console.log("Sum(0, 5):", obj.sumRange(0, 5)); // আউটপুট হওয়া উচিত: -3
