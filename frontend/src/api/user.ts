// src/api/user.ts
import axios from 'axios';

// NestJS 側の URL（デフォルトポート3000）
const API_BASE = 'http://localhost:3000';

// ユーザー作成用の型
export interface CreateUserDto {
  name: string;
  email: string;
}

// ユーザー型（NestJS 側の User に合わせる）
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// ユーザー一覧取得
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_BASE}/user`);
  return response.data;
};

// ユーザー作成
export const createUser = async (data: CreateUserDto): Promise<User> => {
  const response = await axios.post<User>(`${API_BASE}/user`, data);
  return response.data;
};