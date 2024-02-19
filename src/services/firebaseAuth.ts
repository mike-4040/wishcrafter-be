import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp();

const auth = getAuth(app);

export async function getAuthUser(email: string) {
  return auth.getUserByEmail(email);
}

interface createAuthUser {
  id: string;
  email: string;
  displayName: string;
  password: string;
}

export async function createAuthUser(user: createAuthUser) {
  return auth.createUser({
    uid: user.id,
    email: user.email,
    password: user.password,
    emailVerified: false,
    displayName: user.displayName,
  });
}

export async function createCustomToken(uid: string) {
  return auth.createCustomToken(uid)
}
