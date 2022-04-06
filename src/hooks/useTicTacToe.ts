import { useState, useEffect } from "react";
interface ReturnValue {
  board: string[];
  status: string;
  winner: string | null;
  handleClick: (index: number) => void;
  handleRestart: () => void;
  handleStart: (players: string[]) => void;
}
export default (): ReturnValue => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [status, setStatus] = useState("created");
  const [players, setPlayers] = useState(["", ""]);

  useEffect(() => {
    if (status !== "started") return;
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let winningPositionsIndex = 0;
    let winner: string | null = null;
    while (winningPositionsIndex < winningPositions.length && !winner) {
      const boardPositionsToCheck = winningPositions[winningPositionsIndex];
      console.log('boardPositionsToCheck', boardPositionsToCheck)
      const boardValuesToCkeck = boardPositionsToCheck.map(
        (index) => board[index]
      );
      console.log('boardValuesToCkeck', boardValuesToCkeck);
      const checkingValue = boardValuesToCkeck[0];
      console.log('checkingValue', checkingValue);
      const isFinished = boardValuesToCkeck.every(
        (value) => value === checkingValue && checkingValue
      );
      console.log('isFinished', isFinished);
      winner = !isFinished ? null : checkingValue;
      console.log('winner', winner);
      winningPositionsIndex++;
    }
    if (winner) {
      setWinner(winner === "X" ? players[0] : players[1]);
      setStatus("finished");
      return;
    }
    console.log('board.filter((value) => !value).length',);
    let whiteSpaces: number = board.filter((value) => !value).length;
    setStatus(whiteSpaces ? "started" : "finished");
  }, [board, players, status]);

  const handleClick = (index: number): void => {
    if (index < 0 || index > 9 || winner) return;
    const newBoard = [...board];

    let hasValue: string = newBoard[index];

    if (!!hasValue) {
      return;
    }
    newBoard.splice(index, 1, turn);
    setBoard(newBoard);
    const newTurn = turn === "X" ? "O" : "X";
    setTurn(newTurn);
  };
  const handleStart = (players: string[]) => {
    setPlayers(players);
    setTurn("X");
    setStatus("started");
  };
  const handleRestart = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    setStatus("created");
  };

  return { board, status, winner, handleClick, handleRestart, handleStart };
};
