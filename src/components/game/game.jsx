import { useState, useEffect } from 'react';
import Board from '../board/board';
import calculateWinner from '../Calculate/Calculate';
import styles from './game.module.css';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [xIsNext, setXIsNext] = useState(true);

  const [xTime, setXTime] = useState(30);
  const [oTime, setOTime] = useState(30);

  const [winner, setWinner] = useState(null);

  const [started, setStarted] = useState(false);

  const [playerSymbol, setPlayerSymbol] = useState(null);

  const [gameTime, setGameTime] = useState(null);


  useEffect(() => {

    if (!started || winner || gameTime === 'infinite') {
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

  }, [started, xIsNext, winner, gameTime]);


  function handlePlay(nextSquares) {

    setSquares(nextSquares);

    const gameWinner = calculateWinner(nextSquares);

    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    if (nextSquares.every(square => square !== null)) {
      setWinner('velha');
      return;
    }

    setXIsNext(!xIsNext);
  }


  function startGame() {

    setStarted(true);

    if (playerSymbol === 'X') {
      setXIsNext(true);
    } else {
      setXIsNext(false);
    }

    if (gameTime === 30) {
      setXTime(30);
      setOTime(30);
    }

    if (gameTime === 60) {
      setXTime(60);
      setOTime(60);
    }
  }


  return (
    <div className={styles.game}>

      {!started && (

        <div className={styles.startArea}>

          <h2>Escolha o símbolo</h2>

          <p>Jogador 1</p>

          <div className={styles.symbols}>

            <button onClick={() => setPlayerSymbol('X')}>
              X
            </button>

            <button onClick={() => setPlayerSymbol('O')}>
              O
            </button>

          </div>


          {playerSymbol && (

            <>

              <p>
                Jogador 1 escolheu: <strong>{playerSymbol}</strong>
              </p>

              <p>
                Jogador 2 será: <strong>
                  {playerSymbol === 'X' ? 'O' : 'X'}
                </strong>
              </p>


              <h2>Escolha o tempo</h2>

              <div className={styles.times}>

                <button onClick={() => setGameTime(30)}>
                  30 segundos
                </button>

                <button onClick={() => setGameTime(60)}>
                  60 segundos
                </button>

                <button onClick={() => setGameTime('infinite')}>
                  ∞ Infinito
                </button>

              </div>


              {gameTime && (

                <button
                  className={styles.startButton}
                  onClick={startGame}
                >
                  Começar
                </button>

              )}

            </>

          )}

        </div>

      )}


      <div className={styles.timers}>

        <div className={styles.timer}>

          <h3>Jogador 1</h3>

          <p>
            {playerSymbol === 'X' ? 'X' : 'O'}
          </p>

          <span>
            {gameTime === 'infinite'
              ? '∞'
              : playerSymbol === 'X'
                ? xTime
                : oTime
            }s
          </span>

        </div>


        <div className={styles.timer}>

          <h3>Jogador 2</h3>

          <p>
            {playerSymbol === 'X' ? 'O' : 'X'}
          </p>

          <span>
            {gameTime === 'infinite'
              ? '∞'
              : playerSymbol === 'X'
                ? oTime
                : xTime
            }s
          </span>

        </div>

      </div>


      {winner ? (

        <h2 className={styles.winner}>

          {winner === 'velha'
            ? 'Deu velha!'
            : `Jogador ${winner} ganhou!`}

        </h2>

      ) : (

        started && (

          <div className={styles.gameBoard}>

            <Board
              xIsNext={xIsNext}
              squares={squares}
              onPlay={handlePlay}
            />

          </div>

        )

      )}

    </div>
  );
}

export default Game;