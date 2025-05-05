const Stack = require('./stack');

class TestStack {
    /**
     * Test cases for Stack
     */
    
    constructor() {
        this.stack = null;
    }

    setUp() {
        /**
         * Setup before each test
         */
        this.stack = new Stack();
    }

    tearDown() {
        /**
         * Tear down after each test
         */
        this.stack = null;
    }

    testPush() {
        /**
         * Test pushing an item into the stack
         */
        throw new Error("not implemented");
    }

    testPop() {
        /**
         * Test popping an item off the stack
         */
        throw new Error("not implemented");
    }

    testPeek() {
        /**
         * Test peeking at the top of the stack
         */
        throw new Error("not implemented");
    }

    testIsEmpty() {
        /**
         * Test if the stack is empty
         */
        throw new Error("not implemented");
    }
}

module.exports = TestStack;