const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const verifyToken = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// PROJECT ROUTES
app.use("/api/projects", projectRoutes);

// TASK ROUTES
app.use("/api/tasks", taskRoutes);

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Server Running");
});

// TEST API
app.get("/api/test", (req, res) => {
  res.json({
    message: "API Working Successfully"
  });
});

// PROTECTED ROUTE
app.get("/api/protected", verifyToken, (req, res) => {

  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});