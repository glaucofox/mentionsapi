const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');
const port = normalizePort(process.env.PORT || 3000);

// error handler
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);

        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);

        default:
            throw error;
    }
}

// listener handler
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

// PORT // based on express-generator
function normalizePort(val) {
    const port = parseInt(val, 10);
    let result = false;

    if (isNaN(port)) {
        result = val;
    }

    if (port >= 0) {
        result = port;
    }

    return result;
}

// server
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API is alive on ' + port);
