const express = require("express")
const app = express()
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const notifyClients = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

app.set('notifyClients', notifyClients);

const userRoutes = require("./users")
const taskRoutes = require("./tasks")

app.use("/users/", userRoutes)
app.use("/tasks/", taskRoutes)


module.exports = server
