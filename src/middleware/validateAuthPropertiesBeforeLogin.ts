import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";

export const validateAuthPropertiesBeforeLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  //REQUIRED FIELDS
  if (!email || !password) {
    sendResponse(
      res,
      { message: "Name, Email, and Password are required", error: true },
      400,
    );
  }

  // TYPES
  if (typeof email !== "string" || typeof password !== "string") {
    sendResponse(res, { message: "Invalid email/password", error: true }, 400);
  }

  // EMAIL REGEX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    sendResponse(res, { message: "Invalid email format", error: true }, 400);
  }

  // PASSWORD REGEX
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;

  const isValidPassword = passwordRegex.test(password);

  if (!isValidPassword) {
    return sendResponse(
      res,
      {
        message:
          "Password must be at least 5 characters and contain at least one letter and one number",
        error: true,
      },
      400,
    );
  }

  next();
};
