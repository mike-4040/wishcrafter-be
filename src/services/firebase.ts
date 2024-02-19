import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const app = initializeApp();

const auth = getAuth(app);

export async function getAuthUser(email: string) {
  return auth.getUserByEmail(email);
}
