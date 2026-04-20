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

---

### Approach 1: Sort by Start Time (Recommended ⭐)

**Most intuitive approach - directly reflects the problem logic.**

#### Python
```python
def attend_meetings(intervals):
    """
    Time Complexity: O(n log n) - dominated by sorting
    Space Complexity: O(1)
    """
    if not intervals:
        return True
    
    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    
    for i in range(1, len(intervals)):
        current_start = intervals[i][0]
        previous_end = intervals[i - 1][1]
        
        if current_start < previous_end:
            return False
    
    return True

# Test
intervals = [[0, 30], [5, 10], [15, 20]]
print(attend_meetings(intervals))  # False
```

#### JavaScript
```javascript
function attendMeetings(intervals) {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        let currentStart = intervals[i][0];
        let previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}

// Test
console.log(attendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(attendMeetings([[7,10],[2,4]])); // true
```

#### TypeScript
```typescript
function attendMeetings(intervals: number[][]): boolean {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        let currentStart = intervals[i][0];
        let previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}
```

#### Go
```go
func attendMeetings(intervals [][]int) bool {
    if len(intervals) == 0 {
        return true
    }

    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })

    for i := 1; i < len(intervals); i++ {
        currentStart := intervals[i][0]
        previousEnd := intervals[i-1][1]

        if currentStart < previousEnd {
            return false
        }
    }

    return true
}
```

#### C++
```cpp
bool attendMeetings(vector<vector<int>>& intervals) {
    if (intervals.empty()) {
        return true;
    }

    sort(intervals.begin(), intervals.end(), 
         [](const vector<int>& a, const vector<int>& b) {
             return a[0] < b[0];
         });

    for (int i = 1; i < intervals.size(); i++) {
        int currentStart = intervals[i][0];
        int previousEnd = intervals[i - 1][1];

        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}
```

---

### Approach 2: Sort by End Time

**Alternative sorting strategy - works but less intuitive.**

#### Python
```python
def attend_meetings_by_end(intervals):
    if not intervals:
        return True
    
    # Sort by end time (second element)
    intervals.sort(key=lambda x: x[1])
    
    for i in range(1, len(intervals)):
        current_start = intervals[i][0]
        previous_end = intervals[i - 1][1]
        
        if current_start < previous_end:
            return False
    
    return True
```

#### JavaScript
```javascript
function attendMeetings2(intervals) {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[1] - b[1]);

    for (let i = 1; i < intervals.length; i++) {
        let currentStart = intervals[i][0];
        let previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}
```

---

### Approach 3: Class-Based Solution

**Object-oriented approach using Interval class/struct.**

#### Python
```python
class Interval:
    def __init__(self, start, end):
        self.start = start
        self.end = end
    
    def __lt__(self, other):
        return self.start < other.start

def attend_meetings_class_based(intervals):
    if not intervals:
        return True
    
    # Convert to Interval objects
    meetings = [Interval(interval[0], interval[1]) for interval in intervals]
    
    meetings.sort()

    for i in range(1, len(meetings)):
        current_start = meetings[i].start
        previous_end = meetings[i - 1].end
        
        if current_start < previous_end:
            return False
    
    return True
```

#### TypeScript
```typescript
class Interval {
    start: number;
    end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
}

function attendMeetings3(intervals: number[][]): boolean {
    if (intervals.length === 0) return true;

    let meetings: Interval[] = intervals.map(
        (interval: number[]) => new Interval(interval[0], interval[1])
    );

    meetings.sort((a, b) => a.start - b.start);

    for (let i = 1; i < meetings.length; i++) {
        let currentStart = meetings[i].start;
        let previousEnd = meetings[i - 1].end;
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}
```

#### Go
```go
type Interval struct {
    Start int
    End   int
}

type IntervalSlice []Interval

func (is IntervalSlice) Len() int {
    return len(is)
}

func (is IntervalSlice) Less(i, j int) bool {
    return is[i].Start < is[j].Start
}

func (is IntervalSlice) Swap(i, j int) {
    is[i], is[j] = is[j], is[i]
}

func attendMeetingsClassBased(intervals [][]int) bool {
    if len(intervals) == 0 {
        return true
    }

    meetings := make(IntervalSlice, len(intervals))
    for i, interval := range intervals {
        meetings[i] = Interval{Start: interval[0], End: interval[1]}
    }

    sort.Sort(meetings)

    for i := 1; i < len(meetings); i++ {
        if meetings[i].Start < meetings[i-1].End {
            return false
        }
    }

    return true
}
```

#### C++
```cpp
class Interval {
public:
    int start;
    int end;

    Interval(int start = 0, int end = 0) : start(start), end(end) {}

    bool operator<(const Interval& other) const {
        return start < other.start;
    }
};

bool attendMeetingsClassBased(vector<vector<int>>& intervals) {
    if (intervals.empty()) {
        return true;
    }

    vector<Interval> meetings;
    for (const auto& interval : intervals) {
        meetings.push_back(Interval(interval[0], interval[1]));
    }

    sort(meetings.begin(), meetings.end());

    for (int i = 1; i < meetings.size(); i++) {
        if (meetings[i].start < meetings[i - 1].end) {
            return false;
        }
    }

    return true;
} 1][1]
        
        if current_start < previous_end:
            return False
    
    return True

# Test
intervals = [[0, 30], [5, 10], [15, 20]]
print(attend_meetings(intervals))  # False
```

