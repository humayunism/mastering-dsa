// We will implement a singly linked list using a functional approach (class methods)

// Step 1 : The node class

// First we need a a blueprint for a single node . A node holds data and a pointer(address/ reference) to the next node in the list.


class Node {
    constructor(data) {
        this.data = data;// the value
        this.next = null;// The pointer (initially pointing to null)
    }
}

// Step 2 : The singly linked list class


class LinkedList {
    constructor() {
        this.head = null; // Initially the list is empty so head is null
    }
  // Methods will be added here...

// Step 3 : Implementing methods for the linked list

// insert operations
// insert at the beginning(prepend)
//Logic: Create a new node, point the new nodes's next to the current head, update the head to the new node
// Insert at the end (append)
// logic : Create a new node, if the list is empty, make it the head. If not, traverse to the end of the list and point the last node's next to the new node.


    insertAtBeginning(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        console.log(`Inserted ${data} at the beginning`);
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if(!this.head) {
            this.head = newNode;
            console.log(`Inserted ${data} at the end as the head node`);
            return;
        }

        // if not, traverse to the end of the list
        let current = this.head;
        while(current.next) {
            current = current.next;
        }
        current.next = newNode;
        console.log(`Inserted ${data} at the end`);

    }

    issertAtPosition(data, position) {
        if(position < 0) {
            console.log("Invalid position");
            return;
        }

        if(position === 0) {
            this.insertAtBeginning(data);
            return;
        }

        const newNode = new Node(data);
        let current = this.head;
        for(let i = 0; i < position - 1 && current; i++) {
            current = current.next;
        }

        if(!current) {
            console.log("Position out of bounds");
            return;
        }

        newNode.next = current.next;
        current.next = newNode;
        console.log(`Inserted ${data} at position ${position}`);
    }

    // insert after a specific value

    insertAfterValue(data, value) {
        const newNode = new Node(data);
        let current = this.head;
        while(current && current.data !== value) {
            current = current.next;
        }
        if(!current) {
            console.log("Value not found");
            return;
        }
        newNode.next = current.next;
        current.next = newNode;
        console.log(`Inserted ${data} after value ${value}`);
    }
    insertBeforeValue(data, value) {
        const newNode = new Node(data);
        if(!this.head) {
            console.log("List is empty");
            return;
        }
        if(this.head.data === value) {
            this.insertAtBeginning(data);
            return;
        }
        let current = this.head;
        while(current.next && current.next.data !== value) {
            current = current.next;
        }
        if(!current.next) {
            console.log("Value not found");
            return;
        }
        newNode.next = current.next;
        current.next = newNode;
        console.log(`Inserted ${data} before value ${value}`);
    }

    // delete operations 
    // delete the first Nnode;
    //logic : Move the head pointer to the next node. This first node is automatically removed by garbage collection

    
    deleteFirstNode() {
        if(!this.head) {
            console.log("List is empty");
            return;
        }
        this.head = this.head.next;
        console.log("Deleted the first node");
    }

    deleteLastNode() {
        if(!this.head) {
            console.log("List is empty");
            return;
        }
        if(!this.head.next) { // only one node
            this.head = null;
            console.log("Deleted the last node, list is now empty");
            return;
        }
        let current = this.head;
        while(current.next && current.next.next) {
            current = current.next;
        }
        current.next = null;
        console.log("Deleted the last node");
    }
    // delete node at a specific position

    deleteNodeAtPosition(position) {
        if(position < 0) {
            console.log("Invalid position");
            return;
        }

        if(position === 0) {
            this.deleteFirstNode();
            return;
        }

        let current = this.head;
        for(let i = 0; i < position - 1 && current; i++) {
            current = current.next;
        }

        if(!current || !current.next) {
            console.log("Position out of bounds");
            return;
        }

        current.next = current.next.next;
        console.log(`Deleted node at position ${position}`);
    }

    // delete a node by value

    deleteNodeByValue(value) {
        if(!this.head) {
            console.log("List is empty");
            return;
        }
        if(this.head.data === value) {
            this.deleteFirstNode();
            return;
        }
        let current = this.head;
        while(current.next && current.next.data !== value) {
            current = current.next;
        }
        if(!current.next) {
            console.log("Value not found");
            return;
        }
        current.next = current.next.next;
        console.log(`Deleted node with value ${value}`);
    }

    // search operations and Traversal operations

    // search for a value;
    // logic : Traverse the list and compare each node's data with the target value

    searchValue(value) {
        let current = this.head;
        while(current) {
            if(current.data === value) {
                console.log(`Value ${value} found in the list`);
                return true;
            }
           current = current.next;
        }
        console.log(`Value ${value} not found in the list`);
        return false;
    }
    // print list 
    // logic : Traverse the list and collect each node's data for display
    printList() {
        let current = this.head;
        let listStr = "";
        while(current) {
            listStr += current.data + " -->";
            current = current.next;
        }
        console.log("List: " + listStr);
    }

} // end of the linkedlist class

// let test the implementation at this phase
const linkedList = new LinkedList();
// now make a list by inserting some values
linkedList.insertAtEnd(10);
linkedList.insertAtBeginning(5);
linkedList.insertAtEnd(15);
linkedList.insertAfterValue(12, 10);
linkedList.insertBeforeValue(8, 10);
linkedList.printList(); // Expected List: 5 --> 8 --> 10 --> 12 --> 15 -->
linkedList.searchValue(12); // Expected: Value 12 found in the list
linkedList.deleteNodeByValue(8);
linkedList.printList(); // Expected List: 5 --> 10 --> 12 --> 15 -->
linkedList.deleteFirstNode();
linkedList.printList(); // Expected List: 10 --> 12 --> 15 -->
linkedList.deleteLastNode();
linkedList.printList(); // Expected List: 10 --> 12 -->         
linkedList.deleteNodeAtPosition(1);

// now implement this linkedlist by pure functional approach without using classes
