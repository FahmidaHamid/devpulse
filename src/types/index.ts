export enum ISSUE_TYPE {
  BUG = "bug",
  REATURE_REQUEST = "feature_request",
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
