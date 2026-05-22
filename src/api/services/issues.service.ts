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
      SELECT issues.*,

        users.id AS reporter_id,
        users.name AS reporter_name,
        users.email AS reporter_email,
        users.role AS reporter_role

        FROM issues
        JOIN users
            ON issues.reporter_id = users.id`;

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

      const formatted = result.rows.map((issue) => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        created_at: issue.created_at,
        updated_at: issue.updated_at,

        reporter: {
          id: issue.reporter_id,
          name: issue.reporter_name,
          email: issue.reporter_email,
          role: issue.reporter_role,
        },
      }));

      //console.log(result);
      return formatted;
    } catch (error) {
      return error;
    }
  }

  async getIssueById(id: number) {
    const query = `
    SELECT
      issues.id,
      issues.title,
      issues.description,
      issues.type,
      issues.status,
      issues.created_at,
      issues.updated_at,

      users.id AS reporter_id,
      users.name AS reporter_name,
      users.email AS reporter_email,
      users.role AS reporter_role

    FROM issues

    JOIN users
    ON issues.reporter_id = users.id

    WHERE issues.id = $1
  `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return {
      id: row.id,
      title: row.title,
      description: row.description,
      type: row.type,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,

      reporter: {
        id: row.reporter_id,
        name: row.reporter_name,
        email: row.reporter_email,
        role: row.reporter_role,
      },
    };
  }

  async updateIssueById(payload: any) {
    const { id, title, description, type, status } = payload;

    const query = `
      UPDATE issues
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type),
        status = COALESCE($4, status),
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;

    const values = [title, description, type, status, Number(id)];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async deleteIssueById(id: number) {
    const query = `
    DELETE FROM issues
    WHERE id = $1
    RETURNING *;
  `;

    const values = [id];

    const result = await pool.query(query, values);

    console.log("Deleted outcome:", result.rows);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }
}

export default new IssueRelateService();
