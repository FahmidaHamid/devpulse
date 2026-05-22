import { pool } from "../../db";
import { IUser, USERROLE } from "../../types";
import bcrypt from "bcrypt";

class AuthService {

  async createUser(user: IUser & { password: string }) {
    const { name, email, role, password } = user;
    
    const hashedvalue = await bcrypt.hash(password, 10);
    
    const res = await pool.query(
      `
      INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, COALESCE($4, $5))
       RETURNING id, name, email, role, created_at, updated_at`,
      [name, email, hashedvalue, role, USERROLE.CONTRIBUTOR],
    );

   
    return res.rows[0];
  }

  async validateUser(email: string, password: string) {
    const result = await pool.query(
      `SELECT id, name, email, password_hash, role, created_at, updated_at
       FROM users
       WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) return null;
    const user = result.rows[0];
    const { password_hash, ...safeUser } = user;

    const isValid = await bcrypt.compare(password, password_hash);
    return isValid ? safeUser : null;
  }

  async getUserById(id: number) {
    const result = await pool.query(`SELECT * FROM users WHERE id=${id}`);

    if (result.rows.length === 0) return null;
    const { password_hash, ...user } = result.rows[0];
    //const isValid = await bcrypt.compare(password, password_hash);

    return user;
  }
}

export default new AuthService();
