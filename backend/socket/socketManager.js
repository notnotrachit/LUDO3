const { sessionMiddleware } = require('../config/session');

const socketManager = {
    io: null,
    initialize(server) {
        this.io = require('socket.io')(server, {
            origins: '*:*',
            cors: {
                origin: '*',
            },
            allowRequest: (req, callback) => {
                const fakeRes = {
                    getHeader() {
                        return [];
                    },
                    setHeader(key, values) {
                        req.cookieHolder = values[0];
                    },
                    writeHead() {},
                };
                sessionMiddleware(req, fakeRes, () => {
                    if (req.session) {
                        fakeRes.writeHead();
                        req.session.save();
                    }
                    callback(null, true);
                });
            },
        });
    },
    getIO() {
        if (!this.io) {
            throw new Error('Socket.io not initialized');
        }
        console.log('Socket.io initialized');
        return this.io;
    },
};

module.exports = socketManager;
