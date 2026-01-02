# Product of Array Except Self

## Problem

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.

## Examples

Example 1

Input: `nums = [1, 2, 3, 4]`  
Output: `[24, 12, 8, 6]`

Example 2

Input: `nums = [-1, 1, 0, -3, 3]`  
Output: `[0, 0, 9, 0, 0]`

## Constraints

- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The input is generated such that `answer[i]` fits in a 32-bit integer.

## Follow-up

Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

## Approach (O(n) time, O(1) extra space)

Use two passes to accumulate prefix and suffix products without division:

1. Create an output array `res` of length `n`. In the first pass, set `res[i]` to the product of all elements to the left of `i` (prefix product). Initialize a running product `pref = 1` and for `i` from `0` to `n-1`: set `res[i] = pref` then `pref *= nums[i]`.

2. In the second pass, traverse from right to left maintaining a running suffix product `suf = 1`. For `i` from `n-1` down to `0`: multiply `res[i] *= suf` then `suf *= nums[i]`.

At the end, `res[i]` equals product of all elements except `nums[i]`.

### Pseudocode (Python-like)

```
def productExceptSelf(nums):
    n = len(nums)
    res = [0]*n
    pref = 1
    for i in range(n):
        res[i] = pref
        pref *= nums[i]

    suf = 1
    for i in range(n-1, -1, -1):
        res[i] *= suf
        suf *= nums[i]

    return res
```

## Complexity

- Time: O(n) — two linear passes.
- Space: O(1) extra (output array `res` does not count toward extra space).

## Notes and edge cases

- Zeros are handled correctly by the two-pass approach: if there are two or more zeros, all outputs are zero; if one zero exists, only the position corresponding to that zero will be the product of the other elements.
- Use 64-bit integers where necessary in languages with limited integer ranges.
