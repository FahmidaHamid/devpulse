import { IssueStatus, IssueType, SortOption } from "../types";

export const isIssueType = (value: any): value is IssueType => {
  return value === "bug" || value === "feature";
};

export const isIssueStatus = (value: any): value is IssueStatus => {
  return value === "open" || value === "in_progress" || value === "resolved";
};

export const isSort = (value: any): value is SortOption => {
  return value === "newest" || value === "oldest";
};
