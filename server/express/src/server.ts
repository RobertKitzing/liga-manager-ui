import * as express from 'express';
import * as path from 'path';
import * as helmet from 'helmet';
import * as httpProxy from 'http-proxy';
import environment from './environment';

class ExpressServer {
    private express;

    constructor() {
        this.express = express();
        this.express.use(express.static(__dirname + '/www'));
        this.express.use(helmet());
        this.express.get('/appsettings.json', (req, res) => {
            res.json({
                graphqlUrl: environment.GRAPHQL_URL,
                graphqlWsUrl: environment.GRAPHQL_WS_URL,
                googleMapsApiKey: environment.GOOGLE_MAPS_API_KEY,
            });
        });
        this.express.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'www/index.html'));
        });
    }

    start() {
        this.express.listen(environment.EXPRESS_PORT, '0.0.0.0', (err) => {
            if (err) {
                return console.log(err);
            }

            return console.log(`server is listening on ${environment.EXPRESS_PORT}`);
        });
    }
}

export default new ExpressServer();
