/**
 * Sorts an array using Quick Sort
 * @param {number[]} nums
 * @returns {number[]}
 */


function sortArray(nums) {
  quickSort(nums, 0, nums.length - 1);
  return nums;
}

/**
 * Recursively applies quick sort on subarrays
 * @param {number[]} nums
 * @param {number} left  - starting index of subarray
 * @param {number} right - ending index of subarray
 */


function quickSort(nums, left, right) {
  // Base case:
  // If the subarray has 0 or 1 element, it's already sorted
  if (left >= right) {
    return;
  }

  // Partition the array and get the correct position of the pivot
  const pivotIndex = partition(nums, left, right);

  // Recursively sort elements before pivot
  quickSort(nums, left, pivotIndex - 1);

  // Recursively sort elements after pivot
  quickSort(nums, pivotIndex + 1, right);
}

/**
 * Partitions the array using Lomuto partition scheme
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @returns {number} - final index of pivot
 */


function partition(nums, left, right) {
  // Choose the rightmost element as pivot
  const pivot = nums[right];

  // 'lo' keeps track of the position
  // where the next smaller-than-pivot element should go
  let lo = left;

  // Traverse elements except pivot
  for (let j = left; j < right; j++) {
    // If current element is smaller than pivot
    if (nums[j] < pivot) {
      // Swap current element with element at 'lo'
      [nums[lo], nums[j]] = [nums[j], nums[lo]];
      lo++; // Move boundary forward
    }
  }

  // Place pivot in its correct sorted position
  [nums[lo], nums[right]] = [nums[right], nums[lo]];

  // Return pivot index
  return lo;
}

// Example usage
console.log(sortArray([3, 6, 8, 10, 1, 2, 1]));
