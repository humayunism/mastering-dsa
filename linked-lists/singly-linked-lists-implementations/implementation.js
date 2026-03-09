"use strict";
// Step 1: The LinkedListNode Class
// Blueprint for a single node. A node holds data and a pointer (reference) to the next node.
// We use Generics <T> so the list can store any type of data (number, string, etc.)
class LinkedListNode {
    constructor(data) {
        this.data = data; // The value
        this.next = null; // The pointer (initially pointing to null)
    }
}
// Step 2: The Singly Linked List Class
class LinkedList {
    constructor() {
        this.head = null; // Initially the list is empty so head is null
    }
    // Step 3: Implementing methods for the linked list
    // Insert Operations
    // Insert at the beginning (prepend)
    // Logic: Create a new node, point the new node's next to the current head, update the head to the new node
    insertAtBeginning(data) {
        const newNode = new LinkedListNode(data);
        newNode.next = this.head;
        this.head = newNode;
        console.log(`Inserted ${data} at the beginning`);
    }
    // Insert at the end (append)
    // Logic: Create a new node, if the list is empty, make it the head. 
    // If not, traverse to the end of the list and point the last node's next to the new node.
    insertAtEnd(data) {
        const newNode = new LinkedListNode(data);
        if (!this.head) {
            this.head = newNode;
            console.log(`Inserted ${data} at the end as the head node`);
            return;
        }
        // If not, traverse to the end of the list
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        // TypeScript knows current is not null here because of the while loop condition
        current.next = newNode;
        console.log(`Inserted ${data} at the end`);
    }
    insertAtPosition(data, position) {
        if (position < 0) {
            console.log("Invalid position");
            return;
        }
        if (position === 0) {
            this.insertAtBeginning(data);
            return;
        }
        const newNode = new LinkedListNode(data);
        let current = this.head;
        // Traverse to the node just before the desired position
        for (let i = 0; i < position - 1; i++) {
            if (current) {
                current = current.next;
            }
            else {
                break;
            }
        }
        if (!current) {
            console.log("Position out of bounds");
            return;
        }
        newNode.next = current.next;
        current.next = newNode;
        console.log(`Inserted ${data} at position ${position}`);
    }
    // Insert after a specific value
    insertAfterValue(data, value) {
        const newNode = new LinkedListNode(data);
        let current = this.head;
        while (current && current.data !== value) {
            current = current.next;
        }
        if (!current) {
            console.log("Value not found");
            return;
        }
        newNode.next = current.next;
        current.next = newNode;
        console.log(`Inserted ${data} after value ${value}`);
    }
    insertBeforeValue(data, value) {
        const newNode = new LinkedListNode(data);
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        if (this.head.data === value) {
            this.insertAtBeginning(data);
            return;
        }
        let current = this.head;
        // We look ahead to see if the NEXT node is the target
        while (current.next && current.next.data !== value) {
            current = current.next;
        }
        if (!current.next) {
            console.log("Value not found");
            return;
        }
        newNode.next = current.next;
        current.next = newNode;
        console.log(`Inserted ${data} before value ${value}`);
    }
    // Delete Operations 
    // Delete the first node
    // Logic: Move the head pointer to the next node. The first node is automatically removed by garbage collection
    deleteFirstNode() {
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        this.head = this.head.next;
        console.log("Deleted the first node");
    }
    deleteLastNode() {
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        if (!this.head.next) { // Only one node
            this.head = null;
            console.log("Deleted the last node, list is now empty");
            return;
        }
        let current = this.head;
        // Traverse to the second to last node
        while (current.next && current.next.next) {
            current = current.next;
        }
        // current.next is guaranteed to exist here due to the previous if check
        current.next = null;
        console.log("Deleted the last node");
    }
    // Delete node at a specific position
    deleteNodeAtPosition(position) {
        if (position < 0) {
            console.log("Invalid position");
            return;
        }
        if (position === 0) {
            this.deleteFirstNode();
            return;
        }
        let current = this.head;
        for (let i = 0; i < position - 1; i++) {
            if (current) {
                current = current.next;
            }
            else {
                break;
            }
        }
        if (!current || !current.next) {
            console.log("Position out of bounds");
            return;
        }
        current.next = current.next.next;
        console.log(`Deleted node at position ${position}`);
    }
    // Delete a node by value
    deleteNodeByValue(value) {
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        if (this.head.data === value) {
            this.deleteFirstNode();
            return;
        }
        let current = this.head;
        // Look ahead to find the node BEFORE the one we want to delete
        while (current.next && current.next.data !== value) {
            current = current.next;
        }
        if (!current.next) {
            console.log("Value not found");
            return;
        }
        current.next = current.next.next;
        console.log(`Deleted node with value ${value}`);
    }
    // Search Operations and Traversal Operations
    // Search for a value
    // Logic: Traverse the list and compare each node's data with the target value
    searchValue(value) {
        let current = this.head;
        while (current) {
            if (current.data === value) {
                console.log(`Value ${value} found in the list`);
                return true;
            }
            current = current.next;
        }
        console.log(`Value ${value} not found in the list`);
        return false;
    }
    // Print list 
    // Logic: Traverse the list and collect each node's data for display
    printList() {
        let current = this.head;
        let listStr = "";
        while (current) {
            listStr += current.data + " --> ";
            current = current.next;
        }
        // Add null to indicate the end
        console.log("List: " + listStr + "null");
    }
}
// End of the linkedlist class
// Let's test the implementation at this phase
// We specify  because our examples use numbers.
const linkedList = new LinkedList();
// Now make a list by inserting some values
linkedList.insertAtEnd(10);
linkedList.insertAtBeginning(5);
linkedList.insertAtEnd(15);
linkedList.insertAfterValue(12, 10);
linkedList.insertBeforeValue(8, 10);
linkedList.printList();
// Expected List: 5 --> 8 --> 10 --> 12 --> 15 --> null
linkedList.searchValue(12);
// Expected: Value 12 found in the list
linkedList.deleteNodeByValue(8);
linkedList.printList();
// Expected List: 5 --> 10 --> 12 --> 15 --> null
linkedList.deleteFirstNode();
linkedList.printList();
// Expected List: 10 --> 12 --> 15 --> null
linkedList.deleteLastNode();
linkedList.printList();
// Expected List: 10 --> 12 --> null
linkedList.deleteNodeAtPosition(1);
linkedList.printList();
// Expected List: 10 --> null
