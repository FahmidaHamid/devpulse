import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ISSUE_TYPE } from "../types";

export const validateCreateIssue = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, type } = req.body;

  //REQUIRED FIELDS
  if (!title || !description) {
    sendResponse(
      res,
      { message: "Title and Description are required", error: true },
      400,
    );
  }

  // TYPES
  if (typeof title !== "string" || typeof description !== "string") {
    sendResponse(
      res,
      {
        message: "Invalid types for title/description. They should be strings.",
        error: true,
      },
      400,
    );
  }

  // TYPE OPTIONAL
  // only validate IF provided
  if (type && !Object.values(ISSUE_TYPE).includes(type)) {
    return res.status(400).json({
      message:
        "Invalid type. Only possible options are: bug and feature_request",
    });
  }

  if (description.trim().length < 15) {
    return sendResponse(
      res,
      { message: "Description must be at least 15 characters", error: true },
      400,
    );
  }

  next();
};

//export default validateCreateIssue;
