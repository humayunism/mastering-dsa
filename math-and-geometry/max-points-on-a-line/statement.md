# Max Points on a Line

## Problem Statement

Given an array of points where `points[i] = [xi, yi]` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

### Examples

**Example 1:**
```
Input: points = [[1,1],[2,2],[3,3]]
Output: 3
Explanation: All three points lie on the line y = x.
```

**Example 2:**
```
Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
Explanation: Points [1,1], [3,2], [5,3], [4,1] lie on the line 2x + y = 5.
```

### Constraints

- `1 <= points.length <= 300`
- `points[i].length == 2`
- `-10^4 <= xi, yi <= 10^4`
- All the points are unique.

## Solution Approach

### Step-by-Step Understanding

1. **Problem Analysis**
   - We need to find the maximum number of points that lie on the same straight line
   - Two points always form a line, so minimum answer is 2 (if we have at least 2 points)
   - If all points are the same, they all lie on the same line (but constraints say all points are unique)

2. **Key Insight**
   - For each point, we can calculate the slope with every other point
   - Points with the same slope from a reference point lie on the same line
   - We need to handle vertical lines (infinite slope) and duplicate points specially

3. **Algorithm Overview**
   - Use a brute force approach: for each point, calculate slopes with all other points
   - Use a hash map to count points with same slope
   - Keep track of the maximum count found
   - Handle edge cases: less than 2 points, vertical lines

### Detailed Solution Steps

1. **Handle Base Cases**
   - If there are 0 or 1 points, return the number of points
   - If there are exactly 2 points, return 2

2. **Iterate Through Each Point as Reference**
   - For each point `i` from 0 to n-2:
     - Create a hash map to store slope counts
     - Initialize max count for this reference point

3. **Calculate Slopes for Each Pair**
   - For each other point `j` from i+1 to n-1:
     - Calculate slope between points[i] and points[j]
     - Use fraction representation to avoid floating point precision issues
     - Slope = (y2 - y1) / (x2 - x1)
     - Represent as fraction: dy/dx where dy = y2-y1, dx = x2-x1
     - Reduce fraction by GCD to handle equivalent slopes

4. **Handle Special Cases**
   - **Vertical Lines**: When dx = 0, slope is infinite
     - Use a special key like "INF" for vertical lines
   - **Duplicate Points**: Though constraints say unique, handle if needed
     - Count duplicate points separately

5. **Count Maximum Points per Line**
   - For each reference point, find the slope with maximum count
   - Add 1 for the reference point itself
   - Update global maximum

6. **Return Result**
   - Return the maximum number of points found on any line

### Time Complexity
- **O(n²)** where n is number of points
- For each of n points, we calculate slopes with remaining n-1 points
- Hash map operations are O(1) on average

### Space Complexity
- **O(n)** for the hash map storing slope counts

### Edge Cases to Consider
1. All points on same horizontal line
2. All points on same vertical line
3. All points at same location (though constraints prevent this)
4. Only 1 or 2 points
5. Points forming multiple lines with different slopes

### Implementation Tips
- Use `long long` for calculations to avoid overflow
- Use GCD function to reduce fractions
- In C++, use `unordered_map` or `map` for slope storage
- In JavaScript, use `Map` for slope storage
- Handle negative slopes correctly in fraction representation

This approach ensures we find the maximum number of collinear points efficiently and handles all edge cases properly.