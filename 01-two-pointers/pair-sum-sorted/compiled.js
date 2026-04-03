/**
 * Find all pairs in a sorted array whose sum equals the target.
 * @param arr - Sorted array of numbers
 * @param target - Target sum
 * @returns Array of pairs
 */
function pairWithTargetSum(arr, target) {
    var left = 0;
    var right = arr.length - 1;
    var result = [];
    while (left < right) {
        var sum = arr[left] + arr[right];
        if (sum === target) {
            result.push([arr[left], arr[right]]);
            var leftVal = arr[left];
            var rightVal = arr[right];
            // skip duplicates to avoid repeating the same pair
            while (left < right && arr[left] === leftVal)
                left++;
            while (left < right && arr[right] === rightVal)
                right--;
        }
        else if (sum < target) {
            left++;
        }
        else {
            right--;
        }
    }
    return result;
}
// Example usage
console.log(pairWithTargetSum([1, 2, 3, 4, 6], 6)); // [[2, 4]]
console.log(pairWithTargetSum([2, 5, 9, 11], 11)); // [[2, 9]]
