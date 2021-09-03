export default function GameCompleted({ playAgain }) {
  return (
    <div>
      <p>Completion</p>
      <button autoFocus onClick={playAgain}>
        Play Again
      </button>
    </div>
  );
}
