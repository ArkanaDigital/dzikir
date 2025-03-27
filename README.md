# Dzikir App

A Progressive Web App (PWA) built with React, TypeScript, and Tailwind CSS for daily Islamic remembrance (dzikir). The app provides a beautiful, intuitive interface for morning (pagi), evening (petang), after-prayer (sholat), and Ramadhan-specific remembrances.

## Features

- 📱 Progressive Web App (PWA) support
- 🎨 Beautiful UI with gradient effects and animations
- 📖 Four categories of dzikir (Morning, Evening, After-Prayer, Ramadhan)
- 🔢 Interactive counter with haptic feedback
- 🔄 Progress tracking for each dzikir
- 👆 Swipe gestures for navigation
- 📱 Responsive design for all devices
- 🌙 Beautiful typography with Amiri (Arabic) and Crimson Text (Latin) fonts
- 💫 Smooth animations using Framer Motion

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- React Swipeable
- Lucide React (Icons)
- PWA Support (vite-plugin-pwa)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arkanadigital/dzikir-app.git
   cd dzikir-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── CounterCard.tsx # Counter display component
│   └── DzikirCard.tsx  # Main dzikir display component
├── data/               # Static data
│   └── dzikir.json    # Dzikir content
├── store/              # State management
│   └── dzikirStore.ts # Zustand store
├── types/              # TypeScript types
│   └── index.ts       # Type definitions
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Features in Detail

### PWA Support
- Offline functionality
- Add to home screen
- Custom icons for different platforms
- Service worker for caching

### State Management
- Uses Zustand for state management
- Tracks:
  - Active tab
  - Counter states
  - Current dzikir index
  - Progress for each dzikir

### Haptic Feedback
- Vibration feedback on counter increment
- Special pattern for completion
- iOS and Android support
- Graceful fallback when unavailable

### Navigation
- Tab-based navigation
- Swipe gestures for next/previous
- Progress indicator
- Counter reset functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Arabic font: [Amiri](https://fonts.google.com/specimen/Amiri)
- Latin font: [Crimson Text](https://fonts.google.com/specimen/Crimson+Text)
- Icons: [Lucide](https://lucide.dev/)