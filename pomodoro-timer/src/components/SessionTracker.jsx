import { Coffee } from 'lucide-react';

export default function SessionTracker({ completedPomodoros, totalToday }) {
  return (
    <div className="glass-effect p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white/90 mb-2">
            Today's Sessions
          </h3>
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all ${
                  i < (completedPomodoros % 4)
                    ? 'bg-red-500 scale-110'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 text-3xl font-bold text-white">
            <Coffee className="text-red-500" size={32} />
            {totalToday}
          </div>
          <p className="text-sm text-white/60 mt-1">
            Completed
          </p>
        </div>
      </div>
    </div>
  );
}
