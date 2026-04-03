The Brute force solution to this problem involves iterating through every possible subarray and checking if their sum equals K. It takes $O(n^2)$ time to iterate over all possible subarrays, and finding the sum of each subarray takes O(n) time, resulting in an overall time complexity of $O(n^3)$, where n denoteds the length of the array. 
This is quit inefficient, so let's think of something better.

Since we're working with subarray sums, it's worth considering how `Prefix Sums` can be used to solve this problem.

### Prefix Sums
As described in the sum 