class OptimizedQueue:
    def __init__(self):
        self.items = {}
        self.head = 0
        self.tail = 0

    def enqueue(self, element):
        """Add to back: O(1)"""
        self.items[self.tail] = element
        self.tail += 1

    def dequeue(self):
        """Remove from front: O(1) ✨"""
        if self.is_empty():
            return None
        
        removed = self.items[self.head]
        del self.items[self.head]  # O(1) deletion from dict
        self.head += 1
        return removed

    def peek(self):
        """View front: O(1)"""
        if self.is_empty():
            return None
        return self.items[self.head]

    def size(self):
        """Get size: O(1)"""
        return self.tail - self.head

    def is_empty(self):
        """Check empty: O(1)"""
        return self.size() == 0

    def clear(self):
        """Clear queue: O(1)"""
        self.items = {}  # Garbage collector will clean up the old dict
        self.head = 0
        self.tail = 0

    def __str__(self):
        """Helper to print queue nicely"""
        elements = [str(self.items[i]) for i in range(self.head, self.tail)]
        return f"Queue [{self.size()}]: {' <- '.join(elements)}"


# ============ USAGE ============
my_queue = OptimizedQueue()

my_queue.enqueue("Apple")
my_queue.enqueue("Banana")
my_queue.enqueue("Cherry")

print(my_queue)  
# Queue [3]: Apple <- Banana <- Cherry

print("Front is:", my_queue.peek())  # Front is: Apple

print("Removed:", my_queue.dequeue())  # Removed: Apple
print(my_queue)  
# Queue [2]: Banana <- Cherry

my_queue.clear()
print("Is empty after clear?", my_queue.is_empty())  # Is empty after clear? True