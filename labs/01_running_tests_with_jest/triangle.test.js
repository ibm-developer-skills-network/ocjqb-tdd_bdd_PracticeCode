const { areaOfATriangle } = require('./triangle');

// Using Jest testing framework
describe('Area of Triangle Tests', () => {
  
  test('Test areas when values are floats', () => {
    expect(areaOfATriangle(3.4556, 8.3567)).toBeCloseTo(14.43870626);
    expect(areaOfATriangle(2.3, 5.7)).toBe(6.555);
  });

  test('Test areas when values are integers', () => {
    expect(areaOfATriangle(2, 5)).toBe(5.0);
    expect(areaOfATriangle(4, 6)).toBe(12.0);
  });

  test('Test areas when base is zero', () => {
    expect(areaOfATriangle(0, 5)).toBe(0.0);
  });

  test('Test areas when height is zero', () => {
    expect(areaOfATriangle(2, 0)).toBe(0.0);
  });

  test('Test areas when base and height are zero', () => {
    expect(areaOfATriangle(0, 0)).toBe(0.0);
  });

  test('Test that Error is thrown when base is negative', () => {
    expect(() => areaOfATriangle(-2, 5)).toThrow("Base must be a positive number");
  });

  test('Test that Error is thrown when height is negative', () => {
    expect(() => areaOfATriangle(2, -5)).toThrow("Height must be a positive number");
  });

  test('Test that Error is thrown when both are negative', () => {
    expect(() => areaOfATriangle(-2, -5)).toThrow("Base must be a positive number");
  });

  test('Test that TypeError is thrown with boolean types', () => {
    expect(() => areaOfATriangle(true, 5)).toThrow(TypeError);
    expect(() => areaOfATriangle(2, true)).toThrow(TypeError);
  });

  test('Test that TypeError is thrown with string types', () => {
    expect(() => areaOfATriangle("base", 5)).toThrow(TypeError);
    expect(() => areaOfATriangle(2, "height")).toThrow(TypeError);
  });

  test('Test that TypeError is thrown with null types', () => {
    expect(() => areaOfATriangle(null, 5)).toThrow(TypeError);
    expect(() => areaOfATriangle(2, null)).toThrow(TypeError);
  });
});