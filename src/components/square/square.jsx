import styles from './square.module.css';

function Square({ value, onSquareClick }) {

  return (
    <button
      className={styles.square}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;