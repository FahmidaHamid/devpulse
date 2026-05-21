export enum ISSUE_TYPE {
  BUG = "bug",
  FEATURE_REQUEST = "feature",
}

export enum ISSUE_STATUS {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
}

export enum USERROLE {
  CONTRIBUTOR = "contributor",
  MAINTAINER = "maintainer",
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: USERROLE;
}

export interface IIssues {
  title: string;
  description: string;
  type?: ISSUE_TYPE;
  status?: ISSUE_STATUS;
}

export type SortOption = "newest" | "oldest" | undefined;
export type IssueType = "bug" | "feature" | undefined;
export type IssueStatus = "open" | "in_progress" | "resolved" | undefined;

export type GetIssuesParams = {
  safe_sort?: SortOption;
  query_type?: IssueType;
  query_status?: IssueStatus;
};
