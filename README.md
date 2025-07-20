# MoodMate AI

![MoodMate Logo](frontend/public/moomate%20logo.png)

**MoodMate AI** is your modern, emotionally intelligent chat companion. Built with a custom Flask backend, React frontend, and LLaMA 3 via Ollama, it offers multiple conversation modes—sarcastic, brutally honest, supportive, and neutral. All your chats are private and stored locally for your convenience.

---

## 🚀 Features

- 💬 **Multiple Conversation Modes:** Sarcastic, Brutally Honest, Supportive, Neutral
- 🔒 **Private, Local Chat History:** All conversations are stored locally in SQLite
- ⚡ **Fast, On-Device AI:** Powered by LLaMA 3 via Ollama, no cloud required
- 🎨 **Beautiful, Responsive UI:** Modern, dark-themed, and mobile-friendly
- 🗂️ **Sidebar Navigation:** Browse and revisit all your previous conversations
- 🌐 **Portfolio & About:** Learn more about the creator and the project

---

## 🖥️ Screenshots

![Chat UI](./screenshots/chat-ui.png)
![About Page](./screenshots/about-page.png)

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, CSS Modules
- **Backend:** Python, Flask, Flask-CORS, Flask-SQLAlchemy
- **AI Model:** LLaMA 3 via Ollama (runs locally)
- **Database:** SQLite (local, file-based)

---

## ⚙️ Getting Started

### Prerequisites
- Node.js & npm
- Python 3.8+
- [Ollama](https://ollama.com/) with LLaMA 3 model installed

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/moodmate-ai.git
cd moodmate-ai
```

### 2. Install dependencies
#### Frontend
```bash
cd frontend
npm install
```
#### Backend
```bash
cd ../backend
pip install -r requirements.txt
```

### 3. Start the backend
```bash
cd backend
python app.py
```

### 4. Start the frontend
```bash
cd ../frontend
npm start
```

### 5. Make sure Ollama is running with LLaMA 3

---

## 📱 Usage
- **Chat:** Start chatting in any mode. Switch modes anytime.
- **Sidebar:** Click previous conversations to revisit them.
- **About:** Learn about the project and creator.
- **Portfolio:** Visit the creator's portfolio.

---

## 🙏 Credits
- Designed & developed by [Sudhanshu Shukla](https://sudhanshu-shukl.github.io/portfolio/)
- Powered by [Ollama](https://ollama.com/) and LLaMA 3

---

## 📄 License
MIT License. See [LICENSE](LICENSE) for details.

---

> MoodMate AI: Your modern, emotionally intelligent chat companion.
