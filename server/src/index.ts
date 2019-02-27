import Server from './server';

const port = process.env.PORT || 3098;

Server.express.listen(port, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});

Server.graphQLServer.start(
  () => console.log('Server is running on localhost:4000')
);
