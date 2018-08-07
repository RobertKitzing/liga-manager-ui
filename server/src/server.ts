import * as express from 'express';
import * as expressWs from 'express-ws-routes';
import * as path from 'path';

class Server {
  public express;

  constructor () {
    this.express = expressWs();
    this.express.use(express.static(__dirname + '/www'));
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = express.Router();
    router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'www/index.html'));
    });
    router.websocket('/ws', function(info, cb, next) {
        cb(function(socket) {
            socket.send('connected!');
        });
    });
    this.express.use('/', router);
  }
}

export default new Server().express;
