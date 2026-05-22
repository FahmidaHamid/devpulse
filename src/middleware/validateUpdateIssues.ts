import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ISSUE_STATUS, ISSUE_TYPE, USERROLE } from "../types";
import issuesService from "../api/services/issues.service";

export const validateIssueUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, type, status } = req.body;
  const { id, role } = req.user;
  const query_id = req.params.id;
  console.log(req.user);
  console.log("id", id);
  console.log("role", role);
  console.log(title, description, type, status);
  // if the id is not valid
  const req_id = Number(req.params.id);

  if (!Number.isInteger(req_id)) {
    return sendResponse(
      res,
      {
        message: "Invalid Issue Id, Update Failed",
        data: null,
        error: true,
      },
      400,
    );
  }

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

  const issue = await issuesService.getIssueById(Number(query_id));

  if (!issue) {
    return sendResponse(
      res,
      {
        message: "Bad Request, Issue doesn't Exist",
        error: true,
      },
      401,
    );
  }

  //console.log("issue: ", issue);
  // if a contributor is trying to update an issue that is not created by them
  if (issue && role === USERROLE.CONTRIBUTOR && issue.reporter.id !== id) {
    return sendResponse(
      res,
      {
        message: "Don't have enough priviledge to update or Conflict",
        error: true,
      },
      409,
    );
  }

  // if a contributor is trying to update an issue that is not open any more
  if (issue.status !== ISSUE_STATUS.OPEN && role === USERROLE.CONTRIBUTOR) {
    return sendResponse(
      res,
      {
        message:
          "Don't have enough priviledge to update or issue not open anymore ",
        error: true,
      },
      409,
    );
  }

  next();
};
