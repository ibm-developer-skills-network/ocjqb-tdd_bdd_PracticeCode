/**
 * Implements a Stack data structure
 */
class Stack {
    /**
     * Constructor
     */
    constructor() {
        this.items = [];
    }
    
    /**
     * Places an item onto the stack
     * @param {any} data - The item to push onto the stack
     */
    push(data) {
        this.items.push(data);
    }
    
    /**
     * Removes an item from the stack and returns it
     * @returns {any} The item removed from the stack
     */
    pop() {
        return this.items.pop();
    }
    
    /**
     * Returns the item at the top of the stack without removing it
     * @returns {any} The item at the top of the stack
     */
    peek() {
        return this.items[this.items.length - 1];
    }
    
    /**
     * Returns true if the stack is empty, otherwise returns false
     * @returns {boolean} True if stack is empty, false otherwise
     */
    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = Stack;