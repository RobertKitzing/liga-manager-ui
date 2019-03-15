import Server from './server';
import environment from './environment';

Server.express.listen(environment.EXPRESS_PORT, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${environment.EXPRESS_PORT}`);
});

Server.graphQLServer.start({
  port: environment.GRAPHQL_PORT
},
  () => console.log(`Server is running on localhost:${environment.GRAPHQL_PORT}`)
);
