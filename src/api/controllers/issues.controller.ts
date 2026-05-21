import { Request, Response } from "express";
import issuesService from "../services/issues.service";
import { sendResponse } from "../../utils/sendResponse";

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
