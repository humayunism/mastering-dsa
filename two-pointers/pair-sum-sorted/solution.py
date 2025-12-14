def pair_with_target_sum(arr, target):
    """
    Find all pairs in a sorted array whose sum equals the target.

    :param arr: List[int] - Sorted array
    :param target: int - Target sum
    :return: List[List[int]] - List of pairs
    """
    left, right = 0, len(arr) - 1
    result = []

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            result.append([arr[left], arr[right]])
            left += 1
            right -= 1
        elif current_sum < target:
            left += 1
        else:  # current_sum > target
            right -= 1

    return result


# Example usage
print(pair_with_target_sum([1, 2, 3, 4, 6], 6))  # [[2, 4]]
print(pair_with_target_sum([2, 5, 9, 11], 11))   # [[2, 9]]
