# Pomodoro Timer

A modern, beautiful Pomodoro Timer application built with React, Tailwind CSS, and Vite. Focus better and achieve more with the Pomodoro Technique.

## Features

### Core Features (MVP)
- ✅ **Timer System**: 25-minute work sessions with 5/15-minute breaks
- ✅ **Smart Controls**: Start, Pause, Resume, Reset, and Skip functionality
- ✅ **Session Tracking**: Visual tracking of completed Pomodoros
- ✅ **Customizable Settings**: Adjust work and break durations to your preference
- ✅ **Browser Notifications**: Get notified when sessions complete
- ✅ **Sound Alerts**: Completion sounds (toggleable)
- ✅ **Dark/Light Theme**: Toggle between dark and light modes
- ✅ **Data Persistence**: All settings and progress saved to localStorage

### Advanced Features
- ✅ **Task Management**: Create tasks with Pomodoro estimates
- ✅ **Statistics Dashboard**: Track your productivity over time
- ✅ **Beautiful UI**: Glassmorphism design with smooth animations
- ✅ **Responsive Design**: Works perfectly on all devices
- ✅ **Color-Coded Modes**: Red for work, Green for short breaks, Blue for long breaks

## Tech Stack

- **React 19** with Hooks (modern, clean code)
- **Tailwind CSS 4** for styling (utility-first, fast development)
- **Vite 7** as build tool (super fast, modern alternative to Create React App)
- **localStorage** for persistence
- **Lucide React** for icons (clean, modern icons)

## Project Structure

```
pomodoro-timer/
├── src/
│   ├── components/
│   │   ├── Timer.jsx           # Circular timer display
│   │   ├── Controls.jsx        # Play/pause/reset controls
│   │   ├── SessionTracker.jsx  # Session completion tracker
│   │   ├── Settings.jsx        # Settings modal
│   │   ├── Statistics.jsx      # Stats dashboard
│   │   └── TaskList.jsx        # Task management
│   ├── hooks/
│   │   ├── useTimer.js         # Timer logic hook
│   │   ├── useLocalStorage.js  # LocalStorage hook
│   │   └── useNotifications.js # Notifications hook
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pomodoro-timer.git
cd pomodoro-timer
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Start a Session**: Click the "Start" button to begin a 25-minute work session
2. **Take Breaks**: After each work session, take a 5-minute short break
3. **Long Breaks**: Every 4 Pomodoros, take a 15-minute long break
4. **Customize**: Click "Settings" to adjust durations and preferences
5. **Track Tasks**: Add tasks in the right panel with estimated Pomodoros
6. **View Stats**: Check your productivity statistics in the dashboard

## Customization

### Adjust Timer Durations
1. Click the "Settings" button
2. Modify work/break durations
3. Set long break interval
4. Save changes

### Enable Notifications
1. Open Settings
2. Click "Enable" under Browser Notifications
3. Allow notifications when prompted

### Toggle Sound
1. Open Settings
2. Toggle the "Completion Sound" switch

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Manual Deployment
```bash
npm run deploy
```

### Automatic Deployment
Push to the `main` branch and GitHub Actions will automatically build and deploy to GitHub Pages.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Built with React, Tailwind CSS, and Vite
- Icons by Lucide React
- Inspired by the Pomodoro Technique by Francesco Cirillo

---

**Focus better, achieve more** 🍅
