import { useState, useEffect } from 'react';
import Board from '../Board/Board';
import calculateWinner from '../Calculate/Calculate';
import styles from './Game.module.css';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const [xTime, setXTime] = useState(30);
  const [oTime, setOTime] = useState(30);

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) {
      return;
    }

    const timer = setInterval(() => {
      if (xIsNext) {
        setXTime(time => {
          if (time <= 1) {
            setWinner('O');
            return 0;
          }
          return time - 1;
        });
      } else {
        setOTime(time => {
          if (time <= 1) {
            setWinner('X');
            return 0;
          }
          return time - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [xIsNext, winner]);

  function handlePlay(nextSquares) {
    setSquares(nextSquares);

    const gameWinner = calculateWinner(nextSquares);

    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    setXIsNext(!xIsNext);
  }

  return (
    <div className={styles.game}>

      <div className={styles.timers}>

        <div className={styles.timer}>
          <h3>Jogador X</h3>
          <p>{xTime}s</p>
        </div>

        <div className={styles.timer}>
          <h3>Jogador O</h3>
          <p>{oTime}s</p>
        </div>

      </div>

      {winner ? (
        <h2>Jogador {winner} ganhou!</h2>
      ) : (
        <Board
          xIsNext={xIsNext}
          squares={squares}
          onPlay={handlePlay}
        />
      )}

    </div>
  );
}

export default Game;