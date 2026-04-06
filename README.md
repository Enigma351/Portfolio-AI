# Partha OS - Client Application 🎨

This directory contains the React-based frontend for **Partha OS**, an interactive portfolio environment.

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Add your VITE_API_URL
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🛠️ Features

- **OS Experience**: Desktop, Windows, Taskbar, Icons.
- **3D Graphics**: Interactive Starfield background (Three.js).
- **AI Integration**: JD Matcher & AI Mascot interface.
- **State Management**: Zustand-powered OS state.
- **Animations**: GSAP-driven transitions and window management.

## 📂 Directory Structure

- `src/apps/`: Individual OS applications (e.g., ContactApp, SettingsApp).
- `src/components/`: Reusable UI components (Window, Desktop, BootScreen).
- `src/store/`: Zustand store for managing OS state (windows, z-index, etc.).
- `src/assets/`: Visual assets like images and styles.

## 🛠️ Tech Stack

- **React 19**: Modern UI development.
- **Vite 6**: Fast build and development.
- **Tailwind CSS 4**: Modern styling system.
- **GSAP & Framer Motion**: Advanced animations.
- **Three.js & R3F**: 3D graphics.
- **Zustand**: Global state management.
- **Lucide React**: Modern iconography.

---

For full project details, see the [Root README.md](../README.md).

