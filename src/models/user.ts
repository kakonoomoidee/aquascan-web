// file: src/models/user.ts
export interface UserPayload {
  full_name: string;
  email: string;
  password?: string;
  role: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}
