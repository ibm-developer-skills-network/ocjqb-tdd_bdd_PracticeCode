const Stack = require('./stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    // Setup before each test
    stack = new Stack();
  });

  afterEach(() => {
    // Tear down after each test
    stack = null;
  });

  test.todo('isEmpty should return true when stack is empty');

  test.todo('isEmpty should return false when stack has items');

  test.todo('peek should return the top item without removing it');

  test.todo('push should add an item to the stack');

  test.todo('pop should remove and return the top item from the stack');


});