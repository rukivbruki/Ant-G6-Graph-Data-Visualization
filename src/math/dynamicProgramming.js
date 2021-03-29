/**
 * Create a matrix
 * @param {number} rows Number of rows
 * @param {number} columns ANumber of columns
 * @returns {Array} Matrix
 */
const createMatrix = (rows = 0, columns = 0) => {
  const matrix = [];
  
  for (let i = 0; i < rows; i++) {
	matrix[i] = Array(columns).fill(0);
  }
  
  return matrix;
};

/**
 * Find the longest substring
 * @param {string} firstWord First word
 * @param {string} secondWord Second word
 * @returns {string} The longest substring
 */
const longestSubstring = (firstWord = "", secondWord = "") => {
  const matrix = JSON.parse(
	JSON.stringify(createMatrix(firstWord.length, secondWord.length))
  );
  let sizeSequence = [];
  
  for (let i = 0; i < firstWord.length; i++) {
	for (let j = 0; j < secondWord.length; j++) {
	  if (firstWord[i] === secondWord[j]) {
		matrix[i][j] = (i && j) > 0 ? matrix[i - 1][j - 1] + 1 : 1;
		console.log(matrix)
		
		if (matrix[i][j] !== 0) {
		  sizeSequence.push(i);
		}
		console.log("Смотрим", sizeSequence)
	  }
	}
  }
}
