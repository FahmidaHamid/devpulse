import express, {
  NextFunction,
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format",
    });
  }

  next();
});

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
