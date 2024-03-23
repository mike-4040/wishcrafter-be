export interface DBWish {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  created_at: number;
}

export interface Wish {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: number;
}
