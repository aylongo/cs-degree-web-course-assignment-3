import React, { useState } from "react";
import styles from "./ticTacToe.module.css";

enum Player {
  X = "X",
  O = "O",
}

type CellValue = Player | null;
type Board = CellValue[];

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array<CellValue>(9).fill(null));
  const [isXCurrent, setIsXCurrent] = useState(true);
  const [winner, setWinner] = useState<CellValue>(null);

  const calculateWinner = (squares: Board): CellValue => {
    const winPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winPositions.length; i++) {
      const [firstPosition, secondPosition, thirdPosition] = winPositions[i];
      if (
        squares[firstPosition] !== null &&
        squares[firstPosition] === squares[secondPosition] &&
        squares[firstPosition] === squares[thirdPosition]
      ) {
        return squares[firstPosition];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] !== null || winner !== null) return;

    const newBoard = [...board];
    newBoard[index] = isXCurrent ? Player.X : Player.O;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner !== null) {
      setWinner(gameWinner);
    }

    setIsXCurrent((prevIsXNext) => !prevIsXNext);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXCurrent(true);
    setWinner(null);
  };

  const isBoardFull = board.every((square) => square !== null);

  return (
    <div className={styles.ticTacToeContainer}>
      <h1>Tic Tac Toe</h1>
      <div className={styles.status}>
        {winner ? (
          <div className={styles.winner}>Winner: {winner}!</div>
        ) : isBoardFull ? (
          <div className={styles.draw}>Draw!</div>
        ) : (
          <div>
            Next Turn: <strong>{isXCurrent ? Player.O : Player.X}</strong>
            <div className={styles.currentTurn}>
              (Current Turn: <strong>{isXCurrent ? Player.X : Player.O}</strong>
              )
            </div>
          </div>
        )}
      </div>
      <div className={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            className={styles.cell}
            disabled={isBoardFull || winner !== null}
            onClick={() => handleCellClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button className={styles.restartGameButton} onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};
