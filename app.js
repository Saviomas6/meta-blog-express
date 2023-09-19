import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect.js";
import "dotenv/config";
import { userRouter } from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;

app.use("/user", userRouter);

const startServer = async () => {
  try {
    const response = await connectDB();
    if (response) {
      console.log("Connection successful");
    }
    app.listen(PORT, () => {
      console.log("App listening on port 8081!");
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
