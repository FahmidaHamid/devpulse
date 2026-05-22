import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./api/routes/auth.route";
import { issuesRouter } from "./api/routes/issues.route";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "This is root route for assignment 02 :)",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRouter);
app.use(globalErrorHandler);

export default app;
