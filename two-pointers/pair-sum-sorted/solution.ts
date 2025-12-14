/**
 * Find all pairs in a sorted array whose sum equals the target.
 * @param arr - Sorted array of numbers
 * @param target - Target sum
 * @returns Array of pairs
 */
function pairWithTargetSum(arr: number[], target: number): number[][] {
    let left: number = 0;
    let right: number = arr.length - 1;
    const result: number[][] = [];

    while (left < right) {
        const sum: number = arr[left] + arr[right];

        if (sum === target) {
            result.push([arr[left], arr[right]]);
            const leftVal = arr[left];
            const rightVal = arr[right];
            // skip duplicates to avoid repeating the same pair
            while (left < right && arr[left] === leftVal) left++;
            while (left < right && arr[right] === rightVal) right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return result;
}

// Example usage
console.log(pairWithTargetSum([1, 2, 3, 4, 6], 6)); // [[2, 4]]
console.log(pairWithTargetSum([2, 5, 9, 11], 11));  // [[2, 9]]
