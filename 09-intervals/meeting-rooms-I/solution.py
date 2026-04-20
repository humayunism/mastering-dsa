# Approach 1: Sort by start time

def attend_meetings(intervals):
    """
    Determine if a person can attend all meetings without conflicts.
    Sort by start time.
    
    Time Complexity: O(n log n) - dominated by sorting
    Space Complexity: O(1) - if we don't count the space used by sort
    """
    if not intervals:
        return True
    
    # Sort by start time (first element of each interval)
    intervals.sort(key=lambda x: x[0])
    
    for i in range(1, len(intervals)):
        current_start = intervals[i][0]
        previous_end = intervals[i - 1][1]
        
        # If current meeting starts before previous one ends, conflict!
        if current_start < previous_end:
            return False
    
    return True


# Test cases
intervals = [[0, 30], [5, 10], [15, 20]]
print(attend_meetings(intervals))  # False

intervals = [[7, 10], [2, 4]]
print(attend_meetings(intervals))  # True


# Approach 2: Sort by end time

def attend_meetings_by_end(intervals):
    """
    Determine if a person can attend all meetings without conflicts.
    Sort by end time.
    
    Time Complexity: O(n log n) - dominated by sorting
    Space Complexity: O(1) - if we don't count the space used by sort
    """
    if not intervals:
        return True
    
    # Sort by end time (second element of each interval)
    intervals.sort(key=lambda x: x[1])
    
    for i in range(1, len(intervals)):
        current_start = intervals[i][0]
        previous_end = intervals[i - 1][1]
        
        if current_start < previous_end:
            return False
    
    return True


intervals = [[0, 30], [5, 10], [15, 20]]
print(attend_meetings_by_end(intervals))  # False

intervals = [[7, 10], [2, 4]]
print(attend_meetings_by_end(intervals))  # True


# Approach 3: Class-based solution

class Interval:
    """Represents a time interval with start and end times."""
    
    def __init__(self, start, end):
        self.start = start
        self.end = end
    
    def __repr__(self):
        return f"Interval({self.start}, {self.end})"
    
    def __lt__(self, other):
        """Less than operator for sorting by start time."""
        return self.start < other.start


def attend_meetings_class_based(intervals):
    """
    Determine if a person can attend all meetings without conflicts.
    Uses Interval class objects.
    
    Time Complexity: O(n log n) - dominated by sorting
    Space Complexity: O(n) - space for creating Interval objects
    """
    if not intervals:
        return True
    
    # Convert list pairs to Interval objects
    meetings = [Interval(interval[0], interval[1]) for interval in intervals]
    
    # Sort by start time using __lt__ operator
    meetings.sort()
    
    for i in range(1, len(meetings)):
        current_start = meetings[i].start
        previous_end = meetings[i - 1].end
        
        if current_start < previous_end:
            return False
    
    return True


intervals = [[0, 30], [5, 10], [15, 20]]
print(attend_meetings_class_based(intervals))  # False

intervals = [[7, 10], [2, 4]]
print(attend_meetings_class_based(intervals))  # True

intervals = [[0, 5], [5, 10], [10, 15]]
print(attend_meetings_class_based(intervals))  # True (no conflict at endpoints)
