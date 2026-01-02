# Prefix Sums

This folder collects common prefix-sum (cumulative-sum) techniques and problems with multiple solutions. The goal is a concise, practical reference so you can quickly pick the right pattern for a problem.

## What is a prefix sum?

A prefix sum array (also called cumulative sum) is an array where each element at index i stores the sum of the input array from index 0 up to i. Formally, given input array `A`, the prefix sum `P` is:

$P[i] = A[0] + A[1] + \dots + A[i]$ (0-based indices)

Once computed, range-sum queries of the form "sum of A[l..r]" can be answered in O(1):

$sum(l,r) = P[r] - (P[l-1] \text{ if } l>0 \text{ else } 0)$

## Why use prefix sums?
- Fast range-sum queries after O(n) preprocessing.
- Enables many subarray counting/optimization problems when combined with hashing or binary search.
- Useful for 2D range queries (grids) with 2D prefix sums.
- Works together with other patterns (difference arrays, prefix-xor, sliding window).

## Complexity
- Building prefix sum: O(n) time, O(n) extra space (or O(1) if you overwrite input).
- Range query after building: O(1) time.

## Common variants and related techniques

- Difference array (range-add updates): use a difference array `D` where you add at `l` and subtract at `r+1`, then rebuild prefix sums to apply batched range updates.
- Prefix-XOR: same idea but with XOR operation; good for subarray XOR queries.
- Hashmap of prefix sums: count subarrays with a target sum (or divisible by k) in O(n) time by storing frequencies of prefix sums.
- 2D prefix sums: extension to matrices for O(1) submatrix sum queries after O(rows*cols) preprocessing.
- Sliding window vs prefix sum: sliding window is better when array is non-negative or when you need variable window lengths. Prefix sums handle arbitrary values and many static range queries.

## Patterns and recipes

1) Range sum queries (static array)

	- Build `P` where `P[0]=A[0]` and `P[i]=P[i-1]+A[i]`.
	- Query `sum(l,r) = P[r] - (P[l-1] if l>0 else 0)`.

2) Count subarrays with sum == K (any integers)

	- Compute running prefix `s` and use a hashmap `freq` mapping prefix value -> count.
	- For each index, if `s - K` exists in `freq`, add `freq[s-K]` to answer. Then increment `freq[s]`.
	- Complexity: O(n) time and O(n) space.

3) Count subarrays with sum divisible by K

	- Use prefix sums modulo `K` and a frequency map of remainders. Similar to previous but use `(prefix % K + K) % K` to normalize.

4) 2D prefix sums (matrix)

	- Build `P` where `P[i][j]` is sum of rectangle from (0,0) to (i,j):

	  `P[i][j] = A[i][j] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]` (with boundary checks)

	- Sum of submatrix (r1,c1) to (r2,c2):

	  `sum = P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]`

5) Difference array for range updates

	- To add `val` to range `[l,r]`, do `D[l] += val; D[r+1] -= val` (if within bounds).
	- After all operations, rebuild original array by prefix-summing `D`.

6) Prefix-XOR

	- For XOR queries, maintain `PX[i] = A[0] ^ A[1] ^ ... ^ A[i]`.
	- XOR of subarray [l..r] is `PX[r] ^ (PX[l-1] if l>0 else 0)`.

## Short examples (pseudocode)

1) Build and query (Python-like):

```
# build
P = [0]*n
P[0] = A[0]
for i in range(1,n):
	 P[i] = P[i-1] + A[i]

# query sum(l,r)
def range_sum(l,r):
	 if l==0: return P[r]
	 return P[r] - P[l-1]
```

2) Count subarrays with sum == K (Python-like):

```
from collections import defaultdict
freq = defaultdict(int)
freq[0] = 1
prefix = 0
ans = 0
for x in A:
	 prefix += x
	 ans += freq[prefix - K]
	 freq[prefix] += 1
```

## Common problems to practice (keywords)
- Range sum queries (static)
- Count subarrays with sum K
- Subarray sum divisible by K
- 2D submatrix sum queries
- Range-add range-sum (difference array)
- Maximum subarray/variants (sometimes combined with prefix sums)

## Tips and pitfalls
- Beware of integer overflow in languages without big integers; use 64-bit when sums may exceed 32-bit.
- For products, prefix products are fragile because of zeros — consider segment trees or skipping zeros.
- When using modulo, normalize negative remainders.
- If memory is tight and queries are offline, consider answering queries with Mo's algorithm or sorting queries by block instead of storing full prefix arrays.

## Where this helps in contests and interviews
- Fast implementation for many array and matrix problems.
- Useful building block combined with hashing, two-pointers, binary search, and segment trees.

---

If you want, I can add: specific solved examples in Python/JS/Go, 2D worked examples, or link to practice problems. Which would you like next?

## Array-style worked example

Let A = [3, -2, 5, 1, -4, 2]. We'll build the prefix sums step-by-step and use them.

- Build P (same length as A):

	- P[0] = 3
	- P[1] = 3 + (-2) = 1
	- P[2] = 1 + 5 = 6
	- P[3] = 6 + 1 = 7
	- P[4] = 7 + (-4) = 3
	- P[5] = 3 + 2 = 5

	So P = [3, 1, 6, 7, 3, 5].

- Example range query: sum of A[1..3] (elements -2, 5, 1)

	- Using P: sum(1,3) = P[3] - P[0] = 7 - 3 = 4
	- Verify: -2 + 5 + 1 = 4

- Example: count subarrays with sum == 3 (manual walkthrough)

	- Keep running prefix and a freq map of seen prefixes (freq[0]=1 initially).
	- Traverse A, compute prefix and check prefix-K in freq.

	Step-by-step (K=3):

	- i=0: prefix=3 -> found prefix-3=0 in freq (freq[0]=1) => count=1. freq[3]=1
	- i=1: prefix=1 -> prefix-3=-2 not in freq => count stays 1. freq[1]=1
	- i=2: prefix=6 -> prefix-3=3 in freq (freq[3]=1) => count=2. freq[6]=1
	- i=3: prefix=7 -> prefix-3=4 not in freq => count=2. freq[7]=1
	- i=4: prefix=3 -> prefix-3=0 in freq (freq[0]=1) => count=3. Also freq[3] increments to 2
	- i=5: prefix=5 -> prefix-3=2 not in freq => final count=3

	So there are 3 subarrays with sum 3.

This concrete example shows how to compute `P` and use prefix sums for O(1) range queries and O(n) counting-with-map patterns.

