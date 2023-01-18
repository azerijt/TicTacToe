import React, { useState, useEffect } from 'react';
import './style.css'

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);


  const handleClick = (index) => {

    if (winner) {
      return;
    }
    const newBoard = [...board];
    if (newBoard[index]) {
      return;
    }
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
  }

   useEffect(() => {
    checkForWinner();
  }, [board])

  const checkForWinner = () => {
    const winningLines = [      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner('tie');
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  }

  return (
    <div>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}<br/>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}<br/>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <br/>
      <div>
      <div className="status">
        {winner ? (winner === 'tie' ? 'Tie' : `Winner: ${winner}`) : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
        <button className="reset" onClick={resetGame}>Reset</button>
    </div>
    </div>
  );
}

export default TicTacToe;