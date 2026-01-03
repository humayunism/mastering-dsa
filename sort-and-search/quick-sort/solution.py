def sort_array(nums: list[int]) -> list[int]:
    quick_sort(nums, 0, len(nums) - 1)
    return nums


def quick_sort(nums: list[int], left: int, right: int) -> None:
    # Base case: one or zero elements
    if left >= right:
        return

    pivot_index = partition(nums, left, right)

    # Recursively sort left and right parts
    quick_sort(nums, left, pivot_index - 1)
    quick_sort(nums, pivot_index + 1, right)


def partition(nums: list[int], left: int, right: int) -> int:
    pivot = nums[right]   # Lomuto partition
    lo = left

    for j in range(left, right):
        if nums[j] < pivot:
            nums[lo], nums[j] = nums[j], nums[lo]
            lo += 1

    # Place pivot in correct position
    nums[lo], nums[right] = nums[right], nums[lo]
    return lo


print(sort_array([3, 6, 8, 10, 1, 2, 1]))
