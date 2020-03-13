const server = require('./server.js');

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`\n* Server listening on http://localhost:${port} *\n`);
});

module.exports = server;