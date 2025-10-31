import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from 'lucide-react';

export default function TaskList({ tasks, onAddTask, onToggleTask, onDeleteTask }) {
  const [newTaskText, setNewTaskText] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask({
        text: newTaskText,
        estimatedPomodoros: estimatedPomodoros,
        completed: false,
        id: Date.now(),
      });
      setNewTaskText('');
      setEstimatedPomodoros(1);
    }
  };

  return (
    <div className="glass-effect p-6">
      <h3 className="text-xl font-bold text-white/90 mb-6 flex items-center gap-2">
        <ListTodo size={24} />
        Tasks
      </h3>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="What are you working on?"
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
          />
          <button
            type="submit"
            className="btn-primary bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-white/60">Est. Pomodoros:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={estimatedPomodoros}
            onChange={(e) => setEstimatedPomodoros(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
          />
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-center text-white/40 py-8">
            No tasks yet. Add one to get started!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <button
                onClick={() => onToggleTask(task.id)}
                className="text-white/70 hover:text-white transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 size={24} className="text-green-500" />
                ) : (
                  <Circle size={24} />
                )}
              </button>

              <div className="flex-1">
                <p
                  className={`text-white ${
                    task.completed ? 'line-through text-white/60' : ''
                  }`}
                >
                  {task.text}
                </p>
                <p className="text-xs text-white/50">
                  {task.estimatedPomodoros} pomodoro{task.estimatedPomodoros > 1 ? 's' : ''}
                </p>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
