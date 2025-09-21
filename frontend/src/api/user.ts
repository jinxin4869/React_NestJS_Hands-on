import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export interface CreateUserDto { name: string; email: string; }
export interface UpdateUserDto { name?: string; email?: string; }
export interface User { id: number; name: string; email: string; createdAt: string; }

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(`${API_BASE}/user`);
  return res.data;
};

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const res = await axios.post<User>(`${API_BASE}/user`, data);
  return res.data;
};

export const updateUser = async (id: number, data: UpdateUserDto): Promise<User> => {
  const res = await axios.put<User>(`${API_BASE}/user/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/user/${id}`);
};