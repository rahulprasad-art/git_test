import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTimer } from './hooks/useTimer';
import { useNotifications } from './hooks/useNotifications';
import { minutesToSeconds, playSound, getModeGradient } from './utils/helpers';

import Timer from './components/Timer';
import Controls from './components/Controls';
import SessionTracker from './components/SessionTracker';
import Settings from './components/Settings';
import Statistics from './components/Statistics';
import TaskList from './components/TaskList';

const DEFAULT_SETTINGS = {
  workDuration: minutesToSeconds(25),
  shortBreakDuration: minutesToSeconds(5),
  longBreakDuration: minutesToSeconds(15),
  longBreakInterval: 4,
};

function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', true);

  // Settings state
  const [settings, setSettings] = useLocalStorage('pomodoroSettings', DEFAULT_SETTINGS);

  // Timer mode state
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak

  // Session tracking
  const [completedPomodoros, setCompletedPomodoros] = useLocalStorage('completedPomodoros', 0);
  const [todayPomodoros, setTodayPomodoros] = useLocalStorage('todayPomodoros', {
    date: new Date().toDateString(),
    count: 0,
  });

  // Statistics
  const [statistics, setStatistics] = useLocalStorage('statistics', {
    totalPomodoros: 0,
    totalMinutes: 0,
    dailyAverage: 0,
    weeklyTotal: 0,
    history: [],
  });

  // Tasks
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Sound state
  const [soundEnabled, setSoundEnabled] = useLocalStorage('soundEnabled', true);

  // Notifications
  const { permission, showNotification, requestPermission } = useNotifications();

  // Get current duration based on mode
  const getCurrentDuration = () => {
    switch (mode) {
      case 'work':
        return settings.workDuration;
      case 'shortBreak':
        return settings.shortBreakDuration;
      case 'longBreak':
        return settings.longBreakDuration;
      default:
        return settings.workDuration;
    }
  };

  // Timer complete callback
  const handleTimerComplete = () => {
    // Play sound if enabled
    if (soundEnabled) {
      playSound(800, 200);
      setTimeout(() => playSound(800, 200), 300);
    }

    // Show notification
    if (mode === 'work') {
      showNotification('Pomodoro Complete!', {
        body: 'Great work! Time for a break.',
      });

      // Increment completed pomodoros
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);

      // Update today's count
      const today = new Date().toDateString();
      if (todayPomodoros.date === today) {
        setTodayPomodoros({ date: today, count: todayPomodoros.count + 1 });
      } else {
        setTodayPomodoros({ date: today, count: 1 });
      }

      // Update statistics
      setStatistics((prev) => ({
        ...prev,
        totalPomodoros: prev.totalPomodoros + 1,
        totalMinutes: prev.totalMinutes + (settings.workDuration / 60),
        history: [
          ...prev.history,
          { date: new Date().toISOString(), type: 'work' },
        ],
      }));

      // Determine next mode (short break or long break)
      if (newCount % settings.longBreakInterval === 0) {
        setMode('longBreak');
      } else {
        setMode('shortBreak');
      }
    } else {
      showNotification('Break Complete!', {
        body: 'Ready to focus again?',
      });
      setMode('work');
    }
  };

  // Initialize timer with current duration
  const { timeLeft, isRunning, isPaused, start, pause, resume, reset, skip } = useTimer(
    getCurrentDuration(),
    handleTimerComplete
  );

  // Update theme class on document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Calculate statistics
  useEffect(() => {
    const history = statistics.history || [];
    const last7Days = history.filter((entry) => {
      const entryDate = new Date(entry.date);
      const daysDiff = (Date.now() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    });

    setStatistics((prev) => ({
      ...prev,
      weeklyTotal: last7Days.length,
      dailyAverage: Math.round(prev.totalPomodoros / Math.max(1, getDaysSinceFirstPomodoro())),
    }));
  }, [completedPomodoros]);

  const getDaysSinceFirstPomodoro = () => {
    const history = statistics.history || [];
    if (history.length === 0) return 1;

    const firstDate = new Date(history[0].date);
    const daysDiff = (Date.now() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.ceil(daysDiff));
  };

  // Task management functions
  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Get today's count
  const getTodayCount = () => {
    const today = new Date().toDateString();
    return todayPomodoros.date === today ? todayPomodoros.count : 0;
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 bg-gradient-to-br ${getModeGradient(
        mode
      )}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">
            Pomodoro Timer
          </h1>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="btn-primary bg-white/10 hover:bg-white/20 border border-white/20"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Settings */}
            <Settings
              settings={settings}
              onUpdateSettings={setSettings}
              notificationPermission={permission}
              onRequestNotification={requestPermission}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled(!soundEnabled)}
            />
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Timer and Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer Card */}
            <div className="glass-effect p-8">
              <Timer
                timeLeft={timeLeft}
                totalTime={getCurrentDuration()}
                mode={mode}
              />

              <div className="mt-8">
                <Controls
                  isRunning={isRunning}
                  isPaused={isPaused}
                  onStart={start}
                  onPause={pause}
                  onResume={resume}
                  onReset={reset}
                  onSkip={skip}
                />
              </div>
            </div>

            {/* Session Tracker */}
            <SessionTracker
              completedPomodoros={completedPomodoros}
              totalToday={getTodayCount()}
            />

            {/* Statistics */}
            <Statistics stats={statistics} />
          </div>

          {/* Right Column - Tasks */}
          <div className="lg:col-span-1">
            <TaskList
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>Built with React, Tailwind CSS, and Vite</p>
          <p className="mt-1">Focus better, achieve more</p>
        </div>
      </div>
    </div>
  );
}

export default App;
