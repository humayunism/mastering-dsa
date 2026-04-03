package main

import (
    "fmt"
)

// Step 1: The Node Struct
// Blueprint for a single node. A node holds data and a pointer (reference) to the next node.
// We use [T comparable] so the list can store any comparable data type (int, string, etc.)

type Node[T comparable] struct {
    data T
    next *Node[T]
}

// Step 2: The Linked List Struct

type LinkedList[T comparable] struct {
    head *Node[T]
}

// NewLinkedList is a constructor function to initialize an empty list
func NewLinkedList[T comparable]() *LinkedList[T] {
    return &LinkedList[T]{
        head: nil,
    }
}

// Step 3: Implementing methods for the linked list

// InsertAtBeginning inserts a node at the start
// Logic: Create a new node, point the new node's next to the current head, update the head to the new node
func (ll *LinkedList[T]) InsertAtBeginning(data T) {
    newNode := &Node[T]{data: data, next: ll.head}
    ll.head = newNode
    fmt.Printf("Inserted %v at the beginning\n", data)
}

// InsertAtEnd inserts a node at the end
// Logic: Create a new node, if the list is empty, make it the head.
// If not, traverse to the end of the list and point the last node's next to the new node.
func (ll *LinkedList[T]) InsertAtEnd(data T) {
    newNode := &Node[T]{data: data, next: nil}

    if ll.head == nil {
        ll.head = newNode
        fmt.Printf("Inserted %v at the end as the head node\n", data)
        return
    }

    // If not, traverse to the end of the list
    current := ll.head
    for current.next != nil {
        current = current.next
    }
    current.next = newNode
    fmt.Printf("Inserted %v at the end\n", data)
}

// InsertAtPosition inserts a node at a specific 0-based index
func (ll *LinkedList[T]) InsertAtPosition(data T, position int) {
    if position < 0 {
        fmt.Println("Invalid position")
        return
    }

    if position == 0 {
        ll.InsertAtBeginning(data)
        return
    }

    newNode := &Node[T]{data: data, next: nil}
    current := ll.head

    // Traverse to the node just before the desired position
    for i := 0; i < position-1; i++ {
        if current == nil {
            break
        }
        current = current.next
    }

    if current == nil {
        fmt.Println("Position out of bounds")
        return
    }

    newNode.next = current.next
    current.next = newNode
    fmt.Printf("Inserted %v at position %d\n", data, position)
}

// InsertAfterValue inserts a new node after the first node found with the specific value
func (ll *LinkedList[T]) InsertAfterValue(data T, value T) {
    newNode := &Node[T]{data: data, next: nil}
    current := ll.head

    for current != nil && current.data != value {
        current = current.next
    }

    if current == nil {
        fmt.Println("Value not found")
        return
    }

    newNode.next = current.next
    current.next = newNode
    fmt.Printf("Inserted %v after value %v\n", data, value)
}

// InsertBeforeValue inserts a new node before the first node found with the specific value
func (ll *LinkedList[T]) InsertBeforeValue(data T, value T) {
    newNode := &Node[T]{data: data, next: nil}

    if ll.head == nil {
        fmt.Println("List is empty")
        return
    }

    // If the head is the value, insert at beginning
    if ll.head.data == value {
        ll.InsertAtBeginning(data)
        return
    }

    current := ll.head

    // We look ahead to see if the NEXT node is the target
    for current.next != nil && current.next.data != value {
        current = current.next
    }

    if current.next == nil {
        fmt.Println("Value not found")
        return
    }

    newNode.next = current.next
    current.next = newNode
    fmt.Printf("Inserted %v before value %v\n", data, value)
}

// DeleteFirstNode removes the first node
// Logic: Move the head pointer to the next node. The first node is garbage collected.
func (ll *LinkedList[T]) DeleteFirstNode() {
    if ll.head == nil {
        fmt.Println("List is empty")
        return
    }

    ll.head = ll.head.next
    fmt.Println("Deleted the first node")
}

// DeleteLastNode removes the last node
func (ll *LinkedList[T]) DeleteLastNode() {
    if ll.head == nil {
        fmt.Println("List is empty")
        return
    }

    // If only one node exists
    if ll.head.next == nil {
        ll.head = nil
        fmt.Println("Deleted the last node, list is now empty")
        return
    }

    current := ll.head
    // Traverse to the second to last node
    for current.next.next != nil {
        current = current.next
    }

    current.next = nil
    fmt.Println("Deleted the last node")
}

// DeleteNodeAtPosition removes a node at a specific 0-based index
func (ll *LinkedList[T]) DeleteNodeAtPosition(position int) {
    if position < 0 {
        fmt.Println("Invalid position")
        return
    }

    if position == 0 {
        ll.DeleteFirstNode()
        return
    }

    current := ll.head
    for i := 0; i < position-1; i++ {
        if current == nil {
            break
        }
        current = current.next
    }

    if current == nil || current.next == nil {
        fmt.Println("Position out of bounds")
        return
    }

    current.next = current.next.next
    fmt.Printf("Deleted node at position %d\n", position)
}

// DeleteNodeByValue removes the first node found with the specific value
func (ll *LinkedList[T]) DeleteNodeByValue(value T) {
    if ll.head == nil {
        fmt.Println("List is empty")
        return
    }

    if ll.head.data == value {
        ll.DeleteFirstNode()
        return
    }

    current := ll.head
    // Look ahead to find the node BEFORE the one we want to delete
    for current.next != nil && current.next.data != value {
        current = current.next
    }

    if current.next == nil {
        fmt.Println("Value not found")
        return
    }

    current.next = current.next.next
    fmt.Printf("Deleted node with value %v\n", value)
}

// SearchValue checks if a value exists in the list
func (ll *LinkedList[T]) SearchValue(value T) bool {
    current := ll.head
    for current != nil {
        if current.data == value {
            fmt.Printf("Value %v found in the list\n", value)
            return true
        }
        current = current.next
    }
    fmt.Printf("Value %v not found in the list\n", value)
    return false
}

// PrintList displays the contents of the list
func (ll *LinkedList[T]) PrintList() {
    current := ll.head
    listStr := ""
    for current != nil {
        listStr += fmt.Sprintf("%v --> ", current.data)
        current = current.next
    }
    // Add nil/null to indicate the end
    fmt.Println("List: " + listStr + "null")
}

func main() {
    // Let's test the implementation at this phase
    // We instantiate the LinkedList with int type [int]
    linkedList := NewLinkedList[int]()

    // Now make a list by inserting some values
    linkedList.InsertAtEnd(10)
    linkedList.InsertAtBeginning(5)
    linkedList.InsertAtEnd(15)
    linkedList.InsertAfterValue(12, 10)
    linkedList.InsertBeforeValue(8, 10)
    linkedList.PrintList() // Expected List: 5 --> 8 --> 10 --> 12 --> 15 --> null

    linkedList.SearchValue(12) // Expected: Value 12 found in the list

    linkedList.DeleteNodeByValue(8)
    linkedList.PrintList() // Expected List: 5 --> 10 --> 12 --> 15 --> null

    linkedList.DeleteFirstNode()
    linkedList.PrintList() // Expected List: 10 --> 12 --> 15 --> null

    linkedList.DeleteLastNode()
    linkedList.PrintList() // Expected List: 10 --> 12 --> null

    linkedList.DeleteNodeAtPosition(1)
    linkedList.PrintList() // Expected List: 10 --> null
}