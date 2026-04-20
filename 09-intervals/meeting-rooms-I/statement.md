# Meeting Rooms I

**Difficulty:** Easy

---

## Description

Given an array of meeting time intervals where each interval is represented as `[start_i, end_i]` with `start_i < end_i`, determine if a person could attend all meetings without any conflicts.

**Note:** Meeting intervals that touch at a single point (e.g., `[0,8]` and `[8,10]`) are **not** considered a conflict.

---

## Examples

### Example 1:
```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false

Explanation:
- [0,30] and [5,10] overlap    → Conflict ❌
- [0,30] and [15,20] overlap   → Conflict ❌
The person cannot attend all meetings.
```

### Example 2:
```
Input: intervals = [[5,8],[9,15]]
Output: true

Explanation:
- No overlapping intervals
- The person can attend all meetings ✓
```

### Example 3:
```
Input: intervals = [[0,5],[5,10],[10,15]]
Output: true

Explanation:
- Meetings touch at endpoints (5, 10) but don't overlap
- Touching at endpoints is allowed
- The person can attend all meetings ✓
```

### Example 4:
```
Input: intervals = []
Output: true

Explanation:
- No meetings to attend ✓
```

---

## Constraints

- `0 <= intervals.length <= 500`
- `0 <= intervals[i][0] < intervals[i][1] <= 1,000,000`
- All intervals are valid (start < end)

---

## Follow Up

- Can you solve it in **O(1) extra space** (in-place)?
- What if the meetings are given as events with start/end times on the same day?
- How would your solution change if intervals could overlap slightly at endpoints?

---

## Related Topics

- **Difficulty:** Easy
- **Topics:** Array, Sorting, Intervals
- **Similar Problems:**
  - Meeting Rooms II (Hard)
  - Merge Intervals (Medium)
  - Insert Interval (Medium)
