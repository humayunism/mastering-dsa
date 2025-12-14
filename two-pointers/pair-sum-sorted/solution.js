/**
 * Find all pairs in a sorted array whose sum equals the target.
 * @param {number[]} arr - Sorted array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of pairs
 */
function pairWithTargetSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    const result = [];

    while (left < right) {
        const sum = arr[left] + arr[right];

        if (sum === target) {
            result.push([arr[left], arr[right]]);
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else { // sum > target
            right--;
        }
    }

    return result;
}

// Example usage
console.log(pairWithTargetSum([1, 2, 3, 4, 6], 6)); // [[2, 4]]
console.log(pairWithTargetSum([2, 5, 9, 11], 11));  // [[2, 9]]
