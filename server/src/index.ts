import Server from './server';

const port = process.env.PORT || 3000;

Server.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});
