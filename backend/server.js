const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware


// ✅ CORS setup (Frontend port: 5173, Backend port: 5000)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());
// ✅ MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/2pm_mern_project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Static folder (for images/files if needed)


// ✅ Routes
const frontendRoutes = require("./Router/frontendRoutes");
app.use("/api", frontendRoutes);
app.use(express.static("public"));

// ✅ Default route (for testing server is live)
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ✅ Server listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
