import StringCalculator from "../stringCalculator";

/**
 * Test cases for the StringCalculator class.
 */

// Test for an empty string input
test("should return 0 for an empty string", () => {
  expect(StringCalculator.Add("")).toBe(0);
});

// Test for a single number input
test("should return the number itself for a single number", () => {
  expect(StringCalculator.Add("1")).toBe(1);
  expect(StringCalculator.Add("10")).toBe(10);
});

// Test for two numbers separated by a comma
test("should return the sum of two numbers", () => {
  expect(StringCalculator.Add("1,2")).toBe(3);
});

// Test for an unknown amount of numbers
test("should handle an unknown amount of numbers", () => {
  expect(StringCalculator.Add("1,2,3,4,5")).toBe(15);
});

// Test for filtering numbers > 1000
test("should handle an unknown amount of numbers", () => {
    expect(StringCalculator.Add("1001")).toBe(0);
  });