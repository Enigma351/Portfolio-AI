# Partha OS - Server API 🚀

This directory contains the Node.js/Express backend for **Partha OS**, an AI-integrated portfolio ecosystem.

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Add MONGO_URI, OPENAI_API_KEY, and PORT
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🛠️ Features

- **AI Integration**: OpenAI-powered endpoints for JD Matcher and AI Mascot.
- **Data Management**: MongoDB persistence for contact messages and experience.
- **REST API**: Clean, RESTful endpoints for frontend consumption.
- **Security**: CORS-protected backend with environment variables.

## 📂 Directory Structure

- `controllers/`: Logic for request handling and AI processing.
- `models/`: Mongoose schemas for MongoDB collections (e.g., Message, Experience).
- `routes/`: Express router definitions for API endpoints.
- `data/`: Local storage or seed data for development.
- `server.js`: Application entry point.

## 🛠️ Tech Stack

- **Node.js**: Backend runtime.
- **Express.js**: Request routing and server logic.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM for MongoDB interaction.
- **OpenAI API**: AI-powered features for JD matching and mascot interaction.
- **Cors**: Middleware for secure cross-origin requests.
- **Dotenv**: Environment variable management.

---

For full project details, see the [Root README.md](../README.md).
