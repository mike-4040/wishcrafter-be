import { randomUUID } from "node:crypto";

import { pg } from "../services/database";
import { DBUser } from "./type";

export async function getUserByEmail(email: string) {
  return pg<DBUser>("users")
    .select("id", "auth_created")
    .where({ email })
    .first();
}

export async function createUser(email: string, firstName: string) {
  const userToInsert: DBUser = {
    id: randomUUID(),
    first_name: firstName,
    email,
    auth_created: false,
    created_at: new Date(),
  };

  const [result] = await pg<DBUser>("users").insert(userToInsert, ["id"]);

  return result;
}
