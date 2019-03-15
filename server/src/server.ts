import * as express from 'express';
import * as path from 'path';
import * as helmet from 'helmet';
import * as redis from 'redis';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import environment from './environment';
import { RedisEvent } from './generated/types';

const REDIS_CHANNEL = 'REDIS_CHANNEL';

class Server {
    public express;
    public graphQLServer: GraphQLServer;
    private redisClient;
    private pubSub: PubSub = new PubSub();

    constructor() {
        this.express = express();
        this.express.use(express.static(__dirname + '/www'));
        this.express.use(helmet());
        this.express.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'www/index.html'));
        });
        this.initGraphQL();
        this.redisClient = redis.createClient(environment.REDIS_PORT, environment.REDIS_HOST);
        this.redisClient.on('message', (_, message) => {
            const data: RedisEvent = JSON.parse(message);
            data.payload = JSON.stringify(data.payload);
            this.pubSub.publish(REDIS_CHANNEL, data);
          });
        this.redisClient.subscribe('events');
    }

    private initGraphQL() {
        const resolvers = {
            Query: {
                hello: () => ''
            },
            Subscription: {
                redisevent: {
                    subscribe: async (parent, args, context) => {
                        return this.pubSub.asyncIterator(REDIS_CHANNEL);
                    },
                    resolve: (payload: RedisEvent) => {
                        return payload;
                    }
                }
            },
        };

        this.graphQLServer = new GraphQLServer({
            typeDefs: './graphql/schema.graphql',
            resolvers
        });
    }
}

export default new Server();
