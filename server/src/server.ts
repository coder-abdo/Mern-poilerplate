import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import dbConfig from "./config/db";
import {
  errorMiddleWare,
  errorMiddleWareHandler,
} from "./controllers/errorHandler";
import userRoutes from "./routes/user";
config();
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
// connect to the database
dbConfig();
// run the application
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(userRoutes);
// error handler
app.use(errorMiddleWare);
app.use(errorMiddleWareHandler);
app.listen(port, () => console.log(`app is running at port ${port}`));
