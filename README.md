# 💻 Deepseek Backend API

This is a Node.js backend API built with **Express**, **MongoDB (Mongoose)**, **JWT authentication**, and **bcrypt** for password hashing.

---

## 🚀 Features

- User signup with hashed passwords
- User login with JWT token generation
- Environment variable support via `.env`
- Modular and clean code structure

---

## 📁 Project Structure


backend/
├── controllers/
│ └── user.controller.js
├── models/
│ └── userModel.js
├── routes/
│ └── user.routes.js
├── config.js
├── .env
├── server.js
└── package.json




---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory with the following content:

MONGO_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_super_secret_key



---

## 🛠️ Installation & Running

```bash
cd backend
npm install
npm start



📡 API Endpoints
📝 Signup
POST /api/signup
Body:

json
Copy code
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
🔑 Login
POST /api/login
Body:

json
Copy code
{
  "email": "john@example.com",
  "password": "yourpassword"
}
Returns:

json
Copy code
{
  "token": "your_jwt_token"
}
📝 Notes
Passwords are securely hashed using bcrypt

JWT secret is loaded from .env via config.js

Ensure MongoDB is running and accessible when starting the server

yaml
Copy code

---

Just paste the above content into your `README.md` file in the GitHub repository. Let me know if you want to include curl commands or Postman collection links too.







