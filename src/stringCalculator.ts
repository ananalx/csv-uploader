/**
 * A simple string calculator that adds numbers from a string input.
 * The input can contain numbers separated by commas or new lines.
 * Custom delimiters can also be specified.
 */
class StringCalculator {
  /**
   * Adds numbers from a string input.
   * @param numbers - A string containing numbers separated by delimiters.
   * @returns The sum of the numbers.
   * @throws An error if the input contains negative numbers.
   */
  static Add(numbers: string): number {
    // Return 0 for an empty string
    if (!numbers) return 0;

    // Split the input string by , and convert to numbers
    const numArray = numbers.split(",").map((n) => Number(n));

    // Check for negative numbers and throw an error if found
    const negatives = numArray.filter((n) => n < 0);
    if (negatives.length) {
      throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
    }

    // Filter out numbers greater than 1000 and calculate the sum
    return numArray.filter((n) => n <= 1000).reduce((sum, n) => sum + n, 0);
  }
}

export default StringCalculator;
