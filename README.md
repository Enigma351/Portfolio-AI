# Partha OS - Portfolio AI 🚀

Welcome to **Partha OS**, a high-performance, AI-integrated portfolio designed as a desktop operating system. Built with modern web technologies, this project showcases projects, skills, and experience through an immersive, interactive interface.

![Partha OS Screenshot](https://raw.githubusercontent.com/Enigma351/Portfolio-AI/main/client/public/screenshot.png) *(Note: Replace with actual screenshot URL)*

---

## 🏗️ Architecture & Features

### 💻 Core OS Experience
- **Interactive Desktop**: A fully functional desktop environment with icons, taskbar, and windows.
- **Window Management**: Dynamic window system with drag, resize, maximize, and minimize capabilities.
- **Boot Sequence**: realistic BIOS-style startup animation with system checks.
- **3D Immersive Background**: Interactive Starfield/Nebula background powered by Three.js.

### 🤖 AI Integration
- **AI Assistant**: A personalized mascot powered by OpenAI to answer questions about me.
- **JD Matcher**: Upload a job description and see how well my profile matches the requirements.

### 📱 Built-in Applications
- **Projects Explorer**: Showcase of projects with live links and GitHub repositories.
- **Experience & Education**: Timeline-based views of professional and academic history.
- **Skills System**: Visual representation of technical expertise.
- **System Monitor**: Real-time visualization of application performance and state.
- **Resume Viewer**: Integrated view of my professional resume.
- **Settings**: Customization options for the OS experience.
- **Contact**: Secure communication channel for inquiries.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **3D Rendering**: [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **AI Service**: [OpenAI API](https://openai.com/api/)
- **Utilities**: CORS, Dotenv, Nodemon

---

## 📂 Project Structure

```text
portfolio-ai/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── apps/          # Individual OS Applications (Contact, Projects, etc.)
│   │   ├── components/    # Core UI Components (Window, Desktop, DesktopIcon)
│   │   ├── store/         # Zustand State Management
│   │   └── assets/        # Visual Assets
│   └── public/            # Static Assets
├── server/                 # Backend API
│   ├── controllers/       # Business Logic
│   ├── models/            # MongoDB Schemas
│   ├── routes/            # API Endpoints
│   └── data/              # Static or Seed Data
└── README.md              # Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Enigma351/Portfolio-AI.git
   cd portfolio-ai
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   cp .env.example .env
   # Add your environment variables
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd ../server
   npm install
   cp .env.example .env
   # Add your environment variables
   npm run dev
   ```

---

## 📜 Environment Variables

### Client (.env)
- `VITE_API_URL`: Backend server URL (e.g., `http://localhost:5000`)

### Server (.env)
- `MONGO_URI`: MongoDB connection string
- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: Server port (default 5000)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
