import * as redis from 'redis';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import environment from './environment';
import { RedisEvent } from './generated/types';

const REDIS_CHANNEL = 'REDIS_CHANNEL';

class QGLServer {

    public graphQLServer: GraphQLServer;
    private redisClient;
    private pubSub: PubSub = new PubSub();

    constructor() {
        try {
            this.initRedisClient();
            this.initGraphQL();
        } catch (error) {
            console.error(error);
        }
    }

    private initRedisClient() {
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
            typeDefs: './schema.graphql',
            resolvers
        });
    }
}

export default new QGLServer();
