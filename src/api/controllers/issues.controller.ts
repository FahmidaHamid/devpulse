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

  const newIssue = await issuesService.createIssue(issueData);
  if (!newIssue) {
    return sendResponse(res, { message: "Failed to Create User" }, 404);
  }

  return sendResponse(
    res,
    { message: "An Issue Created Successfully", data: newIssue, error: false },
    201,
  );
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

export const getOneIssueById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return sendResponse(
        res,
        {
          message: "Invalid issue id",
          data: null,
          error: true,
        },
        400,
      );
    }

    const output = await issuesService.getIssueById(id);

    if (!output)
      return sendResponse(
        res,
        { message: "Issue not found", error: true },
        404,
      );

    return sendResponse(
      res,
      { message: "Issue retrieved successfully", data: output, error: false },
      200,
    );
    //res.status(200).json(output);
  } catch (error) {
    //console.error(error);
    return sendResponse(
      res,
      { message: "Failed to fetch", data: error, error: true },
      500,
    );
  }
};

export const updateIssueById = async (req: Request, res: Response) => {
  //console.log(req);

  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
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
    const { title, description, type, status } = req.body;

    const output = await issuesService.updateIssueById({
      id,
      title,
      description,
      type,
      status,
    });

    if (!output)
      return sendResponse(
        res,
        { message: "Issue was not found, Update Failed", error: true },
        404,
      );

    return sendResponse(
      res,
      { message: "Issue Updated successfully", data: output, error: false },
      200,
    );
    //res.status(200).json(output);
  } catch (error) {
    //console.error(error);
    return sendResponse(
      res,
      { message: "Failed to fetch", data: error, error: true },
      500,
    );
  }

  //res.status(200).json({ message: "updating an issue" });
};
