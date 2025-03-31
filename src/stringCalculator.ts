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

    let delimiter = new RegExp(",|\n");

    if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf("\n");
      const customDelimiter = numbers.substring(2, delimiterEndIndex);
      numbers = numbers.substring(delimiterEndIndex + 1);

      if (customDelimiter.startsWith("[") && customDelimiter.endsWith("]")) {
        customDelimiter
          .slice(1, -1)
          .split("][")
          .forEach((d) => {
            numbers = numbers.replaceAll(d, ",");
            console.log("numberseach", numbers, d);
          });
        console.log("numbers1", numbers);
      } else {
        numbers = numbers.replaceAll(customDelimiter, ",");
        console.log("numbers2", numbers);
      }
    }

    // Split the input string by delimiter and convert to numbers
    const numArray = numbers.split(delimiter).map((n) => Number(n));
    console.log("array", numArray);

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
