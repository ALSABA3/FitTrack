import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = 4000;
app.use(cors());
const uri = process.env.DATA_BASE_KEY;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
mongoose.connect(uri, clientOptions);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

import userRouter from "./routes/user.js";
app.use("/user", userRouter);

import profileRouter from "./routes/profile.js";
app.use("/profile", profileRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
