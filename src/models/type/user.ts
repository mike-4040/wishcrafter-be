export interface DBUser {
  id: string;
  first_name: string;
  email: string;
  auth_created?: boolean;
  created_at: number;
}

export interface User {
  id: string;
  firstName: string;
  email: string;
  authCreated?: boolean;
  createdAt: number;
}

/**
 * Minimal User data extracted form the auth token by the authGuard middleware
 */
export interface AuthUser {
  email?: string;
  id: string;
}
