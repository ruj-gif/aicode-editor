# aicode-editor

A lightweight web-based AI-assisted code editor with backend integration for AI code generation and a React frontend UI.

## 🚀 Project Overview

`aicode-editor` is a full-stack code editor toolkit built with:

- Backend: Node.js + Express
- Frontend: Vite + React
- AI code generation route (in `backend/routes/generate.js`)
- Editor/preview components in `frontend/src/components`

This project can be used as a foundation for a real-time AI code assistant and editor experience.

## ⚙️ Features

- Editable code panel
- Live preview of rendered output
- AI code generation endpoint
- Separate backend and frontend for clear structure

## 🧩 Tech Stack

- Node.js (backend)
- Express (HTTP API)
- React (UI)
- Vite (dev server and build tooling)

## 🚦 Prerequisites

- Node.js 16+ (LTS recommended)
- npm (comes with Node)

## 🛠️ Setup

1. Clone repository:

```bash
git clone https://github.com/ruj-gif/aicode-editor.git
cd aicode-editor
```

2. Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## ▶️ Running in Development

### Start backend

```bash
cd backend
npm start
```

- By default this starts the Express server (likely on `http://localhost:3000`).
- Confirm `server.js` for exact port.

### Start frontend

```bash
cd frontend
npm run dev
```

- This starts Vite (likely on `http://localhost:5173`).
- Frontend communicates with backend via `/api` or configured proxy.

## 🏗️ Build for Production

### Build frontend

```bash
cd frontend
npm run build
```

### Start backend in production mode

```bash
cd backend
npm run start
```

(Consider serving `frontend/dist` with a static middleware in Express if you wire fullstack deployment.)

## 🧪 Project Structure

- `backend/server.js` – Express server entry
- `backend/routes/generate.js` – AI code-generation route
- `frontend/src/components/Chat.jsx` – chat UI
- `frontend/src/components/Editor.jsx` – code editor UI
- `frontend/src/components/Preview.jsx` – preview renderer
- `frontend/main.jsx`, `frontend/App.jsx` – app bootstrap

## 🔧 Configuration

- Check `frontend/vite.config.js` for proxy settings, e.g. backend API route redirect.
- Add AI provider keys in backend route logic (`generate.js`) as needed.

## 📝 API

- `POST /generate` – generate code snippet or content from AI prompt (implement details in `backend/routes/generate.js`).

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/foo`)
3. Commit changes (`git commit -m "feat: ..."`)
4. Push branch (`git push origin feature/foo`)
5. Open PR and request review

## 📄 License

Add license information here (MIT, Apache 2.0, etc.) as appropriate.
