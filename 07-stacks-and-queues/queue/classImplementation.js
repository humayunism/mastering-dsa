class OptimizedQueue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  // Add to back: O(1)
  enqueue(element) {
    this.items[this.tail] = element;
    this.tail++;
  }

  // Remove from front: O(1) ✨
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const removed = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return removed;
  }

  // View front: O(1)
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.head];
  }

  // Get size: O(1)
  size() {
    return this.tail - this.head;
  }

  // Check empty: O(1)
  isEmpty() {
    return this.tail - this.head === 0;
  }

  // Clear queue: O(1)
  clear() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  // Helper: Print queue
  print() {
    const elements = [];
    for (let i = this.head; i < this.tail; i++) {
      elements.push(this.items[i]);
    }
    console.log(`Queue [${this.size()}]:`, elements.join(" <- "));
  }
}

// ============ USAGE ============
const q = new OptimizedQueue();

q.enqueue("A");
q.enqueue("B");
q.enqueue("C");
q.print();  // Queue [3]: A <- B <- C

console.log("Dequeued:", q.dequeue());  // Dequeued: A
q.print();  // Queue [2]: B <- C

q.clear();
console.log("After clear, size:", q.size());  // After clear, size: 0