import {
  GetIssuesParams,
  IIssues,
  ISSUE_STATUS,
  ISSUE_TYPE,
} from "../../types";
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

  async getAllTheIssues({
    safe_sort,
    query_type,
    query_status,
  }: GetIssuesParams) {
    try {
      let query = `
      SELECT *
      FROM issues`;

      const conditions: string[] = [];
      const values: any[] = [];

      if (query_type) {
        values.push(query_type);
        conditions.push(`type = $${values.length}`);
      }
      if (query_status) {
        values.push(query_status);
        conditions.push(`status = $${values.length}`);
      }
      if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(" AND ");
      }
      // SORTING
      if (safe_sort === "newest") {
        query += ` ORDER BY created_at DESC`;
      } else if (safe_sort === "oldest") {
        query += ` ORDER BY created_at ASC`;
      }
      const result = await pool.query(query, values);
      //console.log(result);
      return result.rows;
    } catch (error) {
      return error;
    }
  }
}

export default new IssueRelateService();
