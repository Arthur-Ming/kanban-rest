import mongoose from "mongoose";
import app from "./app.js";
import { PORT, MONGO_CONNECTION_URL } from "./common/config.js";

mongoose
  .connect(MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  // eslint-disable-next-line no-unused-expressions
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
