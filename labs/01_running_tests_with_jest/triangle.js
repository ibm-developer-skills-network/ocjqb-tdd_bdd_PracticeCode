/**
 * Calculates the area of a triangle
 * @param {number} base - The base of the triangle
 * @param {number} height - The height of the triangle
 * @returns {number} The area of the triangle
 * @throws {TypeError} If base or height are not numbers
 * @throws {ValueError} If base or height are negative
 */
function areaOfATriangle(base, height) {
    // Check if we have the correct parameter types
    if (typeof base !== 'number' || isNaN(base)) {
      throw new TypeError("Base must be a number");
    }
    if (typeof height !== 'number' || isNaN(height)) {
      throw new TypeError("Height must be a number");
    }
  
    // Check if we have the correct parameter values
    if (base < 0) {
      throw new Error("Base must be a positive number");
    }
    if (height < 0) {
      throw new Error("Height must be a positive number");
    }
  
    return (base / 2) * height;
  }
  
  module.exports = { areaOfATriangle };