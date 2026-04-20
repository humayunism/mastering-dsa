# Problem: Meeting Rooms I

**Difficulty:** Easy | **Topics:** Array, Sorting, Intervals

---

## 📋 Problem Statement

Given an array of meeting time intervals where each interval is represented as `[start_i, end_i]` with `start_i < end_i`, determine if a person could attend all meetings without any conflicts.

**Note:** Meeting intervals that touch at a single point (e.g., `[0,8]` and `[8,10]`) are **not** considered a conflict.

---

## 📚 Examples

### Example 1: Conflicting Meetings
```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false

Explanation:
- [0,30] and [5,10] overlap    → Conflict ❌
- [0,30] and [15,20] overlap   → Conflict ❌
The person cannot attend all meetings.
```

### Example 2: No Conflicts
```
Input: intervals = [[5,8],[9,15]]
Output: true

Explanation:
- No overlapping intervals
- The person can attend all meetings ✓
```

### Example 3: Touching at Endpoints (Allowed)
```
Input: intervals = [[0,5],[5,10],[10,15]]
Output: true

Explanation:
- Meetings touch at endpoints (5, 10) but don't overlap
- Touching at endpoints is allowed (no conflict)
- The person can attend all meetings ✓
```

### Example 4: Empty List
```
Input: intervals = []
Output: true

Explanation:
- No meetings to attend ✓
```

---

## 🔧 Constraints

- `0 <= intervals.length <= 500`
- `0 <= intervals[i][0] < intervals[i][1] <= 1,000,000`
- All intervals are valid (`start < end`)

---

## 💡 Approach

### Key Insight
Sort meetings by **start time**, then check if any meeting starts before the previous one ends.

### Algorithm Steps
```
1. Handle edge case: if no intervals, return true
2. Sort all intervals by start time
3. Iterate through sorted intervals (starting from index 1):
   - Get current meeting's start time
   - Get previous meeting's end time
   - If current_start < previous_end → Conflict found! Return false
4. If we finish the loop → No conflicts found! Return true
```

### Complexity Analysis
- **Time Complexity:** O(n log n) — dominated by sorting
- **Space Complexity:** O(1) or O(n) — depends on sort algorithm used

### Visual Example
```
Unsorted: [0,30], [5,10], [15,20]

After sorting by start:
┌────────────────────┐
│ [0,30]             │
└────────────────────┘
       ┌────┐
       │[5,10]│ ← Starts before [0,30] ends → CONFLICT!
       └────┘

       ┌──────┐
       │[15,20]│ ← Starts before [0,30] ends → CONFLICT!
       └──────┘

Result: false ❌
```

---

## 💻 Solutions

Choose your preferred language:

### Approach 1: Sort by Start Time (Recommended ⭐)
**Language:** [JavaScript](./solution.js) | [TypeScript](./solution.ts) | [Python](./solution.py) | [Go](./solution.go) | [C++](./solution.cpp)

```
Most intuitive approach - directly reflects the problem logic.
Simple to understand and implement.
```

### Approach 2: Sort by End Time
**Language:** [JavaScript](./solution.js) | [TypeScript](./solution.ts) | [Python](./solution.py) | [Go](./solution.go) | [C++](./solution.cpp)

```
Alternative sorting strategy.
Works but less intuitive than sorting by start time.
```

### Approach 3: Class-Based Solution
**Language:** [JavaScript](./solution.js) | [TypeScript](./solution.ts) | [Python](./solution.py) | [Go](./solution.go) | [C++](./solution.cpp)

```
Object-oriented approach using Interval class.
Good for understanding OOP concepts.
```

---

## 🎯 Key Takeaways

### Do's ✅
- ✅ Sort intervals by start time first
- ✅ Compare each interval with the previous one's end time
- ✅ Handle edge case: empty array returns `true`
- ✅ Understand why touching endpoints don't count as conflicts

### Don'ts ❌
- ❌ Compare all pairs (O(n²) — inefficient)
- ❌ Forget to sort before checking conflicts
- ❌ Use nested loops when sorting + iteration works
- ❌ Treat touching endpoints as conflicts

---

## 🔗 Related Problems

| Problem | Difficulty | Link |
|---------|-----------|------|
| Meeting Rooms II | Hard | Find max concurrent meetings |
| Merge Intervals | Medium | Merge overlapping intervals |
| Insert Interval | Medium | Insert & merge single interval |

---

## 📝 Follow-up Questions

1. **Can you solve it in O(1) extra space?**
   - Sort in-place, don't create new objects
   - Most language's sort implementations use O(log n) space

2. **What if meetings have same start time?**
   - Sort by start, then by end time for consistency

3. **What if intervals could slightly overlap at endpoints?**
   - Change condition from `<` to `<=`

---

## 🚀 Next Steps

Ready to level up? Try:
1. **Meeting Rooms II** - Same concept, but find maximum overlapping meetings
2. **Merge Intervals** - Merge all overlapping intervals into single intervals
3. **Calendar Scheduling** - Real-world application combining multiple concepts

**Happy coding! 📚**
