import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';

import { getProperty, UserError } from '../utils/index.js';

const app = initializeApp();

const auth = getAuth(app);

export async function getAuthUserByEmail(email: string) {
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

export async function getAuthUserById(uid: string) {
  return auth.getUser(uid);
}

export async function createCustomToken(uid: string) {
  return auth.createCustomToken(uid);
}

export async function verifyIdToken(idToken: string) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    const code = getProperty(error, 'code');

    console.log('verifyIdToken', { code });

    if (code === 'auth/id-token-expired') {
      throw new UserError('verifyIdToken-tokenExpired-noRetry');
    }

    if (code === 'auth/id-token-revoked') {
      throw new UserError('verifyIdToken-tokenRevoked-noRetry');
    }

    throw new Error('Unauthorized');
  }
}
