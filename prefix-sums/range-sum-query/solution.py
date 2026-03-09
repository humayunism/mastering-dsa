from typing import List

class NumArray:
    def __init__(self, nums: List[int]):
        # প্রিফিক্স সাম অ্যারে তৈরি
        self.prefix_sum = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.prefix_sum[i + 1] = self.prefix_sum[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix_sum[right + 1] - self.prefix_sum[left]

# টেস্ট করার জন্য মেইন অংশ
if __name__ == "__main__":
    nums = [-2, 0, 3, -5, 2, -1]
    obj = NumArray(nums)
    print(f"Sum (0, 2): {obj.sumRange(0, 2)}") # আউটপুট: 1
    print(f"Sum (2, 5): {obj.sumRange(2, 5)}") # আউটপুট: -1
    print(f"Sum (0, 5): {obj.sumRange(0, 5)}") # আউটপুট: -3