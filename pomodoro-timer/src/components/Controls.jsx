import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

export default function Controls({ isRunning, isPaused, onStart, onPause, onResume, onReset, onSkip }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Start/Pause/Resume Button */}
      {!isRunning ? (
        <button
          onClick={onStart}
          className="btn-primary bg-green-600 hover:bg-green-700 flex items-center gap-2"
        >
          <Play size={20} />
          Start
        </button>
      ) : isPaused ? (
        <button
          onClick={onResume}
          className="btn-primary bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <Play size={20} />
          Resume
        </button>
      ) : (
        <button
          onClick={onPause}
          className="btn-primary bg-yellow-600 hover:bg-yellow-700 flex items-center gap-2"
        >
          <Pause size={20} />
          Pause
        </button>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="btn-primary bg-gray-600 hover:bg-gray-700 flex items-center gap-2"
        disabled={!isRunning && !isPaused}
      >
        <RotateCcw size={20} />
        Reset
      </button>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        className="btn-primary bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
      >
        <SkipForward size={20} />
        Skip
      </button>
    </div>
  );
}
