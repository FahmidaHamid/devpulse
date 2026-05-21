import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./api/routes/auth.route";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "This is root :)",
  });
});

app.use("/api/auth", authRouter);

export default app;
