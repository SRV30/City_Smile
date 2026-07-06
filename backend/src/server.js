import express from "express";
import cors from "cors";

import env from "./config/env.js";
import routes from "./routes/index.js"; 
import connectDb from "./db/connect.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: [
      env.clientUrl,
      env.clientUrlDev,
      env.localUrl,
    //   "https://saubhagyamastro.in",
    //   "https://www.saubhagyamastro.in",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Citysmile backend API Running",
  });
});

app.use("/api", routes);

app.use(errorHandler);

connectDb()
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed", error.message);
  });

export default app;
