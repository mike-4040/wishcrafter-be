import { pg } from "../services/database";
import { DBUser } from "./type";

export async function getUserByEmail(email: string) {
  return pg<DBUser>('users').select('id', 'auth_created').where({ email }).first();
}