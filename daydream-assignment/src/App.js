import "./App.css";
import React, { useState } from "react";
function App() {
  const [win, setWin] = useState([]); //creating an array for the win condition
  const [squares, setSquares] = useState(Array(9).fill(null)); //filling in the array for the game board
  const [x, setX] = useState(true);

  //Here i am creating a grid for the winners. Setting up rows, diagonals, columns
  //seeing which way the user can win in, basically creating the board with diagonals, rows, columns

  //Reason why there are 8: 3 wins possible from rows, 3 wins possible from columns, and 2 wins possible
  //from diagonal
  const setWinner = (square) => {
    const board = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //Then I will traverse the array to see if there's 3 matching squares in a row, diagonal, or column
    for (let i = 0; i < board.length; i++) {
      //creating the 3 squares
      const [square1, square2, square3] = board[i];
      if (
        square[square1] &&
        square[square1] === square[square2] &&
        square[square1] === square[square3]
      ) {
        //returning winning object
        return {
          user: square[square1], //X or O
          direction: board[i], //returns the squares in which they won
        };
      }
    }
    return null;
  };

  //This is just getting the user to click on the square, first user starts with x, second starts with O
  const clicking = (index) => {
    if (squares[index]) return;
    const newSquare = [...squares];
    newSquare[index] = x ? "X" : "O"; //just using a ternary here for the conditional
    setSquares(newSquare);
    setX(!x);

    //after the person clicks the 3rd in a row tile/square they should be declared the winner there
    const victor = setWinner(newSquare);
    if (victor) setWin(victor.direction);
  };

  //use the .map function here to get all the squares, using the onClick event for user when they click on the square

  //Now our final step is to visually show the squares after a win
  return (
    <div className="game">
      <div className="board">
        {squares.map((value, index) => (
          <div
            key={index}
            className={`square ${win.includes(index) ? "win-square" : ""}`}
            tabIndex={0}
            onClick={() => clicking(index)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
