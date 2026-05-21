import { Request, Response } from "express";
import issuesService from "../services/issues.service";
import { sendResponse } from "../../utils/sendResponse";
import { IssueStatus, IssueType, SortOption } from "../../types";
import { isIssueStatus, isIssueType, isSort } from "../../utils/typeCheckers";

export const createANewIssue = async (req: Request, res: Response) => {
  const body = req.body;
  const user = req.user;

  const issueData = {
    ...body,
    reporter_id: user.id,
  };
  //console.log("issue data: ", issueData);

  const newIssue = await issuesService.createIssue(issueData);
  if (!newIssue) {
    return sendResponse(res, { message: "Failed to Create User" }, 404);
  }

  return sendResponse(
    res,
    { message: "An Issue Created Successfully", data: newIssue, error: false },
    201,
  );

  //res.status(201).json({ message: "posting an issue" });
};

export const getAllTheIssues = async (req: Request, res: Response) => {
  const { sort, type, status } = req.query;
  let safe_sort: SortOption | undefined;
  let query_type: IssueType | undefined;
  let query_status: IssueStatus | undefined;

  safe_sort = isSort(sort) ? sort : undefined;
  query_type = isIssueType(type) ? type : undefined;
  query_status = isIssueStatus(status) ? status : undefined;

  const existing_issues = await issuesService.getAllTheIssues({
    safe_sort,
    query_type,
    query_status,
  });
  return sendResponse(
    res,
    {
      message: "An Issue Created Successfully",
      data: existing_issues,
      error: false,
    },
    200,
  );
};
