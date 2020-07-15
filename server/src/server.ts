import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import dbConfig from "./config/db";
config();
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
// connect to the database
dbConfig();
// run the application
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => console.log(`app is running at port ${port}`));
