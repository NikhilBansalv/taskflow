# 🚀 TaskFlow

A modern full-stack project management application inspired by Jira, built to help teams organize projects, manage tasks, and track progress efficiently.

🌐 **Live Demo:** https://taskflow-frontend-dusky.vercel.app

---

## ✨ Features

### 🔐 Authentication

- User Registration
- Secure Login with JWT Authentication
- Protected Routes
- Password Encryption using BCrypt

### 📊 Dashboard

- Project Statistics
- Task Analytics
- Productivity Chart
- Task Distribution Pie Chart
- Active Projects
- Upcoming Tasks

### 📁 Project Management

- Create Projects
- Edit Projects
- Delete Projects
- View Project Details

### ✅ Task Management

- Create Tasks
- Update Task Status
- Edit Tasks
- Delete Tasks
- Priority Levels
- Due Dates

### 👤 User Profile

- View Profile
- Update Name
- Member Since Information

### 📱 UI/UX

- Responsive Design
- Modern Material UI Interface
- Mobile Navigation Drawer
- Dark Theme
- Interactive Charts

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Material UI
- Axios
- React Router
- MUI X Charts

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate

## Database

- MySQL (Railway)

## Deployment

- Frontend → Vercel
- Backend → Railway
- Database → Railway MySQL

---

# 📂 Project Structure

```text
taskflow
│
├── backend
│   └── taskmanager
│       ├── src
│       ├── pom.xml
│       └── Dockerfile
│
└── frontend
    ├── src
    ├── public
    └── vite.config.js
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/NikhilBansalv/taskflow.git
cd taskflow
```

---

## Backend

```bash
cd backend/taskmanager
```

Configure the following environment variables:

```properties
DB_URL=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
```

Run:

```bash
./mvnw spring-boot:run
```

---

## Frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:8080
```

Run

```bash
npm run dev
```

---

# 📈 Future Improvements

- Email Verification
- Forgot Password
- Task Comments
- File Attachments
- Team Collaboration
- Notifications
- Kanban Drag & Drop
- Activity Timeline
- Project Search & Filters

---

# 👨‍💻 Author

**Nikhil Bansal V**

---

⭐ If you found this project useful, consider giving it a star!
