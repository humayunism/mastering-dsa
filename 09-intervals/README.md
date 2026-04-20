# 📊 Complete Guide to Intervals

## Table of Contents
1. [What are Intervals?](#what-are-intervals)
2. [Types of Intervals](#types-of-intervals)
3. [Interval Relationships](#interval-relationships)
4. [Core Techniques](#core-techniques)
5. [Data Structure](#data-structure)
6. [Common Patterns](#common-patterns)
7. [Real-world Applications](#real-world-applications)
8. [Quick Reference](#quick-reference)

---

## What are Intervals?

An **interval** is a continuous segment on the number line defined by two endpoints: a **start point** and an **end point**. It represents all values between (and possibly including) these two points.

### Visual Representation

```
Number Line:
0   1   2   3   4   5   6   7   8   9   10
                |_____________|
              Interval [3, 7]
            (includes all values from 3 to 7)
```

**Key Properties:**
- **Start Point**: Where the interval begins
- **End Point**: Where the interval ends
- **Duration/Length**: `end - start`

---

## Types of Intervals

### 1️⃣ Closed Interval `[a, b]`
Both endpoints **are included** in the interval.

```
Notation: [3, 8]
Math:     3 ≤ x ≤ 8
Includes: {3, 4, 5, 6, 7, 8}

Visual:
    ●━━━━━━━━●
    3         8
   (filled circles = included)
```

**Example:** Conference meeting from 2:00 PM to 5:00 PM (includes both times)

---

### 2️⃣ Open Interval `(a, b)`
Both endpoints **are NOT included** in the interval.

```
Notation: (3, 8)
Math:     3 < x < 8
Includes: {4, 5, 6, 7}

Visual:
    ○━━━━━━━━○
    3         8
   (empty circles = excluded)
```

**Example:** Time period strictly between 2:00 PM and 5:00 PM (excludes both)

---

### 3️⃣ Half-Open Intervals

#### Left-Closed, Right-Open `[a, b)`
Start is **included**, end is **NOT included**.

```
Notation: [3, 8)
Math:     3 ≤ x < 8
Includes: {3, 4, 5, 6, 7}

Visual:
    ●━━━━━━━━○
    3         8
```

**Most Common in Programming!** (Arrays, slices, ranges)

#### Left-Open, Right-Closed `(a, b]`
Start is **NOT included**, end is **included**.

```
Notation: (3, 8]
Math:     3 < x ≤ 8
Includes: {4, 5, 6, 7, 8}

Visual:
    ○━━━━━━━━●
    3         8
```

---

## Interval Relationships

### 🔄 Overlapping Intervals
Two intervals share at least one common value.

```
Interval 1: [2, 6]
Interval 2: [4, 8]

Timeline:
0   1   2   3   4   5   6   7   8   9
        |───────|
                |───────|
            Overlap: [4, 6]

Visualization:
Interval 1:  ●━━━━━━━━●
             2  3  4  5  6
Interval 2:        ●━━━━━━━━●
                   4  5  6  7  8
Overlap:           ●━━━━━━━●
                   4  5  6
```

**Overlap Detection:** Intervals [a,b] and [c,d] overlap if: `a < d AND c < b`

---

### ✂️ Non-Overlapping (Disjoint) Intervals
Intervals that don't share any common values.

```
Interval 1: [1, 3]
Interval 2: [5, 8]

Timeline:
0   1   2   3   4   5   6   7   8   9
    |───|           |───────|
              GAP
(No overlap)
```

---

### 🤝 Touching Intervals
Intervals where the end of one equals the start of another.

```
Interval 1: [1, 4]
Interval 2: [4, 7]

Timeline:
0   1   2   3   4   5   6   7   8
    |───────●───────|
         Touch point = 4

Question: Do they overlap?
- [1, 4] and [4, 7] = YES (4 is common in both)
- [1, 4) and [4, 7] = NO (half-open intervals don't overlap)
```

---

### 📦 One Interval Contains Another
Complete overlap where one interval is inside another.

```
Interval 1: [2, 8]
Interval 2: [4, 6]

Timeline:
0   1   2   3   4   5   6   7   8   9
        |─────────────────────|
              |───────|

Interval 2 is completely inside Interval 1
```

---

## Core Techniques

### 1️⃣ Sorting Intervals

**Why Sort?** To process intervals in chronological order, making it easier to detect overlaps.

**Strategy:** Sort by start point, then by end point (if start points are equal).

```
Unsorted:
[5, 9], [1, 3], [2, 6], [2, 8]

After Sorting:
[1, 3], [2, 6], [2, 8], [5, 9]
(by start point, then end point)

Code (Python):
intervals.sort(key=lambda x: (x[0], x[1]))
```

**Visual Timeline Before/After:**
```
Before:        [5,9]    [1,3]    [2,6]    [2,8]
After:  [1,3]    [2,6]    [2,8]      [5,9]
        0  1  2  3  4  5  6  7  8  9
```

---

### 2️⃣ Merging Overlapping Intervals

**Goal:** Combine overlapping intervals into single intervals.

**Algorithm:**
1. Sort intervals by start point
2. Iterate through sorted intervals
3. If current interval overlaps with previous, merge them
4. Otherwise, add to result

```
Input: [[1,3],[2,6],[8,10],[15,18]]

Step 1 - Sort: (already sorted)

Step 2 - Merge:
├─ [1,3]: Add to result → [[1,3]]
├─ [2,6]: Overlaps with [1,3] → Merge to [1,6] → [[1,6]]
├─ [8,10]: No overlap → Add → [[1,6],[8,10]]
└─ [15,18]: No overlap → Add → [[1,6],[8,10],[15,18]]

Output: [[1,6],[8,10],[15,18]]

Visual:
Before:  |──|  |──|     |──|    |──|
         1  3  2  6     8 10   15 18

After:   |────|   |──|    |──|
         1    6   8 10   15 18
```

---

### 3️⃣ Detecting Overlaps

**Formula for Two Intervals [a,b] and [c,d]:**
```
Overlap exists if: a < d AND c < b
```

**Examples:**
```
[1, 5] and [3, 7]:  1 < 7 ✓ AND 3 < 5 ✓ → OVERLAP
[1, 3] and [4, 6]:  1 < 6 ✓ AND 4 < 3 ✗ → NO OVERLAP
[2, 6] and [2, 8]:  2 < 8 ✓ AND 2 < 6 ✓ → OVERLAP
```

---

### 4️⃣ Separating Start and End Points

**Concept:** Split intervals into separate start and end point arrays, then process them.

**Use Case:** Finding maximum overlapping intervals (Sweeping Line Algorithm)

```
Input Intervals: [1, 4], [2, 5], [3, 6]

Step 1 - Separate:
Starts: [1, 2, 3] (in order)
Ends:   [4, 5, 6] (in order)

Step 2 - Sweep Line:
Time │ Starts │ Ends │ Active
─────┼────────┼──────┼────────
 1   │  +1    │      │   1
 2   │  +1    │      │   2
 3   │  +1    │      │   3
 4   │        │  -1  │   2
 5   │        │  -1  │   1
 6   │        │  -1  │   0

Maximum Active = 3 intervals overlapping at time [3, 4)

Visual:
1   2   3   4   5   6
|─────|
    |─────|
        |─────|
    └───┘
Max overlap = 3
```

---

## Data Structure

### Interval Class Definition

#### Python
```python
class Interval:
    def __init__(self, start, end):
        self.start = start
        self.end = end
    
    def __repr__(self):
        return f"[{self.start}, {self.end}]"
    
    # Method to check overlap
    def overlaps(self, other):
        return self.start < other.end and other.start < self.end
```

#### JavaScript
```javascript
class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    toString() {
        return `[${this.start}, ${this.end}]`;
    }
    
    // Method to check overlap
    overlaps(other) {
        return this.start < other.end && other.start < this.end;
    }
}
```

#### TypeScript
```typescript
class Interval {
    constructor(public start: number, public end: number) {}
    
    toString(): string {
        return `[${this.start}, ${this.end}]`;
    }
    
    // Method to check overlap
    overlaps(other: Interval): boolean {
        return this.start < other.end && other.start < this.end;
    }
}
```

#### Go
```go
type Interval struct {
    Start int
    End   int
}

func (i Interval) String() string {
    return fmt.Sprintf("[%d, %d]", i.Start, i.End)
}

func (i Interval) Overlaps(other Interval) bool {
    return i.Start < other.End && other.Start < i.End
}
```

---

## Common Patterns

### Pattern 1: Merge Intervals
**Problem:** Combine all overlapping intervals
**Approach:** Sort → Iterate → Merge overlaps
**Complexity:** O(n log n) time, O(n) space

### Pattern 2: Find Maximum Overlapping
**Problem:** Find maximum number of overlapping intervals at any point
**Approach:** Sweep line algorithm (separate start/end points)
**Complexity:** O(n log n) time, O(n) space

### Pattern 3: Insert Interval
**Problem:** Insert a new interval into a list and merge if needed
**Approach:** Collect overlapping → Merge → Add non-overlapping
**Complexity:** O(n) time, O(n) space

### Pattern 4: Interval Intersection
**Problem:** Find common overlapping regions of all intervals
**Approach:** Find min of all ends and max of all starts
**Complexity:** O(n) time, O(1) space

---

## Real-world Applications

### 📅 Calendar/Scheduling
```
Meeting 1: [9:00 AM, 10:30 AM]
Meeting 2: [10:00 AM, 11:00 AM]
Meeting 3: [2:00 PM, 3:00 PM]

Overlapping: Meetings 1 & 2 conflict!
Free time: [10:30 AM, 2:00 PM]
```

### 🏥 Hospital Room Allocation
```
Room Booking 1: [08:00, 12:00]
Room Booking 2: [11:00, 15:00]
Room Booking 3: [15:00, 18:00]

Max concurrent bookings: 2 (at 11:00-12:00)
System needs 2 rooms minimum
```

### 📺 Video Streaming
```
Commercial breaks as intervals:
Video Duration: [0, 60 minutes]
Ad 1: [15, 20 minutes]
Ad 2: [35, 40 minutes]
Ad 3: [50, 55 minutes]

Question: Can ads be consolidated?
```

### 💰 Transaction Processing
```
Time interval for transaction completion: [9:00 AM, 5:00 PM]
Business hours: [8:00 AM, 6:00 PM]
Overlap: [9:00 AM, 5:00 PM] (valid processing window)
```

### 🎬 Event Planning
```
Conference Room Schedule:
Talk A: [9:00, 10:00]
Talk B: [10:00, 11:00]
Talk C: [10:30, 11:30]  ← Conflicts with B

Organizer should reschedule Talk C
```

---

## Quick Reference

| Concept | Formula/Check | Example |
|---------|---------------|---------|
| **Closed Interval** | [a, b] = {x \| a ≤ x ≤ b} | [3, 8] |
| **Open Interval** | (a, b) = {x \| a < x < b} | (3, 8) |
| **Half-Open** | [a, b) = {x \| a ≤ x < b} | [3, 8) |
| **Overlap Check** | a < d AND c < b | [1,5] & [3,7] ✓ |
| **Length** | end - start | 8 - 3 = 5 |
| **Merge Start** | min(a, c) | min(2, 4) = 2 |
| **Merge End** | max(b, d) | max(6, 8) = 8 |
| **Intersection** | [max(a,c), min(b,d)] | [3, 5] |

---

## Tips for Solving Interval Problems

✅ **DO:**
- Sort intervals by start point first
- Draw visual representations to understand overlaps
- Use two-pointer technique for sorted intervals
- Handle edge cases (empty intervals, single point, duplicates)
- Consider half-open intervals `[a, b)` for clarity

❌ **DON'T:**
- Forget to sort before processing
- Ignore edge cases at interval boundaries
- Assume intervals are already sorted
- Miss consideration of touching vs. overlapping intervals
- Overcomplicate when simple merge works
# 📊 Complete Guide to Intervals
## Intuition

An interval consists of two values: a start point and an end point. It represents a continuous segment on the number line that includes all values between these two points. It is often used to represent a line, time period, or a continuous range of values.

An interval’s start point indicates where the interval begins.
An interval’s end point indicates where the interval ends.

    |..................|
  start              End 



## Closed intervals: Both the start and end points are included in the interval.
      |-----------------|  [3,8] === 3 <= x <= 8
      3                 8

Open intervals: The start and end points are not included in the interval.
               |------------|   (3,8) === 3 < x < 8
               3            8

Half-open intervals: Either the start or the end point is included, while the other is not.



Overlapping intervals
Two intervals overlap if they share at least one common value.

Image represents a visual depiction of an overlap between two intervals on a number line.  A light green rectangle labeled 'overlap' is positioned between points 4 and 6 on the horizontal axis.  A thick black line extends from point 2 to the left edge of the rectangle at point 4, representing the first interval.  Another thick black line extends from the right edge of the rectangle at point 6 to point 7, representing the second interval.  The numbers 2, 4, 6, and 7 are marked on the axis, indicating the start and end points of the intervals. The overlap region, visually represented by the green rectangle, shows the shared portion between the two intervals, highlighting the concept of overlapping ranges.
The central challenge in most interval problems involves managing overlapping intervals effectively. Whether identifying or merging overlapping intervals, it’s important to determine how the overlap between intervals influences the desired outcome of the problem. The problems in this chapter involve handling overlapping intervals in varying situations.

Sorting intervals
In most interval problems, sorting the intervals before solving the problem is quite helpful since it allows them to be processed in a certain order.

We usually sort intervals by their start point so they can be traversed in chronological order. When two or more intervals have the same start point, we might also need to consider each interval’s end points during sorting.

## Separating start and end points
In certain scenarios, it might be beneficial to process the start and end points of intervals separately. This usually involves creating two sorted arrays: one containing all start points and another containing all end points. For example, this is needed in the sweeping line algorithm, which is explored in the Largest Overlap of Intervals problem.

  
Interval class definition
For the problems in this chapter, intervals are represented using the class below.

``Python
JavaScript
Java
class Interval:
   def __init__(self, start, end):
       self.start = start
       self.end = end
``

## Real-world Example

Scheduling systems: Intervals are widely used in scheduling systems. For instance, in a conference room booking system, each booking is represented as an interval. The interval representation is used if the system requires functionality, such as determining the maximum number of overlapping bookings to ensure sufficient room availability. By analyzing these intervals, the system can efficiently allocate resources and prevent double bookings