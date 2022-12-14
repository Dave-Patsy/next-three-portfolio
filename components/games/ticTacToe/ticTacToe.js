// This was forked and migrated to jotai from https://codesandbox.io/s/valtio-tic-tac-forked-7bzu4?file=/src/index.js
import React from "react";
import ReactDOM from "react-dom";
// import "./styles.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { atom, useAtom, Provider } from "jotai";
import styles from '../../../styles/games/ticTacToe/ticTacToe.module.css'

const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]] // prettier-ignore

const squaresAtom = atom(Array(9).fill(null));

const nextValueAtom = atom((get) =>
  get(squaresAtom).filter((r) => r === "O").length ===
  get(squaresAtom).filter((r) => r === "X").length
    ? "X"
    : "O"
);

const winnerAtom = atom((get) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      get(squaresAtom)[a] &&
      get(squaresAtom)[a] === get(squaresAtom)[b] &&
      get(squaresAtom)[a] === get(squaresAtom)[c]
    )
      return get(squaresAtom)[a];
  }
  return null;
});

const resetSquaresAtom = atom(null, (_get, set) =>
  set(squaresAtom, Array(9).fill(null))
);

const selectSquareAtom = atom(
  (get) => get(squaresAtom),
  (get, set, square) => {
    if (get(winnerAtom) || get(squaresAtom)[square]) return;
    set(
      squaresAtom,
      get(squaresAtom).map((sqr, sqrIndex) =>
        sqrIndex === square ? get(nextValueAtom) : sqr
      )
    );
  }
);
const statusAtom = atom((get) => {
  return get(winnerAtom)
    ? `Winner: ${get(winnerAtom)}`
    : get(squaresAtom).every(Boolean)
    ? `Scratch`
    : `Next player: ${get(nextValueAtom)}`;
});

function Square({ i }) {
  const [squares, selectSquare] = useAtom(selectSquareAtom);
  console.log(i)
  console.log(squares[i])
  return (
    <button className={`${styles.square} ${squares[i] == 'O'?styles.O:''}`} onClick={() => selectSquare(i)}>
      {squares[i]}
    </button>
  );
}

function Status() {
  const [gameStatus] = useAtom(statusAtom);
  const [, reset] = useAtom(resetSquaresAtom);

  return (
    <div className={styles.status}>
      <div className={styles.message}>{gameStatus}</div>
      <button className={styles.button} onClick={() => reset()}>Reset</button>
    </div>
  );
}

function End() {
  const { width, height } = useWindowSize();
  const [gameWinner] = useAtom(winnerAtom);
  return (
    gameWinner && (
      <Confetti
        width={width}
        height={height}
        colors={[gameWinner === "X" ? "#d76050" : "#509ed7", "white"]}
      />
    )
  );
}

const TickTacToe = () => {
    return(
        <Provider>
            <div className={styles.gameWrapper}>


                <div className={styles.game}>
                <h1 className={styles.h1}>
                    x<span className={styles.span}>o</span>x<span className={styles.span}>o</span>
                </h1>
                <Status />
                <div className={styles.board}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((field) => (
                    <Square key={field} i={field} />
                    ))}
                </div>
                <div></div>
                </div>
                <End />
            </div>
        </Provider>    
    )
}

export default TickTacToe