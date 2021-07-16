const isValid = (matrix, rowIndex, colIndex, possibleNumber) => {
  for (let i = 0; i < 9; i++) {
    const sqRowIndex = 3 * Math.floor(rowIndex / 3) + Math.floor(i / 3);
    const sqColIndex = 3 * Math.floor(colIndex / 3) + (i % 3);

    switch (possibleNumber) {
      case matrix[rowIndex][i]:
        return;
      case matrix[i][colIndex]:
        return;
      case matrix[sqRowIndex][sqColIndex]:
        return;
    }
  }

  return true;
};

module.exports = function solveSudoku(matrix) {
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      if (matrix[rowIndex][colIndex] == 0) {
        for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
          if (isValid(matrix, rowIndex, colIndex, possibleNumber)) {
            matrix[rowIndex][colIndex] = possibleNumber;

            if (solveSudoku(matrix)) return matrix;

            matrix[rowIndex][colIndex] = 0;
          }
        }

        return;
      }
    }
  }

  return matrix;
};
