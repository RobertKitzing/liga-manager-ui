import Server from './server';

const port = process.env.PORT || 3001;

Server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});
