const express = require("express")
const app = express()
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


app.use(cors(
    {
        // origin: "https://backend-9xs2fckma-pauls-projects-60b91cef.vercel.app/",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));
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


const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome to the backend API")
})

app.listen(port, () => {
    console.log(`App ruuning and listening on port ${port}`)
})


module.exports = app;