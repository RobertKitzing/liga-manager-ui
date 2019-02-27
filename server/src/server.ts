import * as express from 'express';
import * as path from 'path';
import * as helmet from 'helmet';
import * as redis from 'redis';
import { GraphQLServer, PubSub } from 'graphql-yoga';

class Server {
    public express;
    public graphQLServer;
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
        this.redisClient = redis.createClient();
        this.redisClient.on('message', (channel, message) => {
            console.log(`message: ${message} channel: ${channel}`);
            this.pubSub.publish('REDIS_CHANNEL', message);
          });
        this.redisClient.subscribe('events');
    }

    private initGraphQL() {
        const resolvers = {
            Query: {
                hello: () => 'duda'
            },
            Subscription: {
                redisevent: {
                    subscribe: async (parent, args, context) => {
                        return this.pubSub.asyncIterator('REDIS_CHANNEL');
                    },
                    resolve: payload => {
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
