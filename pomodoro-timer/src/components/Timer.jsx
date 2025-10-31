import { formatTime, calculateProgress } from '../utils/helpers';

export default function Timer({ timeLeft, totalTime, mode }) {
  const progress = calculateProgress(timeLeft, totalTime);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const modeColors = {
    work: 'stroke-red-500',
    shortBreak: 'stroke-green-500',
    longBreak: 'stroke-blue-500',
  };

  const modeLabels = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Mode Label */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white/90 tracking-wide">
          {modeLabels[mode]}
        </h2>
      </div>

      {/* Circular Timer */}
      <div className="relative">
        <svg className="transform -rotate-90" width="300" height="300">
          {/* Background circle */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-white/10"
          />

          {/* Progress circle */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`timer-ring ${modeColors[mode]}`}
            strokeLinecap="round"
          />
        </svg>

        {/* Time display in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl font-bold text-white tabular-nums">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
