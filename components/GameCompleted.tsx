export default function GameCompleted({ playAgain }) {
  return (
    <div>
      <button
        autoFocus
        onClick={playAgain}
        className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
      >
        Play Again
      </button>
    </div>
  );
}
