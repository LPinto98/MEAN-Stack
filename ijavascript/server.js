const http = require('http');
const app = require('./backend/app');
const { PORT } = require("./backend/config");

let port = PORT || 3000;
app.set('port', port)
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is now listening on port: ${port}`);
});
