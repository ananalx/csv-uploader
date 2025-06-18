import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import errorHandler from "./routes/middlewares/error.middleware";
import router from "./routes";
import mongoose from "mongoose";

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_CRED!);

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.1.42:5173",
  "http://localhost:4000",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(router);

app.listen(4000, () => console.log("connected"));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(errorHandler);
