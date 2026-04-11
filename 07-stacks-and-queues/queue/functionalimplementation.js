function createOptimizedQueue() {
  // Use object instead of array
  let items = {};
  let head = 0;  // Front pointer
  let tail = 0;  // Back pointer

  return {
    // Add to back: O(1)
    enqueue(element) {
      items[tail] = element;
      tail++;
      console.log(`Enqueued: ${element}`);
    },

    // Remove from front: O(1) ✨
    dequeue() {
      if (head === tail) {
        console.log("Queue is empty!");
        return undefined;
      }
      const removed = items[head];
      delete items[head];  // Free up memory
      head++;
      console.log(`Dequeued: ${removed}`);
      return removed;
    },

    // View front: O(1)
    peek() {
      if (head === tail) {
        console.log("Queue is empty!");
        return undefined;
      }
      return items[head];
    },

    // Get size: O(1)
    size() {
      return tail - head;
    },

    // Check empty: O(1)
    isEmpty() {
      return tail - head === 0;
    },

    // Clear queue: O(1)
    clear() {
      items = {};  // Create new empty object
      head = 0;
      tail = 0;
      console.log("Queue cleared!");
    },

    // Helper: Print queue
    print() {
      const elements = [];
      for (let i = head; i < tail; i++) {
        elements.push(items[i]);
      }
      console.log("Queue:", elements.join(" <- "));
      console.log(`[head=${head}, tail=${tail}, size=${tail - head}]`);
    }
  };
}

// ============ USAGE ============
const queue = createOptimizedQueue();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.print();
// Queue: 10 <- 20 <- 30
// [head=0, tail=3, size=3]

queue.dequeue();  // Removes 10
queue.print();
// Queue: 20 <- 30
// [head=1, tail=3, size=2]

queue.clear();
queue.print();
// Queue cleared!
// Queue: 
// [head=0, tail=0, size=0]

queue.enqueue(100);
queue.enqueue(200);
queue.print();
// Queue: 100 <- 200
// [head=0, tail=2, size=2]