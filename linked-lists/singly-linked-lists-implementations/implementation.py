# Step 1: The Node Class
# Blueprint for a single node. A node holds data and a pointer (reference) to the next node.

class Node:
    def __init__(self, data):
        self.data = data  # The value
        self.next = None  # The pointer (initially pointing to None)

# Step 2: The Singly Linked List Class

class LinkedList:
    def __init__(self):
        self.head = None  # Initially the list is empty so head is None

    # Step 3: Implementing methods for the linked list

    # Insert Operations
    # Insert at the beginning (prepend)
    # Logic: Create a new node, point the new node's next to the current head, update the head to the new node
    
    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        print(f"Inserted {data} at the beginning")

    # Insert at the end (append)
    # Logic: Create a new node, if the list is empty, make it the head. 
    # If not, traverse to the end of the list and point the last node's next to the new node.

    def insert_at_end(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            print(f"Inserted {data} at the end as the head node")
            return

        # If not, traverse to the end of the list
        current = self.head
        while current.next:
            current = current.next
        
        current.next = new_node
        print(f"Inserted {data} at the end")

    def insert_at_position(self, data, position):
        if position < 0:
            print("Invalid position")
            return

        if position == 0:
            self.insert_at_beginning(data)
            return

        new_node = Node(data)
        current = self.head
        
        # Traverse to the node just before the desired position
        for i in range(position - 1):
            if current:
                current = current.next
            else:
                break

        if not current:
            print("Position out of bounds")
            return

        new_node.next = current.next
        current.next = new_node
        print(f"Inserted {data} at position {position}")

    # Insert after a specific value

    def insert_after_value(self, data, value):
        new_node = Node(data)
        current = self.head
        
        while current and current.data != value:
            current = current.next
        
        if not current:
            print("Value not found")
            return
        
        new_node.next = current.next
        current.next = new_node
        print(f"Inserted {data} after value {value}")

    def insert_before_value(self, data, value):
        new_node = Node(data)
        
        if not self.head:
            print("List is empty")
            return
        
        if self.head.data == value:
            self.insert_at_beginning(data)
            return
        
        current = self.head
        
        # We look ahead to see if the NEXT node is the target
        while current.next and current.next.data != value:
            current = current.next
        
        if not current.next:
            print("Value not found")
            return
        
        new_node.next = current.next
        current.next = new_node
        print(f"Inserted {data} before value {value}")

    # Delete Operations 
    # Delete the first node
    # Logic: Move the head pointer to the next node. The first node is automatically removed by garbage collection

    def delete_first_node(self):
        if not self.head:
            print("List is empty")
            return
        
        self.head = self.head.next
        print("Deleted the first node")

    def delete_last_node(self):
        if not self.head:
            print("List is empty")
            return
        
        if not self.head.next:  # Only one node
            self.head = None
            print("Deleted the last node, list is now empty")
            return
        
        current = self.head
        
        # Traverse to the second to last node
        while current.next and current.next.next:
            current = current.next
        
        current.next = None
        print("Deleted the last node")

    # Delete node at a specific position

    def delete_node_at_position(self, position):
        if position < 0:
            print("Invalid position")
            return

        if position == 0:
            self.delete_first_node()
            return

        current = self.head
        
        for i in range(position - 1):
            if current:
                current = current.next
            else:
                break

        if not current or not current.next:
            print("Position out of bounds")
            return

        current.next = current.next.next
        print(f"Deleted node at position {position}")

    # Delete a node by value

    def delete_node_by_value(self, value):
        if not self.head:
            print("List is empty")
            return
        
        if self.head.data == value:
            self.delete_first_node()
            return
        
        current = self.head
        
        # Look ahead to find the node BEFORE the one we want to delete
        while current.next and current.next.data != value:
            current = current.next
        
        if not current.next:
            print("Value not found")
            return
        
        current.next = current.next.next
        print(f"Deleted node with value {value}")

    # Search Operations and Traversal Operations

    # Search for a value
    # Logic: Traverse the list and compare each node's data with the target value

    def search_value(self, value):
        current = self.head
        while current:
            if current.data == value:
                print(f"Value {value} found in the list")
                return True
            current = current.next
        
        print(f"Value {value} not found in the list")
        return False

    # Print list 
    # Logic: Traverse the list and collect each node's data for display
    def print_list(self):
        current = self.head
        list_str = ""
        while current:
            list_str += str(current.data) + " --> "
            current = current.next
        
        # Add None to indicate the end
        print("List: " + list_str + "None")

# End of the linkedlist class

# Let's test the implementation at this phase
linkedList = LinkedList()

# Now make a list by inserting some values
linkedList.insert_at_end(10)
linkedList.insert_at_beginning(5)
linkedList.insert_at_end(15)
linkedList.insert_after_value(12, 10)
linkedList.insert_before_value(8, 10)

linkedList.print_list() 
# Expected List: 5 --> 8 --> 10 --> 12 --> 15 --> None

linkedList.search_value(12) 
# Expected: Value 12 found in the list

linkedList.delete_node_by_value(8)
linkedList.print_list() 
# Expected List: 5 --> 10 --> 12 --> 15 --> None

linkedList.delete_first_node()
linkedList.print_list() 
# Expected List: 10 --> 12 --> 15 --> None

linkedList.delete_last_node()
linkedList.print_list() 
# Expected List: 10 --> 12 --> None

linkedList.delete_node_at_position(1)
linkedList.print_list() 
# Expected List: 10 --> None