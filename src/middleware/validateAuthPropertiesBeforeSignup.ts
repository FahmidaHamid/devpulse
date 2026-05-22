import { NextFunction, Request, Response } from "express";
import { USERROLE } from "../types";
import { sendResponse } from "../utils/sendResponse";

export const validateAuthPropertiesBeforeSignup = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password, role } = req.body;

  //REQUIRED FIELDS
  if (!name || !email || !password) {
    sendResponse(
      res,
      { message: "Name, Email, and Password are required", error: true },
      400,
    );
  }

  // TYPES
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    sendResponse(
      res,
      { message: "Invalid name/email/password", error: true },
      400,
    );
  }

  // NAME LENGTH
  if (name.trim().length < 3) {
    sendResponse(
      res,
      { message: "Name must be at least 3 characters", error: true },
      400,
    );
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

  // ROLE OPTIONAL
  // only validate IF provided
  if (role && !Object.values(USERROLE).includes(role)) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }

  next();
};

//export default validateAuthPropertiesBeforeSignup;
