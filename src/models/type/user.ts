export interface DBUser {
  id: string;
  first_name: string;
  email: string;
  auth_created?: boolean;
  created_at: Date;
}

export interface User {
  id: string;
  firstName: string;
  email: string;
  authCreated?: boolean;
  createdAt: string;
}
