const express = require('express');
const server = express();

const projectRouter = require("./projects/projectsRouter");
const actionRouter = require("./actions/actionsRouter");

server.use(express.json());

server.use("/api/projects", projectRouter)
server.use("/api/actions", actionRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Type the endpoints you want into the URL!</h2>`);
});

module.exports = server;