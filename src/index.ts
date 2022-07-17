import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorMiddleware);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
