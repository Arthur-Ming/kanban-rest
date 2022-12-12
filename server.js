import express from "express";
import mongoose from "mongoose";
import boardRoutes from "./routes/board.js";
import columnRoutes from "./routes/column.js";
import taskRoutes from "./routes/task.js";
import createPath from "./helpers/create-path.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const PORT = 8000;
const db =
  "mongodb+srv://Arthur:6kpsDX2Tw3UGHnG@cluster0.x5m5nwl.mongodb.net/pms?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(cors());
app.use(bodyParser.json());

app.use(boardRoutes);
app.use(columnRoutes);
app.use(taskRoutes);
/* 
app.use((req, res) => {
  res.status(404).sendFile(createPath("error"));
}); */
