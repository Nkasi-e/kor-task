export interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  friends: [];
}

export interface IUserRepository {
  create(user: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findByUsername(username: string): Promise<any>;
  get(id: string): Promise<any>;
}

export type UpdateInfo = {
  status?: string;
  email?: string;
  username?: string;
};
