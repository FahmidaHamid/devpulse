import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ISSUE_STATUS, ISSUE_TYPE, USERROLE } from "../types";
import issuesService from "../api/services/issues.service";

const validateIssueOnUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, type, status } = req.body;
  const { id, role } = req.user;
  const issueId = Number(req.params.id);

  try {
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

    // TITLE VALIDATION
    if (title && title.trim().length < 5) {
      return sendResponse(
        res,
        {
          message: "Title must be at least 5 characters",
          error: true,
        },
        400,
      );
    }

    // DESCRIPTION VALIDATION
    if (description && description.trim().length < 20) {
      return sendResponse(
        res,
        {
          message: "Description must be at least 20 characters",
          error: true,
        },
        400,
      );
    }

    // TYPE VALIDATION
    if (type && !Object.values(ISSUE_TYPE).includes(type)) {
      return sendResponse(
        res,
        {
          message: "Invalid Issue Type",
          error: true,
        },
        400,
      );
    }

    // STATUS VALIDATION
    if (status && !Object.values(ISSUE_STATUS).includes(status)) {
      return sendResponse(
        res,
        {
          message: "Invalid Issue Status",
          error: true,
        },
        400,
      );
    }

    const issue = await issuesService.getJustTheIssueById(issueId);

    if (!issue) {
      return sendResponse(
        res,
        {
          message: "Issue not found",
          error: true,
        },
        404,
      );
    }

    // ONLY OWNER CONTRIBUTOR CAN UPDATE
    if (role === USERROLE.CONTRIBUTOR && issue.reporter_id !== id) {
      return sendResponse(
        res,
        {
          message: "Not authorized to update this issue",
          error: true,
        },
        403,
      );
    }

    // CONTRIBUTOR CANNOT UPDATE CLOSED ISSUES
    if (role === USERROLE.CONTRIBUTOR && issue.status !== ISSUE_STATUS.OPEN) {
      return sendResponse(
        res,
        {
          message: "Issue is no longer open",
          error: true,
        },
        409,
      );
    }

    next();
  } catch (error) {
    console.error("Issue validation error:", error);

    return sendResponse(
      res,
      {
        message: "Internal server error",
        error: true,
      },
      500,
    );
  }
};

export default validateIssueOnUpdate;
