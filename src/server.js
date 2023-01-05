import mongoose from 'mongoose';
import app from './app.js';
import config from './common/config.js';

mongoose
  .connect(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.listen(config.port, (error) => {
  // eslint-disable-next-line no-unused-expressions
  error ? console.log(error) : console.log(`listening port ${config.port}`);
});
