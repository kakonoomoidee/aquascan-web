// src/utils/jwt_decode.ts
import {jwtDecode} from "jwt-decode";

export interface TokenPayload {
  user_id: number;
  role: string;
  exp: number;
  iat?: number;
}

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
};
