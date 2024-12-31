require("dotenv").config();
const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const introRoutes = require("./routes/introductionRoutes");
const eduRoutes = require("./routes/educationRoutes");
const skillRoutes = require("./routes/skillsRoutes");
const experienceRoute = require("./routes/experienceRoutes");
const projectsRoute = require("./routes/projectsRoutes");
const connectDb = require("./utils/dbConnect");

const app = express();
const morgan = require("morgan");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));



// API routes
app.use("/api", authRoutes);
app.use("/api", introRoutes);
app.use("/api", eduRoutes);
app.use("/api", skillRoutes);
app.use("/api", experienceRoute);
app.use("/api", projectsRoute);

// Serve static files from client/dist
const clientPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientPath));

// Catch-all for SPA
app.get("*", (_, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
