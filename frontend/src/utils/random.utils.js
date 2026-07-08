/**
 * Shuffles an array and returns a specified number of items.
 * @param {Array} array - The array to shuffle.
 * @param {number} count - The number of items to return.
 * @returns {Array} - The shuffled items.
 */
export const getRandomItems = (array, count) => {
  if (!Array.isArray(array)) return [];

  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
