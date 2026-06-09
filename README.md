# 🚀 Todo.App

A modern full-stack task management application built with **React.js, Node.js, Express.js, MySQL, Axios, and Tailwind CSS**. TaskFlow Pro helps users efficiently organize and manage tasks with priority levels, real-time search, filtering options, and progress tracking.

---

## 📌 Overview

TaskFlow Pro is designed to improve productivity by providing a simple and intuitive task management experience. Users can create, update, delete, search, and categorize tasks based on priority while monitoring their overall progress through a dashboard.

---

## ✨ Features

### 📋 Task Management
- Add New Tasks
- Edit Existing Tasks
- Delete Tasks
- Mark Tasks as Completed
- Undo Completed Tasks

### 🔍 Search & Filtering
- Real-Time Task Search
- Filter by Status (All, Pending, Completed)
- Filter by Priority (High, Medium, Low)

### 📊 Dashboard Analytics
- Total Tasks Counter
- Completed Tasks Counter
- Pending Tasks Counter
- Completion Progress Tracking

### 🎨 User Interface
- Modern Dark Theme
- Responsive Design
- Interactive Dashboard
- Smooth User Experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MySQL

---

## 📂 Project Structure

```bash
TaskFlow-Pro/
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   ├── assets/
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── Backend/
│   │
│   ├── server.js
│   ├── db.js
│   ├── .env
│   ├── package.json
│   └── node_modules/
│
├── .gitignore
└── README.md
```

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|----------|------------|-------------|
| GET | `/tasks` | Fetch All Tasks |
| POST | `/tasks` | Create New Task |
| PUT | `/tasks/:id` | Toggle Task Status |
| PUT | `/edit/:id` | Edit Existing Task |
| DELETE | `/tasks/:id` | Delete Task |

---

## 🗄️ Database Schema

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    priority ENUM('High','Medium','Low') DEFAULT 'Medium',
    completed BOOLEAN DEFAULT FALSE
);
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the Backend folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager
PORT=5000
```

---

## 🔒 Security

- Environment variables are stored using `.env`
- Sensitive credentials are excluded from Git using `.gitignore`
- Database credentials are not exposed publicly

### .gitignore

```gitignore
node_modules
.env
dist
```

---

## 🚀 Installation & Setup

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🎯 Learning Outcomes

This project helped in understanding:

- React Hooks (`useState`, `useEffect`)
- Component-Based Architecture
- Axios API Integration
- REST API Development
- CRUD Operations
- Express.js Backend Development
- MySQL Database Integration
- Tailwind CSS Styling
- State Management
- Full-Stack Application Development

---

## 💡 Future Improvements

- User Authentication
- JWT Authorization
- User-Specific Tasks
- Task Categories
- Due Dates & Reminders
- Drag & Drop Task Management
- Dark/Light Theme Toggle

---

## 👨‍💻 Developer

### Karan CHOUDHARY

Full Stack Developer

### Skills
- React.js
- Node.js
- Express.js
- MySQL
- JavaScript
- Tailwind CSS

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

---

## 📄 License

This project is created for learning, practice, and portfolio purposes.
