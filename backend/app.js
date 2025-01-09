const express = require("express")
const app = express()

const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./users");
const taskRoutes = require("./tasks");

app.use("/users/", userRoutes);
app.use("/tasks/", taskRoutes);

module.exports = app;
