# Full Stack Task Manager API

## 📌 Project Overview

This project is a scalable full-stack REST API system with authentication and role-based access control.

It allows users to:
- Register and login securely
- Access protected routes using JWT
- Perform CRUD operations on tasks
- Restrict access based on user roles (User vs Admin)

The project demonstrates secure backend development practices and frontend integration.

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt (Password Hashing)
- Swagger (API Documentation)

### Frontend
- React (Vite)
- Axios
- Tailwind CSS

---

## 🔐 Security Features

- Password hashing using bcrypt
- JWT-based authentication (1-hour expiry)
- Role-based access control
- Protected routes middleware
- Input validation using express-validator
- Centralized error handling

---

## 📂 Project Structure

```
backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── config/
│
frontend/
```

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/chandru010/task-manager-app.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
PORT=5000
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=intern_project
JWT_SECRET=your_secret
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

Backend runs at:

```
http://localhost:5000
```

---

## 📘 API Documentation

Swagger available at:

```
http://localhost:5000/api-docs
```

---

## 👥 Role-Based Access

- **User**: Can manage their own tasks
- **Admin**: Can access admin-only routes

---

## 📈 Scalability Considerations

This project follows modular architecture separating:
- Routes
- Controllers
- Middlewares
- Database configuration

For production scalability:
- Containerization using Docker
- Horizontal scaling with Nginx
- Redis integration for caching
- Database indexing and replication
- Microservices architecture for splitting auth and task services

---

## 🎯 Future Improvements

- Pagination
- Refresh tokens
- Docker deployment
- CI/CD pipeline integration

---

## 👨‍💻 Author

Chandru
