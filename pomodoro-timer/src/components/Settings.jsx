import { useState } from 'react';
import { Settings as SettingsIcon, X, Bell, Volume2 } from 'lucide-react';
import { secondsToMinutes } from '../utils/helpers';

export default function Settings({
  settings,
  onUpdateSettings,
  notificationPermission,
  onRequestNotification,
  soundEnabled,
  onToggleSound
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSave = () => {
    onUpdateSettings(tempSettings);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsOpen(false);
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-2"
      >
        <SettingsIcon size={20} />
        Settings
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-effect p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <SettingsIcon size={28} />
                Settings
              </h2>
              <button
                onClick={handleCancel}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Settings Form */}
            <div className="space-y-6">
              {/* Timer Durations */}
              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-4">
                  Timer Durations (minutes)
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Focus Time
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={secondsToMinutes(tempSettings.workDuration)}
                      onChange={(e) =>
                        setTempSettings({
                          ...tempSettings,
                          workDuration: parseInt(e.target.value) * 60,
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Short Break
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={secondsToMinutes(tempSettings.shortBreakDuration)}
                      onChange={(e) =>
                        setTempSettings({
                          ...tempSettings,
                          shortBreakDuration: parseInt(e.target.value) * 60,
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Long Break
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={secondsToMinutes(tempSettings.longBreakDuration)}
                      onChange={(e) =>
                        setTempSettings({
                          ...tempSettings,
                          longBreakDuration: parseInt(e.target.value) * 60,
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Long Break Interval
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={tempSettings.longBreakInterval}
                      onChange={(e) =>
                        setTempSettings({
                          ...tempSettings,
                          longBreakInterval: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                    />
                    <p className="text-xs text-white/50 mt-1">
                      After how many pomodoros to take a long break
                    </p>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-4">
                  Notifications
                </h3>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-white/70" />
                    <div>
                      <p className="text-white/90">Browser Notifications</p>
                      <p className="text-xs text-white/50">
                        {notificationPermission === 'granted'
                          ? 'Enabled'
                          : notificationPermission === 'denied'
                          ? 'Denied'
                          : 'Not enabled'}
                      </p>
                    </div>
                  </div>
                  {notificationPermission !== 'granted' && (
                    <button
                      onClick={onRequestNotification}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                    >
                      Enable
                    </button>
                  )}
                </div>
              </div>

              {/* Sound */}
              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-4">
                  Sound
                </h3>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Volume2 size={20} className="text-white/70" />
                    <div>
                      <p className="text-white/90">Completion Sound</p>
                      <p className="text-xs text-white/50">
                        {soundEnabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onToggleSound}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      soundEnabled
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {soundEnabled ? 'On' : 'Off'}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 btn-primary bg-green-600 hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 btn-primary bg-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
