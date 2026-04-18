def create_queue():
    # Private state
    items = {}
    head = 0
    tail = 0

    # --- Helper Methods (Internal) ---
    def _is_empty():
        return tail - head == 0

    def _print_queue():
        elements = [items[i] for i in range(head, tail)]
        print(f"Queue [{tail - head}]: {' <- '.join(map(str, elements))}")
        print(f"[head={head}, tail={tail}]")

    # --- Public Methods (Returned) ---
    def enqueue(element):
        nonlocal tail
        items[tail] = element
        tail += 1
        print(f"Enqueued: {element}")

    def dequeue():
        nonlocal head
        if _is_empty():
            print("Queue is empty!")
            return None
        removed = items[head]
        del items[head]  # Python's way to delete object key
        head += 1
        print(f"Dequeued: {removed}")
        return removed

    def peek():
        if _is_empty():
            print("Queue is empty!")
            return None
        return items[head]

    def size():
        return tail - head

    def clear():
        nonlocal items, head, tail
        items = {}  # Create new empty dictionary
        head = 0
        tail = 0
        print("Queue cleared!")

    # Return a dictionary acting as an object with methods
    return {
        'enqueue': enqueue,
        'dequeue': dequeue,
        'peek': peek,
        'size': size,
        'is_empty': _is_empty,
        'clear': clear,
        'print': _print_queue
    }

# ============ USAGE ============
q = create_queue()

q['enqueue'](10)
q['enqueue'](20)
q['enqueue'](30)
q['print']()
# Queue [3]: 10 <- 20 <- 30
# [head=0, tail=3]

q['dequeue']()  # Dequeued: 10
q['print']()
# Queue [2]: 20 <- 30
# [head=1, tail=3]

q['clear']()
print("Size after clear:", q['size']())  # Size after clear: 0