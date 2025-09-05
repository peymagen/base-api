import { type IUser } from "./user.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";

export const createUser = async (data: IUser) => {
  const query = "INSERT INTO user (email, password) VALUES (?, ?)";
  const values = [data.email, data.password];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  return { userId: result.insertId };
};

export const updateUser = async (id: number, data: IUser) => {
  const query = "UPDATE user SET email = ?, password = ? WHERE id = ?";
  const values = [data.email, data.password, id];
  await pool.execute(query, values);
  return { id, ...data };
};

export const editUser = async (
  id: number,
  data: IUser
): Promise<IUser & { id: number }> => {
  let query = "UPDATE user SET ";
  const updates: string[] = [];
  const values: any[] = [];

  Object.keys(data).forEach((key) => {
    updates.push(`${key} = ?`);
    values.push((data as any)[key]);
  });

  query += updates.join(", ") + " WHERE id = ?";
  values.push(id);

  await pool.execute(query, values);
  return { id, ...data };
};

export const deleteUser = async (id: number) => {
  const query = "DELETE FROM user WHERE id = ?";
  await pool.execute(query, [id]);
  return { id, deleted: true };
};

export const getUserById = async (id: number) => {
  const query = "SELECT email FROM user WHERE id = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
  return rows[0] || null;
};

export const getAllUsers = async () => {
  const query = "SELECT email FROM user";
  const [rows] = await pool.execute(query);
  return rows;
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const [rows] = await pool.execute("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0] as IUser;
  }
  return null;
};
