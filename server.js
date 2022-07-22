const express = require("express");
const mongoose = require("mongoose");
const boardRoutes = require("./routes/board-routes");
const columnRoutes = require("./routes/column-routes");
const taskRoutes = require("./routes/task-routes");
const createPath = require("./helpers/create-path");
const cors = require("cors");

const app = express();

const PORT = 8000;
const db =
  "mongodb+srv://Arthur:6kpsDX2Tw3UGHnG@cluster0.x5m5nwl.mongodb.net/pms?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(cors());

app.use(boardRoutes);
app.use(columnRoutes);
app.use(taskRoutes);

app.use((req, res) => {
  res.status(404).sendFile(createPath("error"));
});
