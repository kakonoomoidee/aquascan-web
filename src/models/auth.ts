// file: src/models/auth.ts
export interface AuthUser {
  id: number;
  email?: string;
  fullname?: string;
  role: string;
  isAdmin: boolean;
}
