import type { Response } from "express";

export function sendResponse<T>(
  res: Response,
  { message, data, error }: { message: unknown; data?: T; error?: boolean },
  statusCode = 200,
) {
  res.status(statusCode).json({
    success: error ? false : true,
    message: message,
    data: error ? undefined : data,
  });
}
