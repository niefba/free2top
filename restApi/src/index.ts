import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import { courseRouter } from "./routes/course.routes";
import "reflect-metadata";
//import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' , credentials :  true}));

//app.use(errorHandler);
const { PORT = 3000 } = process.env;
app.use("/auth", userRouter);
app.use("/api", courseRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.log(error);
  });
