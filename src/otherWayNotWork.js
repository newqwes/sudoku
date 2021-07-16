const initial = [
  [0, 5, 0, 0, 7, 0, 0, 0, 1],
  [8, 7, 6, 0, 2, 1, 9, 0, 3],
  [0, 0, 0, 0, 3, 5, 0, 0, 0],
  [0, 0, 0, 0, 4, 3, 6, 1, 0],
  [0, 4, 0, 0, 0, 9, 0, 0, 2],
  [0, 1, 2, 0, 5, 0, 0, 0, 4],
  [0, 8, 9, 0, 6, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 7, 0, 0, 0],
  [1, 6, 7, 0, 0, 2, 5, 4, 0],
];

const getSqElements = (rowIndex, colIndex, matrix) => {
  const result = [];

  const rowFoor = Math.floor(rowIndex / 3) * 3;

  const colFoor = Math.floor(colIndex / 3) * 3;

  for (let i = rowFoor; i < rowFoor + 3; i++) {
    for (let u = colFoor; u < colFoor + 3; u++) {
      result.push(matrix[i][u]);
    }
  }

  return result;
};

const removeExistingElements = (arr, digits) => {
  const newDigits = [...digits];

  arr.forEach(element => {
    const index = newDigits.findIndex(digitElement => element === digitElement);
    if (index !== -1) {
      newDigits.splice(index, 1);
    }
  });

  return newDigits;
};

const findMissingElements = (row, col, sq) => {
  let missingElements = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  missingElements = removeExistingElements(row, missingElements);
  missingElements = removeExistingElements(col, missingElements);
  missingElements = removeExistingElements(sq, missingElements);

  return missingElements;
};

const solveSudoku = matrix => {
  let resultMatrix = [...matrix];

  let splitMatrix = String(resultMatrix).split(',');

  splitMatrix.forEach((el, index) => {
    el = Number(el);

    if (el === 0) {
      const rowIndex = Math.floor(index / 9);
      const colIndex = index % 9;

      const rowElements = resultMatrix[rowIndex];
      let colElements = [];

      for (let i = 0; i < 9; i++) {
        colElements.push(resultMatrix[i][colIndex]);
      }

      const sqElements = getSqElements(rowIndex, colIndex, resultMatrix);

      const missingElements = findMissingElements(rowElements, colElements, sqElements);
      console.log('findMissingElements(rowElements, colElements, sqElements) = ', missingElements);

      if (missingElements.length === 1) {
        resultMatrix[rowIndex][colIndex] = missingElements[0];
      }
    }
  });

  if (splitMatrix.includes('0')) {
    // resultMatrix = solveSudoku(resultMatrix);
  }

  console.log(resultMatrix);

  return resultMatrix;
};

let test1 = solveSudoku(initial);
test1 = solveSudoku(test1);
test1 = solveSudoku(test1);
