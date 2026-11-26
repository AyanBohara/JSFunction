/*
 * DSA Question: Reverse an Array
 *
 * Given an array of numbers, reverse its elements without using the
 * built-in reverse() method.
 *
 * Example:
 * Input:  [1, 2, 3, 4, 5]
 * Output: [5, 4, 3, 2, 1]
 *
 * Logic:
 * 1. Put one pointer at the start and another at the end.
 * 2. Swap the values at those positions.
 * 3. Move the first pointer forward and the second pointer backward.
 * 4. Stop when the pointers meet or cross.
 */
function reverseArray(numbers) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const temporary = numbers[left];
    numbers[left] = numbers[right];
    numbers[right] = temporary;

    left++;
    right--;
  }

  return numbers;
}

const example = [1, 2, 3, 4, 5];
console.log("Reversed array:", reverseArray(example));