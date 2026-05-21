import { Response } from "express";
import config from "../config";

const globalErrorHandler = async (error: unknown, res: Response) => {
  res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : "Internal Server Error",
    stack:
      config.node_env === "development" && error instanceof Error
        ? error.stack
        : undefined,
  });
};

export default globalErrorHandler;
