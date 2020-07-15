import { connect, connection } from "mongoose";
import { config } from "dotenv";
config();
const host = process.env.MONGO_URI as string;
export default async function dbConfig() {
  try {
    await connect(host, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db is connected");
  } catch (error) {
    connection.on("error", (err) => {
      console.error(err);
    });
  }
}
