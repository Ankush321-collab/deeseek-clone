Deepseek Backend API
This is a Node.js backend API using Express, MongoDB (Mongoose), JWT authentication, and bcrypt for password hashing.

Features
User signup with hashed password
User login with JWT token generation
Environment variable support via .env
Modular code structure

Project Structure
backend/
  controllers/
    user.controller.js
  models/
    userModel.js
  routes/
    user.routes.js
  config.js
  .env
  server.js
  package.json

  Environment Variables
Create a .env file in the backend directory with:
MONGO_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_super_secret_key

Install & Run
cd backend
npm install
npm start


API Endpoints
Signup
POST /api/signup
Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}

ogin
POST /api/login
Body:
{
  "email": "john@example.com",
  "password": "yourpassword"
}

Returns: JWT token
Notes
All passwords are hashed with bcrypt.
JWT secret is loaded from .env via config.js.
Make sure MongoDB is running and accessible.






