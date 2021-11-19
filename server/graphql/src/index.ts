import QGLServer from './graphql';
import environment from './environment';

QGLServer.graphQLServer.start({
    port: environment.GRAPHQL_PORT
},
    () => console.log(`Server is running on localhost:${environment.GRAPHQL_PORT}`)
);
