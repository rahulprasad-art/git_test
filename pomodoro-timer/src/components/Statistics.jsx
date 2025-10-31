import { BarChart3, TrendingUp, Target, Clock } from 'lucide-react';

export default function Statistics({ stats }) {
  const { totalPomodoros, totalMinutes, dailyAverage, weeklyTotal } = stats;

  const statCards = [
    {
      icon: Target,
      label: 'Total Sessions',
      value: totalPomodoros,
      color: 'text-red-500',
    },
    {
      icon: Clock,
      label: 'Total Minutes',
      value: totalMinutes,
      color: 'text-blue-500',
    },
    {
      icon: TrendingUp,
      label: 'Daily Average',
      value: dailyAverage,
      color: 'text-green-500',
    },
    {
      icon: BarChart3,
      label: 'This Week',
      value: weeklyTotal,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="glass-effect p-6">
      <h3 className="text-xl font-bold text-white/90 mb-6 flex items-center gap-2">
        <BarChart3 size={24} />
        Statistics
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={stat.color} size={20} />
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
