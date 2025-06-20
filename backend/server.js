const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const promptroutes=require('./routes/prompt.routes')
const cookieparser=require('cookie-parser')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

//cookie parsing
app.use(cookieparser());

// Error handler for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON format" });
  }
  next();
});

// Routes for login,signup and logout
app.use("/api", userRoutes);

//routes for prompt
app.use('/api',promptroutes)

// Test route
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
