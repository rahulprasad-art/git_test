// Format seconds to MM:SS format
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Convert minutes to seconds
export function minutesToSeconds(minutes) {
  return minutes * 60;
}

// Convert seconds to minutes
export function secondsToMinutes(seconds) {
  return Math.floor(seconds / 60);
}

// Calculate progress percentage
export function calculateProgress(timeLeft, totalTime) {
  return ((totalTime - timeLeft) / totalTime) * 100;
}

// Play notification sound
export function playSound(frequency = 800, duration = 200) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

// Get color based on timer mode
export function getModeColor(mode) {
  const colors = {
    work: 'text-red-500',
    shortBreak: 'text-green-500',
    longBreak: 'text-blue-500',
  };
  return colors[mode] || 'text-gray-500';
}

// Get background gradient based on timer mode
export function getModeGradient(mode) {
  const gradients = {
    work: 'from-red-900 via-purple-900 to-slate-900',
    shortBreak: 'from-green-900 via-teal-900 to-slate-900',
    longBreak: 'from-blue-900 via-indigo-900 to-slate-900',
  };
  return gradients[mode] || 'from-slate-900 via-purple-900 to-slate-900';
}
