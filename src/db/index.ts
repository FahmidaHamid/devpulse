import { Pool } from "pg";
import config from "../config";
import { USERROLE } from "../types";
import { ISSUE_STATUS, ISSUE_TYPE } from "../types";

export const pool = new Pool({ connectionString: config.connection_string });

export const initializeDatabase = async () => {
  console.log(config.connection_string);
  try {
    await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT '${USERROLE.CONTRIBUTOR}',

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  )
`);

    await pool.query(`
  CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL 
    CHECK (char_length(description) >= 20),

    reporter_id INT NOT NULL
      REFERENCES users(id)
      ON DELETE CASCADE,

    type VARCHAR(20) NOT NULL DEFAULT '${ISSUE_TYPE.BUG}',

    status VARCHAR(20) NOT NULL DEFAULT '${ISSUE_STATUS.OPEN}',

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  )
`);
    console.log("Database is connected successfully...");
  } catch (error) {
    console.log(error);
  }
};
