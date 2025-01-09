const express = require("express");
const cors = require("cors"); // Import du package cors
const app = express();

// Utiliser CORS pour toutes les routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./users");
const taskRoutes = require("./tasks");

app.use("/users/", userRoutes);
app.use("/tasks/", taskRoutes);

module.exports = app;
