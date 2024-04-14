import mongoose from "mongoose";

export interface User {
  id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  status: string;
  friends: string[];
}

export interface IUserRepository {
  create(user: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findByUsername(username: string): Promise<any>;
  get(id: string): Promise<any>;
}

export type UpdateInfo = {
  status: string;
};
