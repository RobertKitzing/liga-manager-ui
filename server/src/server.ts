import * as express from 'express';
import * as expressWsRoutes from 'express-ws-routes';
import * as path from 'path';
import { WebSocketMessage, WebSocketMessageTypes } from '../../shared/models/websocket.model';

class Server {
    public express;
    private wsClients: any[] = new Array<any>();

    constructor() {
        this.express = expressWsRoutes();
        this.express.use(express.static(__dirname + '/www'));
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router: any = express.Router();
        router.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'www/index.html'));
        });

        router.websocket('/ws', (info, cb, next) => {
            cb(
                (socket) => {
                    this.wsClients.push(socket);
                    socket.on('close', () => {
                        this.wsClients = this.wsClients.filter(s => s !== socket);
                    });
                    socket.on('error', () => {
                        this.wsClients = this.wsClients.filter(s => s !== socket);
                    });
                    socket.on('message', (message) => {
                        const msg: WebSocketMessage = JSON.parse(message);
                        switch (msg.type) {
                            case WebSocketMessageTypes.PITCH_ADDED:
                            case WebSocketMessageTypes.MATCH_UPDATED:
                                this.broadcast(JSON.stringify(msg), socket);
                                break;
                        }
                        this.broadcast(JSON.stringify(msg), socket);
                    });
                });
        });
        this.express.use('/', router);
    }

    broadcast(message: string, self?: WebSocket) {
        this.wsClients.forEach((client) => {
            if (client && client.readyState === 1 && self && self !== client) {
                client.send(message);
            }
        });
    }
}

export default new Server().express;
