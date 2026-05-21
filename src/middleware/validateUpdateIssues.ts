import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ISSUE_STATUS, ISSUE_TYPE } from "../types";

export const validateIssueUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, type, status } = req.body;

  // TITLE VALIDATION
  if (title && title.trim().length < 5) {
    return sendResponse(
      res,
      { message: "Title must be at least 5 characters", error: true },
      400,
    );
  }
  // DESCRIPTION VALIDATION
  if (description && description.trim().length < 20) {
    return sendResponse(
      res,
      { message: "Description must be at least 20 characters", error: true },
      400,
    );
  }

  // TYPE VALIDATION
  if (type && !Object.values(ISSUE_TYPE).includes(type)) {
    return sendResponse(
      res,
      { message: "Invalid Issue Type Provided", error: true },
      400,
    );
  }

  // STATUS VALIDATION
  if (status && !Object.values(ISSUE_STATUS).includes(status)) {
    return sendResponse(
      res,
      { message: "Invalid Issue Status Provided", error: true },
      400,
    );
  }

  next();
};
