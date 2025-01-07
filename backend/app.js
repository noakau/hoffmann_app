const express = require("express")
const app = express()
var sqlinjection = require('sql-injection');

app.use(express.json())
app.use(sqlinjection); // sqlinjection middleware: npm packge   https://www.npmjs.com/package/sql-injection
// XSS prevention should be done on the frontend with dom purify



const userRoutes = require("./users")
const taskRoutes = require("./tasks")

app.use("/users/", userRoutes)
app.use("/tasks/", taskRoutes)


module.exports = app