#### JavaScript
```javascript
function attendMeetings(intervals) {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        let currentStart = intervals[i][0];
        let previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}

// Test
console.log(attendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(attendMeetings([[7,10],[2,4]])); // true
```

#### TypeScript
```typescript
function attendMeetings(intervals: number[][]): boolean {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        let currentStart = intervals[i][0];
        let previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}
```

#### Go
```go
func attendMeetings(intervals [][]int) bool {
    if len(intervals) == 0 {
        return true
    }

    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })

    for i := 1; i < len(intervals); i++ {
        currentStart := intervals[i][0]
        previousEnd := intervals[i-1][1]

        if currentStart < previousEnd {
            return false
        }
    }

    return true
}
```

#### C++
```cpp
bool attendMeetings(vector<vector<int>>& intervals) {
    if (intervals.empty()) {
        return true;
    }

    sort(intervals.begin(), intervals.end(), 
         [](const vector<int>& a, const vector<int>& b) {
             return a[0] < b[0];
         });

    for (int i = 1; i < intervals.size(); i++) {
        int currentStart = intervals[i][0];
        int previousEnd = intervals[i - 1][1];

        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}
```

---

### Approach 2: Sort by End Time

**Alternative sorting strategy - works but less intuitive.**

#### Python
```python
def attend_meetings_by_end(intervals):
    if not intervals:
        return True
    
    # Sort by end time (second element)
    intervals.sort(key=lambda x: x[1])
    
    for i in range(1, len(intervals)):
        current_start = intervals[i][0]
        previous_end = intervals[i - 1][1]
        
        if current_start < previous_end:
            return False
    
    return True
```

#### JavaScript
```javascript
function attendMeetings2(intervals) {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[1] - b[1]);

    for (let i = 1; i < intervals.length; i++) {
        let currentStart = intervals[i][0];
        let previousEnd = intervals[i - 1][1];
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}
```

---

### Approach 3: Class-Based Solution

**Object-oriented approach using Interval class/struct.**

#### Python
```python
class Interval:
    def __init__(self, start, end):
        self.start = start
        self.end = end
    
    def __lt__(self, other):
        return self.start < other.start

def attend_meetings_class_based(intervals):
    if not intervals:
        return True
    
    # Convert to Interval objects
    meetings = [Interval(interval[0], interval[1]) for interval in intervals]
    
    meetings.sort()

    for i in range(1, len(meetings)):
        current_start = meetings[i].start
        previous_end = meetings[i - 1].end
        
        if current_start < previous_end:
            return False
    
    return True
```

#### TypeScript
```typescript
class Interval {
    start: number;
    end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
}

function attendMeetings3(intervals: number[][]): boolean {
    if (intervals.length === 0) return true;

    let meetings: Interval[] = intervals.map(
        (interval: number[]) => new Interval(interval[0], interval[1])
    );

    meetings.sort((a, b) => a.start - b.start);

    for (let i = 1; i < meetings.length; i++) {
        let currentStart = meetings[i].start;
        let previousEnd = meetings[i - 1].end;
        if (currentStart < previousEnd) {
            return false;
        }
    }

    return true;
}
```

#### Go
```go
type Interval struct {
    Start int
    End   int
}

type IntervalSlice []Interval

func (is IntervalSlice) Len() int {
    return len(is)
}

func (is IntervalSlice) Less(i, j int) bool {
    return is[i].Start < is[j].Start
}

func (is IntervalSlice) Swap(i, j int) {
    is[i], is[j] = is[j], is[i]
}

func attendMeetingsClassBased(intervals [][]int) bool {
    if len(intervals) == 0 {
        return true
    }

    meetings := make(IntervalSlice, len(intervals))
    for i, interval := range intervals {
        meetings[i] = Interval{Start: interval[0], End: interval[1]}
    }

    sort.Sort(meetings)

    for i := 1; i < len(meetings); i++ {
        if meetings[i].Start < meetings[i-1].End {
            return false
        }
    }

    return true
}
```

#### C++
```cpp
class Interval {
public:
    int start;
    int end;

    Interval(int start = 0, int end = 0) : start(start), end(end) {}

    bool operator<(const Interval& other) const {
        return start < other.start;
    }
};

bool attendMeetingsClassBased(vector<vector<int>>& intervals) {
    if (intervals.empty()) {
        return true;
    }

    vector<Interval> meetings;
    for (const auto& interval : intervals) {
        meetings.push_back(Interval(interval[0], interval[1]));
    }

    sort(meetings.begin(), meetings.end());

    for (int i = 1; i < meetings.size(); i++) {
        if (meetings[i].start < meetings[i - 1].end) {
            return false;
        }
    }

    return true;
}
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
