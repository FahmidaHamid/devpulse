import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { USERROLE } from "../types";

export const validateIssueOnDelete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { role } = req.user;

  const issueId = Number(req.params.id);

  // VALIDATE ISSUE ID
  if (!Number.isInteger(issueId)) {
    return sendResponse(
      res,
      {
        message: "Invalid Issue Id",
        error: true,
      },
      400,
    );
  }
  // ONLY MAINTAINER is allowed to delete
  if (role !== USERROLE.MAINTAINER) {
    return sendResponse(
      res,
      {
        message: "Not authorized to delete this issue",
        error: true,
      },
      403,
    );
  }

  next();
};
