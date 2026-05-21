import { IIssues, ISSUE_STATUS, ISSUE_TYPE } from "../../types";
import { pool } from "../../db";

class IssueRelateService {
  async createIssue(issue: IIssues & { reporter_id: number }) {
    //console.log("issue: ", issue);
    const query = `
  INSERT INTO issues (
    title,
    description,
    type,
    status,
    reporter_id
  )
  VALUES (
    $1,
    $2,
    COALESCE($3, '${ISSUE_TYPE.BUG}'),
    COALESCE($4, '${ISSUE_STATUS.OPEN}'),
    $5
  )
  RETURNING *;
`;

    const values = [
      issue.title,
      issue.description,
      issue.type,
      issue.status,
      issue.reporter_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

export default new IssueRelateService();
